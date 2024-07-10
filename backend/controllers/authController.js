const { default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/User")
const { JWT } = require("../constants")
const crypto = require('crypto')
const { sendResetEmail } = require("../services/emailService")

exports.register = async (req, res) => {
      const { first_name, last_name, email, password } = req.body
      const existingUser = await User.findOne({ email })
      if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                  message: 'All fields are required.'
            });
      }
      if (existingUser) {
            return res.status(401).json({
                  message: "User already exists"
            })
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword
      })
      await user.save()
      return res.status(201).json({
            message: "User created successfully"
      })
}

exports.login = async (req, res) => {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email })
      if (!existingUser) {
            return res.status(401).json({
                  message: "There is no user with this email!"
            })
      }
      else {
            const isMatch = await bcrypt.compare(password, existingUser.password)
            if (!isMatch) {
                  return res.status(401).json({
                        message: "Invalid password"
                  })
            }
            else {

                  const user = {
                        id: existingUser._id,
                        email: existingUser.email
                  }
                  const token = jwt.sign(
                        { user }, JWT, {
                        expiresIn: '1hr'
                  }
                  )
                  return res.status(200).json({
                        message: "Logged In successfully",
                        token: token
                  })
            }
      }
}

exports.googleLogin = async (req, res) => {
      const token = req.user.token;
      res.redirect(`http://localhost:5173/auth/google/callback?token=${token}`);

}


exports.forgotPassword = async (req, res) => {
      const { email } = req.body
      try {
            const user = await User.findOne({ email })
            if (!user) {
                  return res.status(404).json({ message: 'User not found' })
            }
            const resetToken = crypto.randomBytes(32).toString('hex')
            resetPasswordExpires = Date.now() + 3600000
            await User.updateOne({
                  _id: user._id
            }, {
                  resetPasswordToken: resetToken,
                  resetPasswordExpires
            })
            await sendResetEmail(user.email, resetToken)
            res.status(200).json({ message: 'Rest email sent successfully' })

      } catch (err) {
            console.error("Error sending reset email" + err)
            res.status(500).json({ message: 'Failed to send rest email' })
      }
}

exports.resetPassword = async (req, res) => {
      const { token } = req.params
      const { newPassword } = req.body
      try {
            const user = await User.findOne({
                  resetPasswordToken: token,
                  resetPasswordExpires: { $gt: Date.now() }
            })
            if (!user) {
                  return res.status(400).json({ message: 'Invalid or expired token' })
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
            user.password = hashedPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save()
            res.status(200).json({ message: "Password reset successfully" })
      } catch (err) {
            console.error('Error resetting password:', err)
            res.status(500).json({ message: 'Failed to rest password' })
      }
}