import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("Initializing Nodemailer...");

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
    // debug: true,
    // logger: true,
});

// Verify transporter immediately at server start
transporter.verify()
    .then(() => console.log("* Nodemailer ready *"))
    .catch(err => console.error("Error verifying Nodemailer:", err));
