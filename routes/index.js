const authController = require("../controllers/auth.controller")

const router = require("express").Router()

router.post('/check-email', authController.checkEmail)
router.post('/create', authController.register)

router.post('/verify-code', authController.verify)


module.exports = router