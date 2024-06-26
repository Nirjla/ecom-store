const { Router } = require("express")
const router = Router()
const authMiddleware = require("../middleware/authMiddleware")
const { addToCart, deleteFromCart, getCartItems, updateQuantity } = require("../controllers/cartController")
router.post('/', authMiddleware, addToCart)
router.get('/', authMiddleware, getCartItems)
router.delete('/:itemId', authMiddleware, deleteFromCart)
router.put('/:itemId', authMiddleware, updateQuantity)
module.exports = router