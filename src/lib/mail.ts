import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("Initializing Nodemailer...");

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter immediately at server start
transporter.verify()
    .then(() => console.log("* Nodemailer ready *"))
    .catch(err => console.error("Error verifying Nodemailer:", err));
