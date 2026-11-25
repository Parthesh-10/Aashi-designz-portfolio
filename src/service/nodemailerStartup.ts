import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let smtpState = false;

export const transporter: Transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  secure: true,
  port: 465,
  debug: true,
  connectionTimeout: 10000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true, // prevents MITM attacks
  },
});

export const smtpStartup = async (): Promise<void> => {
  try {
    await transporter.verify();
    smtpState = true;
    console.log('smtp verified');
  } catch (error) {
    smtpState = false;
    const message = error instanceof Error ? error.message : String(error);
    console.log('smtp  startup failed', message);
  }
};

export const isSmtpReady = (): boolean => {
  return smtpState;
};
