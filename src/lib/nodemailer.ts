import { transporterPromise } from "./mail";
import { dataObj } from "src/app/types";
import { contactEmail, newBookingClient, newBookingAdmin, cancelBooking } from "../constants/emailTemplates";

const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const transporter = await transporterPromise
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

const adminMails = ["audiologia.mef@gmail.com", "fliasotelo.mg@gmail.com"]

// Exposed email functions
export const sendContactEmail = async (data: dataObj) => await sendEmail(adminMails, "Tenés un nuevo mensaje", contactEmail(data));
export const sendNewBookingClient = async (data: dataObj) => await sendEmail(data.email, data.isUpdate ? "Modificaciones en el turno" : "¡Turno confirmado!", newBookingClient(data));
export const sendNewBookingAdmin = async (data: dataObj) => await sendEmail(adminMails, data.isUpdate ? "Modificaciones en el turno" : "¡Nuevo turno confirmado!", newBookingAdmin(data));
export const sendCancelBooking = async (data: dataObj) => {
    await sendEmail("audiologia.mef@gmail.com", "Turno cancelado", cancelBooking(data))
    await sendEmail(data.email, "Turno cancelado", cancelBooking(data))
}
