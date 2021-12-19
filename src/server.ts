import knex from 'knex';
import express from 'express';
import { Server } from 'http';
import beautifyDependencyArray from './beautifyDependencyArray';
import generateCronStringFor24HoursLater from './cronHelpers';
import createEmailClient from './email/emailClient';
import generateNewMailJob from './email/generateMailJob';
import findLatestVersions from './findLatestVers';
import identifyAdress from './gitProviderIdentifier/identifyAddress';
import gitProviderApis from './gitProviderApis';

// import sqlite3 from 'sqlite3';
// import MailSubscriberStore from './MailSubscriberStore';
import RepoStoreFactory from './RepoStore';

const db = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data.db',
  },
});
export default async (port = 4000): Promise<Server> => {
  const RepoStore = await RepoStoreFactory(db);
  const emailClient = await createEmailClient();

  const app = express();
  app.use(express.json());
  // I'm not sure about using POST. It is returning data but also subscribing to service.
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post<string, string, string, { email: string; gitRepo: string }>('/dependencybot/subscribe', async (req, res) => {
    try {
      const { email, gitRepo } = req.body;
      if (!email || !gitRepo) res.send('No Body');
      const { provider: gitProvider, repoName } = identifyAdress(gitRepo);
      const gitProviderApi = gitProviderApis.get(gitProvider);
      if (!gitProviderApi) throw new Error('Git Provider Not Found');
      const latestSHA = await gitProviderApi.getLatestCommitSha(repoName);
      if (!latestSHA) throw new Error('Cannot find latest sha');
      const RepoData = await RepoStore.getRepo(repoName);
      const isUpdateablesCached = RepoData && RepoData?.LASTCOMMITSHA === latestSHA;
      if (isUpdateablesCached) {
        const cronString = generateCronStringFor24HoursLater(new Date());
        generateNewMailJob(cronString, RepoData.UPDATEDPACKAGES, 'deneme', email, emailClient);
        res.send(RepoData.UPDATEDPACKAGES);
      } else {
        const latestVersions = await findLatestVersions(gitProviderApi, repoName);
        const mailBody = beautifyDependencyArray(latestVersions);
        const cronString = generateCronStringFor24HoursLater(new Date());
        generateNewMailJob(cronString, mailBody, 'deneme', email, emailClient);
        if (!RepoData) await RepoStore.addRepo(repoName, latestSHA, mailBody);
        else await RepoStore.updateRepo(repoName, latestSHA, mailBody);
        res.send(mailBody);
      }
    } catch (err) {
      if (err instanceof Error) res.send(err.message);
    }
  });
  const server = app.listen(port);
  return server;
};
