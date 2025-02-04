import { dataObj } from "src/app/types";
import { contactEmail, newBookingClient, newBookingAdmin } from "../../constants/emailTemplates";

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


const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `"Audiología MEF" <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        });
    } catch (err) {
        console.error("Error sending email with Nodemailer:", err);
    }
};

// Exposed email functions
export const sendContactEmail = (data: dataObj) => sendEmail("audiologia.mef@gmail.com", "Tenés un nuevo mensaje", contactEmail(data));
export const sendNewBookingClient = (data: dataObj) => sendEmail(data.email, "¡Turno confirmado!", newBookingClient(data));
export const sendNewBookingAdmin = (data: dataObj) => sendEmail("audiologia.mef@gmail.com", "¡Nuevo turno confirmado!", newBookingAdmin(data));
