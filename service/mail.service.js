const nodemailer = require('nodemailer');
const codeModel = require('../models/code');
const bcrypt = require('bcrypt');

class MailService {
     constructor() {
          this.transporter = nodemailer.createTransport({
               host: process.env.SMTP_HOST,
               port: process.env.SMTP_PORT,
               secure: false,
               auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
               }
          });
     }

     async sendCode(email, subject, code) {
          try {
               const mailOptions = {
                    from: process.env.SMTP_USER,
                    to: email,
                    subject: subject,
                    html: `<p>Ваш код: <strong>${code}</strong></p>`
               };

               const hashOtp = await bcrypt.hash(code.toString(), 10);
               const createdCode = await codeModel.create({ code: hashOtp, email });
               console.log('Code saved to database:', createdCode);
               const info = await this.transporter.sendMail(mailOptions);
               console.log('Email sent:', info.response);
          } catch (error) {
               console.error('Error in sendCode:', error);
          }
     }
}

module.exports = new MailService();
