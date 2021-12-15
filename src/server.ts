import express from 'express';
import beautifyDependencyArray from './beautifyDependenyArray';
import { generateCronStringFor24HoursLater } from './cronHelpers';
import createEmailClient from './email/emailClient';
import generateNewMailJob from './email/generateMailJob';
import findLatestVersions from './findLatestVersAndCommit';
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
    const { email, git_repo } = req.body;
    if (!email || !git_repo) res.send('No Body');
    const latestVersions = await findLatestVersions(git_repo, email);
    const mailBody = beautifyDependencyArray(latestVersions);
    const emailClient = await createEmailClient();
    const cronString = generateCronStringFor24HoursLater(new Date());
    console.log('cronString', cronString);
    const mailJob = await generateNewMailJob(cronString, mailBody, 'deneme', email, emailClient);
    mailJob.start();
    res.send(mailBody);
    res.end();
  });
  app.listen(4000);
};
