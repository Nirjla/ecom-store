const jwt = require("jsonwebtoken")

const {  JWT } = require("../constants")

module.exports = async (req, res, next) => {
      try {
            const jwtToken = req.header('token')
            if (!jwtToken) {
                  return res.status(403).json({
                        success: false,
                        message: "Not Authorized"
                  })
            }
            const payload = jwt.verify(jwtToken, JWT.JWT_SECRET)
            req.user = payload.user
            console.log(req.user)
      } catch (err) {
            return res.status(403).json({
                  success: false,
                  message: "Not Authorized"
            })
      }
      next()
}