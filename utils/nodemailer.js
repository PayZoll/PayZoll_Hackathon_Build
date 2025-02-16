const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: process.env.NODEMAILER_PWD,
  },
});

const sendEmail = async (options) => {
  const message = {
    from: `"${process.env.SMTP_FROM_NAME} " <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  }

  await transporter.sendMail(message);
};

module.exports = {
  sendEmail,
};
