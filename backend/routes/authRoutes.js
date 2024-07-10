const { Router } = require("express")
const { register, login, googleLogin, forgotPassword, resetPassword } = require('../controllers/authController')
const passport = require("passport")
const authMiddleware = require("../middleware/authMiddleware")
const { FRONTEND_URL } = require("../constants")
const router = Router()

router.post('/register', register)
router.post('/login', login)
// google oauth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect: '/'
}), googleLogin)

router.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user)
})

router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

module.exports = router