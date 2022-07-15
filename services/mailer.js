const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const mailer = {};

mailer.sendEmail = (sendTo, subject, body) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: sendTo,
    subject: subject,
    text: body,
  };
  let rta = true;
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      rta = false;
    }
  });
  return rta;
};

module.exports = mailer;
