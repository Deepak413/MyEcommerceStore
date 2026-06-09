const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    console.log("Options in sendEmail : ", options);
    console.log("SMPT_MAIL in sendEmail : ", process.env.SMPT_MAIL);
    console.log("SMPT_PASSWORD in sendEmail : ", process.env.SMPT_PASSWORD);

    let transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        }
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.verify();
    console.log("SMTP Connected in sendEmail");

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (err) {
        console.error("Mail Error:", err);
        throw err;
    }
    // await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;