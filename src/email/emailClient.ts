import nodemailer, { Transporter } from 'nodemailer';

const createEmailClient = async (): Promise<Transporter> => {
  const { SMTP_EMAIL: user, SMTP_PASSWORD: pass } = process.env;
  const account = user ? { user, pass } : await nodemailer.createTestAccount();

  const port = process.env.SMTP_PORT;
  const transporter = nodemailer.createTransport({
    port: port ? parseInt(port, 10) : 587,
    secure: false,
    auth: account,
    host: process?.env?.SMTP_EMAIL || 'smtp.ethereal.email',
  });

  return transporter;
};
export default createEmailClient;
