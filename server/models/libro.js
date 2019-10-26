const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const libroSchema = new Schema({
  titulo: { type: String, required: [true, 'el nombre es necesario'] },
  ISBN: { type: String, required: [true, 'el ISBN es necesario'], unique: true },
  autor: { type: String, required: [true, 'el autor es necesario'] },
  fecha: { type: Date, default: Date.now() },
  precio: { type: Number },
  descipción: { type: String }
})

libroSchema.plugin(uniqueValidator, { message: 'este libro ya existe' })

module.exports = mongoose.model('Libro', libroSchema)
