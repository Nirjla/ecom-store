const nodemailer = require('nodemailer')
const { HOST } = require('../constants')

const transporter = nodemailer.createTransport({
      // host: "smtp",
      // port: 587,
      // secure: false,
      service: 'gmail',
      auth: {
            user: HOST.MAIL,
            pass: HOST.PW
      }
})

const sendResetEmail = async (email, resetToken) => {
      console.log(HOST.PW)
      const resetUrl = `http://localhost:5173/auth/reset-password/${resetToken}`
      await transporter.sendMail({
            from: HOST.MAIL,
            to: email,
            subject: 'Password Reset',
            text: `You are receiving this email becuase you (or someone else) have requested the rest of the password of your account .\n\n` +
                  `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                  `${resetUrl}\n\n` +
                  `If you did not request this, please ignore this email and your password will remain unchanged.\n`
      })
}


module.exports = { sendResetEmail }