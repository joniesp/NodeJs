require('./config/config')

// const routes = require('./app')
// const express = require('express')
const mongoose = require('mongoose')
const app = require('./app')

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/apis', { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) throw err
  else {
    console.log('BBDD online')
    app.listen(process.env.PORT, () => {
      console.log(`puerto: ${process.env.PORT}`)
    })
  }
})
