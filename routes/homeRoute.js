const express = require('express')
const router = express.Router()
const getControllers = require('../controllers/home.controllers') 
router.get('/',getControllers.getHome)
module.exports = router