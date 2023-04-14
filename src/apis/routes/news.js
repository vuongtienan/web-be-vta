const express = require('express')
const router = express.Router()

const controller = require('../controllers/NewsCtroller')

router.get('/', controller.getlistNews) 
router.get('/getdetail', controller.getDetailnews) 
module.exports = router