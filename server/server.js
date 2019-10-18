require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const moongose = require('mongoose')

const app = express()
const user = require('./routes/usuario')
const login = require('./routes/login')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/', user)
app.use('/usuario', login)

moongose.connect('mongodb://localhost:27017/apis',{useNewUrlParser: true}, (err, res) => {
    if (err) 
        throw err

    console.log('BBDD online');
})

app.listen(process.env.PORT, ()=> {
    console.log(`puerto: ${process.env.PORT}`)
})
