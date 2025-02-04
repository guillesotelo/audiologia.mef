import { transporterPromise } from "./mail";
import { dataObj } from "src/app/types";
import { contactEmail, newBookingClient, newBookingAdmin, cancelBooking } from "../constants/emailTemplates";

const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const transporter = await transporterPromise

        await new Promise((resolve, reject) => {
            transporter.sendMail({
                from: `"Audiología MEF" <${process.env.EMAIL}>`,
                to,
                subject,
                html,
            }, (err: any, info: any) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(info);
                    resolve(info);
                }
            })
        })
    } catch (err) {
        console.error("Error sending email:", err);
    }
};

// Exposed email functions
export const sendContactEmail = (data: dataObj) => sendEmail("audiologia.mef@gmail.com", "Tenés un nuevo mensaje", contactEmail(data));
export const sendNewBookingClient = (data: dataObj) => sendEmail(data.email, data.isUpdate ? "Modificaciones en el turno" : "¡Turno confirmado!", newBookingClient(data));
export const sendNewBookingAdmin = (data: dataObj) => sendEmail("audiologia.mef@gmail.com", data.isUpdate ? "Modificaciones en el turno" : "¡Nuevo turno confirmado!", newBookingAdmin(data));
export const sendCancelBooking = (data: dataObj) => {
    sendEmail("audiologia.mef@gmail.com", "Turno cancelado", cancelBooking(data))
    sendEmail(data.email, "Turno cancelado", cancelBooking(data))
}
