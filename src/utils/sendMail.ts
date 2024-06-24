import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import VerificationEmail from "../../emails";


export async function sendMail({
    email,
    username,
  verificationCode,
}: {
    email: string
    username: string;
  verificationCode: string;
}) {
  const { EMAIL_PASS, EMAIL_USER } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    const testResult = await transport.verify();
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "This is verification email",
      html:  render(VerificationEmail({ username, verificationCode })),
    });
    console.log(sendResult); // Output the result of sending the email
  } catch (error) {
    console.log(error); // Log any error that occurs during sending
  }
}