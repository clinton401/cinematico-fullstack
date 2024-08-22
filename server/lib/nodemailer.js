const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const {newError} = require("./utils")
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(`Failed to send email: ${err.message}`)
    const error = newError( err.message);
    throw error
  }
};

module.exports = sendEmail;
