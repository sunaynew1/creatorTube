import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Only for dev
  },
});

async function generateMailToken(id) {
  const token = jwt.sign({ _id: id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
  return token;
}

async function mailConfig(receiverMailId = "", token) {
  if (!receiverMailId) throw new Error("No receiver email provided");

  const mailConfiguration = {
    from: process.env.EMAIL_USERNAME,
    to: receiverMailId,
    subject: "User Verification",
    text: `Hi there,

Thank you for signing up on our platform!

To complete your registration, please verify your email address by clicking the link below:

http://localhost:3004/api/v1/users/verifyToken?token=${token}

If you did not make this request, you can safely ignore this email.

Thanks,
The CreatorTube`,
  };

  // ✅ Actually send the email here
  transporter.sendMail(mailConfiguration, function (error, info) {
    if (error) throw Error(error);
    console.log("✅ Email Sent Successfully");
    console.log(info);
  });
}

export { generateMailToken, mailConfig };
