const { Router } = require("express")
const { register, login } = require('../controllers/authController')
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
  }), (req, res) => {
      const token = req.user.token;
      // Replace FRONTEND_URL with your actual frontend URL
      res.redirect(`http://localhost:5173/auth/google/callback?token=${token}`);
  });
  

router.get('/profile', authMiddleware, (req, res) => {
      res.json(req.user)
})

module.exports = router