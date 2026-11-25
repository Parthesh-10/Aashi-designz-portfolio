import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { transporter } from './nodemailerStartup';

export interface AdminMailPayload {
  name: string;
  email: string;
  message: string;
}

export interface UserMailPayload {
  name: string;
  email: string;
}

export const sendAdminMail = ({
  name,
  email,
  message,
}: AdminMailPayload): Promise<SMTPTransport.SentMessageInfo> => {
  return transporter.sendMail({
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: 'New Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    html: `
<h2>You have recieved a contact form submission:</h2>
<h3>Contact Details</h3>
<ul>
<li>
<p>
<strong>Name</strong>: ${name}
</p>
</li>

<li>
<p>
<strong>Email</strong>: ${email}
</p>
</li>
<li>
<p>
<strong>Message</strong>: ${message}
</p>
</li>
</ul>  
        `,
    replyTo: email,
  });
};

export const sendUserMail = ({
  name,
  email,
}: UserMailPayload): Promise<SMTPTransport.SentMessageInfo> => {
  return transporter.sendMail({
    from: `"Aashi Designz" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thankyou for contacting us',
    html: `
<p>
Hey, ${name}
</p>
<p>Your message just arrived and it's relaxing in my inbox. I'll be with you as soon as I escape my creative chaos.</p>
<p>Thankyou for reaching out.</p>
<p>Talk to you soon.</p>
<p>Aashi</p>
      `,
  });
};
