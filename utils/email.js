const nodemailer = require("nodemailer");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.AWS_SES_HOST, // email-smtp.us-east-1.amazonaws.com
  port: process.env.AWS_SES_PORT, // It could be 465 or 587
  secure: false, // Secure connection (TLS) is not used
  auth: {
    user: process.env.AWS_SES_USERNAME,
    pass: process.env.AWS_SES_SECRET_KEY,
  }
});

module.exports = transporter;