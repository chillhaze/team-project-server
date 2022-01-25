const sgMail = require("@sendgrid/mail");
const path = require("path");

const envPath = path.join(__dirname, "../.env");
require("dotenv").config({ path: envPath });

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

async function sendEmail(mailData) {
    const email = { ...mailData, from: "kapusta.app.33@gmail.com"};
    try {
        sgMail.send(email);
        return true;
    }
    catch(error) {
        throw error;
    }
}

module.exports = sendEmail;