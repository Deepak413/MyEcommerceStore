const axios = require("axios");

const sendEmail = async (options) => {
    console.log("BREVO_API_KEY:", process.env.BREVO_API_KEY);
    try {
        const response = await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "ShoppingKaro",
                    email: process.env.SMTP_MAIL,
                },
                to: [
                    {
                        email: options.email,
                    },
                ],
                subject: options.subject,
                textContent: options.message,
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "api-key": process.env.BREVO_API_KEY,
                },
            }
        );

        console.log("Email Sent:", response.data);
    } catch (err) {
        console.log("Error in sendEmail, Status:", err.response?.status);
        console.log("Error in sendEmail, Data:", err.response?.data);
        throw err;
    }

};

module.exports = sendEmail;