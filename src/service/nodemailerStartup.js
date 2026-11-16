const nodemailer = require("nodemailer");

let smtpState = false;

let transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
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

const smtpStartup = async () => {
  try {
    await transporter.verify();
    smtpState = true;
    console.log("smtp verified");
  } catch (error) {
    smtpState = false;
    console.log("smtp  startup failed", error.message);
  }
};

let isSmtpReady = () => {
  return smtpState;
};

module.exports = {
  smtpStartup,
  isSmtpReady,
  transporter
};
