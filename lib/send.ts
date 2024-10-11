import nodemailer from "nodemailer";

const domain = "https://paginest.vercel.app";

export async function sendVerification(email: string, token: string) {
  try {
    const confirmationLink = `${domain}/verify-email-token?token=${token}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    const result = await transporter.sendMail({
      from: `Paginest <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Email Verification link",
      html: `<h3>Hello,</h3>
<p>Thank you for signing up! Please verify your email address by clicking the link below:</p>
<p>
    <a href="${confirmationLink}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        Verify Email
    </a>
</p>
<p>If you didn't create an account, no further action is required.</p>
<p>Thank you!</p>`,
    });
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Email could not be sent.");
  }
}
