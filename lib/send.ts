import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = "https://paginest.vercel.app/";
export async function sendVerification(email: string, token: string) {
  try {
    const confirmationLink = `${domain}/verify-email-token?token=${token}`;
    const { data, error } = await resend.emails.send({
      from: "Paginest <onboarding@resend.dev>",
      to: [email],
      subject: "Paginest Email Confirmation",
      html: `<p>Please verify your email by clicking the following link: <a href="${confirmationLink}">Verify Email</a></p>`,
    });
    console.log(data);
    console.log(error);
  } catch (err) {
    console.error("Error sending email:", err);
    throw new Error("Email could not be sent.");
  }
}
