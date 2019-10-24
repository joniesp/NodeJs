const express = require('express')
// const Usuario = require('../models/usuario')
const userController = require('../controllers/usuario')
// const Bcript = require('bcrypt')
const { verificarToken } = require('../middlewares/autentificacion')
const router = express.Router()

router.get('/', verificarToken, userController.getUser)
router.get('/login', userController.userLogin)
router.post('/', userController.insertUser)
router.put('/', userController.updateUser)
router.delete('/', userController.deleteUser)

module.exports = router
