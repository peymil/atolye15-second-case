import express from 'express';
import beautifyDependencyArray from './beautifyDependencyArray';
import { generateCronStringFor24HoursLater } from './cronHelpers';
import createEmailClient from './email/emailClient';
import generateNewMailJob from './email/generateMailJob';
import findLatestVersions from './findLatestVers';
import { identifyAdress } from './gitProviderIdentifier/identifyAdress';
import gitProviderApis, { gitServerApiBase } from './gitProviderApis';

// import sqlite3 from 'sqlite3';
// import MailSubscriberStore from './MailSubscriberStore';
// import GitRepoStore from './RepoStore';

// const sqlite = sqlite3.verbose();
// const db = new sqlite.Database('./database');
// const SubscriberStore = new MailSubscriberStore(db);
// const RepoStore = new GitRepoStore(db);
export const createServer = () => {
  const app = express();
  app.use(express.json());
  app.post('/dependencybot/subscribe', async (req, res) => {
    try {
      const { email, git_repo } = req.body;
      if (!email || !git_repo) res.send('No Body');
      const { provider: gitProvider, repoName } = identifyAdress(git_repo);
      const gitProviderApi = gitProviderApis.get(gitProvider);
      if (!gitProviderApi) throw '';
      // const latestSHA = await gitProviderApi.getLatestCommitSha(repoName);
      // console.log('latestSHA', latestSHA);

      const latestVersions = await findLatestVersions(gitProviderApi, repoName);
      const mailBody = beautifyDependencyArray(latestVersions);
      const emailClient = await createEmailClient();
      const cronString = generateCronStringFor24HoursLater(new Date());
      const mailJob = await generateNewMailJob(cronString, mailBody, 'deneme', email, emailClient);
      mailJob.start();
      res.send(mailBody);
      res.end();
    } catch (err) {
      res.send(err);
    }
  });
  app.listen(4000);
};
