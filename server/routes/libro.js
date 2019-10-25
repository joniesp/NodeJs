const express = require('express')
// const Usuario = require('../models/usuario')
const bookController = require('../controllers/libro')
// const Bcript = require('bcrypt')
const { verificarToken } = require('../middlewares/autentificacion')
const router = express.Router()

router.get('/', verificarToken, bookController.getBook)
router.post('/', verificarToken, bookController.insertBook)
router.put('/', verificarToken, bookController.updateBook)
router.delete('/', verificarToken, bookController.deleteBook)

module.exports = router
