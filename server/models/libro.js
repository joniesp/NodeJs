const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const libroSchema = new Schema({
  titulo: { type: String, required: [true, 'el nombre es necesario'], unique: true },
  autor: { type: String, required: [true, 'el autor es necesario'] },
  fecha: { type: Date, default: Date.now() }
})

libroSchema.plugin(uniqueValidator, { message: 'este libro ya existe' })

module.exports = mongoose.model('Libro', libroSchema)
