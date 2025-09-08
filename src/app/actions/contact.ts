'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormState {
  success?: boolean;
  error?: string;
  message?: string;
}

export async function submitContactForm(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Validate form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: 'Please fill in all fields',
      };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set in environment variables');
      return {
        success: false,
        error: 'Email service is not configured. Please try again later.',
      };
    }

    console.log('Attempting to send email with Resend...');

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: `${email} <onboarding@resend.dev>`,
      to: ['roderickhsiao@gmail.com'],
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
        </head>
        <body style="
          margin: 0; 
          padding: 20px; 
          background-color: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 520px; margin: 0 auto;">
            <tr>
              <td>
            
            <!-- Main Container -->
            <table cellpadding="0" cellspacing="0" border="0" style="
              width: 100%;
              background-color: #ffffff;
              border-radius: 12px;
              border: 1px solid #e5e7eb;
              overflow: hidden;
            ">
              
              <!-- Header -->
              <tr>
                <td style="
                  padding: 32px 32px 24px 32px;
                  border-bottom: 1px solid #f3f4f6;
                ">
                  <!-- RH Logo -->
                  <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 20px 0;">
                    <tr>
                      <td style="
                        width: 40px;
                        height: 40px;
                        background-color: #22c55e;
                        border-radius: 8px;
                        text-align: center;
                        vertical-align: middle;
                      ">
                        <span style="
                          color: white;
                          font-size: 16px;
                          font-weight: 600;
                          line-height: 40px;
                        ">RH</span>
                      </td>
                    </tr>
                  </table>
                  
                  <h1 style="
                    margin: 0;
                    font-size: 20px;
                    font-weight: 600;
                    color: #111827;
                    line-height: 1.3;
                  ">${subject}</h1>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 24px 32px;">
                
                <!-- From -->
                <table cellpadding="0" cellspacing="0" border="0" style="
                  width: 100%;
                  margin-bottom: 24px;
                ">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <div style="
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        color: #6b7280;
                        font-weight: 500;
                      ">From</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style="
                        font-size: 16px;
                        font-weight: 500;
                        color: #111827;
                        margin-bottom: 4px;
                      ">${name}</div>
                      <a href="mailto:${email}" style="
                        color: #22c55e;
                        text-decoration: none;
                        font-size: 14px;
                      ">${email}</a>
                    </td>
                  </tr>
                </table>

                <!-- Message -->
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <div style="
                        font-size: 11px;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        color: #6b7280;
                        font-weight: 500;
                      ">Message</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div style="
                        font-size: 15px;
                        line-height: 1.6;
                        color: #374151;
                        white-space: pre-wrap;
                      ">${message}</div>
                    </td>
                  </tr>
                </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="
                  padding: 16px 32px 24px 32px;
                  border-top: 1px solid #f3f4f6;
                ">
                  <p style="
                    margin: 0;
                    font-size: 12px;
                    color: #9ca3af;
                  ">
                    roderickhsiao.me
                  </p>
                </td>
              </tr>

            </table>
            
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        success: false,
        error: 'Failed to send message. Please try again later.',
      };
    }

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
