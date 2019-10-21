const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

/*
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} No es un rol valido'
}
*/

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'el nombre es necesario']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'el correo es necesario']
  },
  password: {
    type: String,
    required: [true, 'la contraseña es necesaria']
  },
  fecha: {
    type: Date,
    default: new Date()
  },
  telefono: {
    type: String,
    minlength: 9,
    maxlength: 9
  }
})
/*
usuarioSchema.methods.toJSON = function() {

    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}
*/
usuarioSchema.plugin(uniqueValidator, { message: 'este correo ya existe' })

module.exports = mongoose.model('Usuario', usuarioSchema)
