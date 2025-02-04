import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { google } from "googleapis";
dotenv.config();

// OAuth2 Client
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Same as OAuth Playground Redirect URI
);

// Set the Refresh Token
oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

async function createTransporter() {
    try {
        const { token } = await oAuth2Client.getAccessToken();
        if (!token) throw new Error("Failed to get access token");

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                accessToken: token, // Use the fetched token
            },
            debug: true,
            logger: true
        });
    } catch (err) {
        console.error("Error creating transporter:", err);
        throw err;
    }
}

export const transporterPromise = createTransporter()

// Verify transporter immediately at server start
// transporter.verify()
//     .then(() => console.log("* Nodemailer ready *"))
//     .catch(err => console.error("Error verifying Nodemailer:", err));
