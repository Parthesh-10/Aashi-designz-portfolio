import { NextResponse } from 'next/server';
import { isSmtpReady, smtpStartup } from '@/service/nodemailerStartup';
import { sendAdminMail, sendUserMail } from '@/service/mailFormat';

// Initialize SMTP
smtpStartup();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      return NextResponse.redirect(new URL('/contact?error=Invalid Input', request.url), 303);
    }

    if (!isSmtpReady()) {
      return NextResponse.redirect(new URL('/contact?error=We couldn’t send your message right now. Please try again later.', request.url), 303);
    }

    await sendAdminMail({ name, email, message });
    await sendUserMail({ name, email });

    return NextResponse.redirect(new URL('/contact?success=Message Sent Successfully', request.url), 303);
  } catch (error) {
    console.error('contact form sending error', error);
    return NextResponse.redirect(new URL('/contact?error=Something Went Wrong. Please try again later', request.url), 303);
  }
}
