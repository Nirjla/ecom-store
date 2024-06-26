const { Router } = require("express")
const router = Router()

const { getItemById, getItems } = require('../controllers/itemController')

router.get('/', getItems)
router.get('/:id', getItemById)

module.exports = router