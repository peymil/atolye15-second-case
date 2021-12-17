import knex from 'knex';
import express from 'express';
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
export default async (): Promise<void> => {
  const RepoStore = await RepoStoreFactory(db);
  const emailClient = await createEmailClient();

  const app = express();
  app.use(express.json());
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.post<string, string, string, { email: string; gitRepo: string }>('/dependencybot/subscribe', async (req, res) => {
    try {
      const { email, gitRepo } = req.body;
      if (!email || !gitRepo) res.send('No Body');
      const { provider: gitProvider, repoName } = identifyAdress(gitRepo);
      const gitProviderApi = gitProviderApis.get(gitProvider);
      if (!gitProviderApi) throw new Error('Git Provider Not Found');
      const latestSHA = await gitProviderApi.getLatestCommitSha(repoName);
      // I'm not sure about that error
      if (!latestSHA) throw new Error('Cannot find latest sha');
      const data = await RepoStore.getRepo(repoName);
      const cachedMailBody = data?.UPDATEDPACKAGES;
      if (cachedMailBody && data.LASTCOMMITSHA === latestSHA) {
        const cronString = generateCronStringFor24HoursLater(new Date());
        const mailJob = generateNewMailJob(cronString, cachedMailBody, 'deneme', email, emailClient);
        res.send(cachedMailBody);
      } else {
        const latestVersions = await findLatestVersions(gitProviderApi, repoName);
        const mailBody = beautifyDependencyArray(latestVersions);
        const cronString = generateCronStringFor24HoursLater(new Date());
        const mailJob = generateNewMailJob(cronString, mailBody, 'deneme', email, emailClient);
        await RepoStore.addRepo(repoName, latestSHA, mailBody);
        res.send(mailBody);
      }
    } catch (err) {
      if (err instanceof Error) res.send(err.message);
    }
  });
  app.listen(4000);
};
