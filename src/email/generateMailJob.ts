import createEmailClient from './emailClient';
import { CronJob } from 'cron';
import { Transporter } from 'nodemailer';
const generateNewMailJob = async (
  cronExpression: string,
  mailText: string,
  mailTitle: string,
  sendTo: string,
  emailClient: Transporter,
) => {
  return new CronJob(cronExpression, () => {
    emailClient.sendMail({ text: mailText, to: sendTo, subject: mailTitle });
  });
};
export default generateNewMailJob;
