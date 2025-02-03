import { transporter } from "./mail";
import { dataObj } from "src/app/types";
import { contactEmail, newBookingClient, newBookingAdmin } from "../constants/emailTemplates";

const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `"Audiología MEF" <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        });
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

// Exposed email functions
export const sendContactEmail = (data: dataObj) => sendEmail("audiologia.mef@gmail.com", "Tenés un nuevo mensaje", contactEmail(data));
export const sendNewBookingClient = (data: dataObj) => sendEmail(data.email, "¡Turno confirmado!", newBookingClient(data));
export const sendNewBookingAdmin = (data: dataObj) => sendEmail("audiologia.mef@gmail.com", "¡Nuevo turno confirmado!", newBookingAdmin(data));
