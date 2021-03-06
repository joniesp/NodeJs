const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const user = require('./routes/usuario')
const book = require('./routes/libro')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/user', user)
app.use('/book', book)

module.exports = app
