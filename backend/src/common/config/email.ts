import nodemailer from "nodemailer";
import { env } from "./env.js";


// Create a transport using SMTP
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT) || 587,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});


// SEND AN EMAIL
const sendEmail = async(to:string, subject:string, html:string):Promise<void> => {
    await transporter.sendMail({
        from:`"${env.SMTP_FROM_NAME}" <${env.SMTP_FROM_EMAIL}>`,
        to,
        subject,
        html

    })
}


// SEND VERIFICATION EMAIL
const sendVerificationEmail = async(email:string, token:string) => {
    const url = `${env.CLIENT_URL}/verify-email/${token}`;
    await sendEmail(
     email,
    "Verify your email",
    `<h2>Welcome!</h2><p>Click <a href="${url}">here</a> to verify your email.</p>`,
        
    )
}

// SEND RESET PASSWORD EMAIL
const sendResetPasswordEmail = async (email:string, token:string) => {
  const url = `${env.CLIENT_URL}/reset-password/${token}`;
  await sendEmail(
    email,
    "Reset your password",
    `<h2>Password Reset</h2><p>Click <a href="${url}">here</a> to reset your password. This link expires in 15 minutes.</p>`,
  );
};


export {sendEmail, sendVerificationEmail, sendResetPasswordEmail}