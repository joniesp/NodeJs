const express = require('express')
//const Usuario = require('../models/usuario')
const userController = require('../controllers/usuario')
//const Bcript = require('bcrypt')

let app = express()
const router = express.Router()


router.get('/usuario', userController.getUser)
router.post('/usuario', userController.insertUser)
router.put('/usuario', userController.updateUser)
router.delete('/usuario', userController.deleteUser)

module.exports = router