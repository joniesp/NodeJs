require('./config/config')

const routes = require('./app')
const express = require('express')
const moongose = require('mongoose')

const app = express()

app.use(routes)

moongose.connect('mongodb://localhost:27017/apis', { useNewUrlParser: true }, (err, res) => {
  if (err) throw err
  console.log('BBDD online')
})

app.listen(process.env.PORT, () => {
  console.log(`puerto: ${process.env.PORT}`)
})
