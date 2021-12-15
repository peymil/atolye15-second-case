import nodemailer from 'nodemailer';

const createEmailClient = async () => {
  const { SMTP_EMAIL: user, SMTP_PASSWORD: pass } = process.env;
  let account = user ? { user, pass } : await nodemailer.createTestAccount();

  const port = process.env.SMTP_PORT;
  let transporter = nodemailer.createTransport({
    port: port ? parseInt(port) : 22,
    secure: false,
    auth: account,
    tls: {
      rejectUnauthorized: false,
    },
    host: process?.env?.SMTP_EMAIL || 'smtp.ethereal.email',
  });
  return transporter;
};
export default createEmailClient;
