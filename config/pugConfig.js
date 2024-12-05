// include pug module
const pug = require("pug");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

async function main(emailData, pugTemplatePath) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  // Compile a Pug template from a file to a function
  const compiledFunction = pug.compileFile(pugTemplatePath);
  // Render the function
  const emailHTML = compiledFunction(emailData);

  let info = await transporter.sendMail({
    from: process.env.user_email,
    to: emailData.receiver.email,
    subject: emailData.subject,
    // send the email as an html
    html: emailHTML,
  });

  return info;
}

module.exports = main;
