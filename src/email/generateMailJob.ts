import { CronJob } from 'cron';
import { Transporter } from 'nodemailer';

const generateNewMailJob = (
  cronExpression: string,
  mailText: string,
  mailTitle: string,
  sendTo: string,
  emailClient: Transporter,
): CronJob => {
  return new CronJob(cronExpression, () => {
    emailClient.sendMail({ text: mailText, to: sendTo, subject: mailTitle }).catch(() => {
      console.error(`failed to send mail to ${sendTo}`);
    });
  });
};
export default generateNewMailJob;
