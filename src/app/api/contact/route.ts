import { NextRequest, NextResponse } from 'next/server';
import { isSmtpReady, smtpStartup } from '@/service/nodemailerStartup';
import { sendAdminMail, sendUserMail } from '@/service/mailFormat';

// Initialize SMTP
smtpStartup();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const nameEntry = formData.get('name');
    const emailEntry = formData.get('email');
    const messageEntry = formData.get('message');

    const name = typeof nameEntry === 'string' ? nameEntry : '';
    const email = typeof emailEntry === 'string' ? emailEntry : '';
    const message = typeof messageEntry === 'string' ? messageEntry : '';

    if (!name || !email || !message) {
      return NextResponse.redirect(
        new URL('/contact?error=Invalid Input', request.url),
        303
      );
    }

    if (!isSmtpReady()) {
      return NextResponse.redirect(
        new URL(
          '/contact?error=We couldn’t send your message right now. Please try again later.',
          request.url
        ),
        303
      );
    }

    await sendAdminMail({ name, email, message });
    await sendUserMail({ name, email });

    return NextResponse.redirect(
      new URL('/contact?success=Message Sent Successfully', request.url),
      303
    );
  } catch (error) {
    console.error('contact form sending error', error);
    return NextResponse.redirect(
      new URL(
        '/contact?error=Something Went Wrong. Please try again later',
        request.url
      ),
      303
    );
  }
}
