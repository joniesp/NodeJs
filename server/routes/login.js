const express = require('express')
const Usuario = require('../models/usuario')
//const Bcript = require('bcrypt')

let app = express()
const router = express.Router()
const login = require('../controllers/login')

router.get('/login', login.userLogin)


module.exports = router