import nodemailer from "nodemailer";
import { dataObj } from "src/app/types";
import { contactEmail, newBookingClient, newBookingAdmin } from "../constants/emailTemplates";
import dotenv from "dotenv";

// Ensure env variables are loaded
dotenv.config();

// Singleton pattern to initialize transporter only once
let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        transporter.verify()
            .then(() => console.log("* Mailing ready *"))
            .catch((err: any) => console.error("Error connecting Nodemailer", err));
    }
    return transporter;
};

// Generic function to send emails
const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const mailTransporter = getTransporter();
        await mailTransporter.sendMail({
            from: `"Audiología MEF" <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        });
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

// Exposed functions
export const sendContactEmail = (data: dataObj) => sendEmail("audiologia.mef@gmail.com", "Tenés un nuevo mensaje", contactEmail(data));

export const sendNewBookingClient = (data: dataObj) => sendEmail(data.email, "¡Turno confirmado!", newBookingClient(data));

export const sendNewBookingAdmin = (data: dataObj) => sendEmail("audiologia.mef@gmail.com", "¡Nuevo turno confirmado!", newBookingAdmin(data));
