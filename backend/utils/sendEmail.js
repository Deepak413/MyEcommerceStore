// const nodeMailer = require("nodemailer");

// const sendEmail = async (options) => {
//     console.log("Options in sendEmail : ", options);
//     console.log("SMTP_MAIL in sendEmail : ", process.env.SMTP_MAIL);
//     console.log("SMTP_PASSWORD in sendEmail : ", process.env.SMTP_PASSWORD);

//     const transporter = nodeMailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.SMTP_MAIL,
//             pass: process.env.SMTP_PASSWORD,
//         },
//         connectionTimeout: 30000,
//         greetingTimeout: 30000,
//         socketTimeout: 30000,
//     });

//     const mailOptions = {
//         from: process.env.SMTP_MAIL,
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//     };

//     try {
//         await transporter.verify();
//         console.log("SMTP Connected in sendEmail");
//     } catch (err) {
//         console.error("Verify Error in sendEmail:", err);
//         throw err;
//     }

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log(info);
//     } catch (err) {
//         console.error("Mail Error:", err);
//     }
// };

// module.exports = sendEmail;

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