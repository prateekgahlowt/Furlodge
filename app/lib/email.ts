import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: true,
});

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify your email address',
    html: `
      <div>
        <h1>Welcome to Dog Buddies!</h1>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Reset your password',
    html: `
      <div>
        <h1>Password Reset Request</h1>
        <p>You requested to reset your password. Click the link below to set a new password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
      </div>
    `,
  });
}

export async function sendBookingConfirmationEmail(email: string, bookingDetails: any) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Booking Confirmation',
    html: `
      <div>
        <h1>Booking Confirmation</h1>
        <p>Your booking has been confirmed with the following details:</p>
        <ul>
          <li>Service: ${bookingDetails.serviceName}</li>
          <li>Start Date: ${new Date(bookingDetails.startDate).toLocaleDateString()}</li>
          <li>End Date: ${new Date(bookingDetails.endDate).toLocaleDateString()}</li>
          <li>Total Price: $${bookingDetails.totalPrice}</li>
        </ul>
        <p>Thank you for choosing Dog Buddies!</p>
      </div>
    `,
  });
} 