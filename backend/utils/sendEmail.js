const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    console.log("Options in sendEmail : ", options);
    console.log("SMTP_MAIL in sendEmail : ", process.env.SMTP_MAIL);
    console.log("SMTP_PASSWORD in sendEmail : ", process.env.SMTP_PASSWORD);

    let transporter = nodeMailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:  {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    // await transporter.verify();
    // console.log("SMTP Connected in sendEmail");

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error("Mail Error:", err);
    }
    // await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;