import nodemailer from 'nodemailer';

const createEmailClient = async () => {
  const { SMTP_EMAIL: user, SMTP_PASSWORD: password } = process.env;
  let account = user ? { user, password } : await nodemailer.createTestAccount();
  const port = process.env.SMTP_PORT;
  let transporter = nodemailer.createTransport({
    port: port ? parseInt(port) : 587,
    secure: false,
    auth: account,
    host: process?.env?.SMTP_EMAIL || 'smtp.ethereal.email',
  });
  return transporter;
};
export default createEmailClient;
