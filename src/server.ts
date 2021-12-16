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
// import GitRepoStore from './RepoStore';

// const sqlite = sqlite3.verbose();
// const db = new sqlite.Database('./database');
// const SubscriberStore = new MailSubscriberStore(db);
// const RepoStore = new GitRepoStore(db);
export default (): void => {
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
      // const latestSHA = await gitProviderApi.getLatestCommitSha(repoName);
      const latestVersions = await findLatestVersions(gitProviderApi, repoName);
      const mailBody = beautifyDependencyArray(latestVersions);
      const emailClient = await createEmailClient();
      const cronString = generateCronStringFor24HoursLater(new Date());
      const mailJob = generateNewMailJob(cronString, mailBody, 'deneme', email, emailClient);
      mailJob.start();
      res.send(mailBody);
      res.end();
    } catch (err) {
      if (err instanceof Error) res.send(err.message);
    }
  });
};
