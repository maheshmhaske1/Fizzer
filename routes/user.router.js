const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')

router.post('/create', userController.create)
router.get('/get', userController.get)
router.post('/update', userController.update)
router.post('/deactivate', userController.deactivate)
router.post('/login', userController.login)
router.post('/reset-password', userController.resetpassword)

module.exports = router
