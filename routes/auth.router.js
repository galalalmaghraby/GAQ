const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const bodyParser = require("body-parser")






router.get('/register', authController.pageRegister)
router.post('/register',bodyParser.urlencoded({extended:true}),authController.createUser)
router.get('/login', authController.pageLogin)
router.post('/login',bodyParser.urlencoded({extended:true}),authController.loginUser)
router.all("/logout", authController.logout);

module.exports = router