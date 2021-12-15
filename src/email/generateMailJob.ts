import createEmailClient from './emailClient';
import { CronJob } from 'cron';
const generateNewMailJob = async (cronExpression: string, mailText: string, mailTitle: string, sendTo: string) => {
  const mail = await createEmailClient();
  return new CronJob(cronExpression, () => {
    // mail.sendMail({ text: mailText, to: sendTo, subject: mailTitle }).then(() => {
    //   console.log('hello bitch');
    // });
  });
};
export default generateNewMailJob;
