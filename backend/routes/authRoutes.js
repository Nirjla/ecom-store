const { Router } = require("express")
const { register, login } = require('../controllers/authController')
const passport = require("passport")
const authMiddleware = require("../middleware/authMiddleware")
const router = Router()

router.post('/register', register)
router.post('/login', login)
// google oauth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      res.json({ token: req.user.token })
})

router.get('/profile', authMiddleware, (req, res) => {
      res.json(req.user)
})

module.exports = router