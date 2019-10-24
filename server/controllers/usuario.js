const Usuario = require('../models/usuario')
const Bcript = require('bcrypt')
const jwt = require('jsonwebtoken')

const getUser = (req, res) => {
  const body = req.body

  Usuario.find({ email: body.email }, (err, dbUser) => {
    if (err) {
      return res.status(404).json({
        correcto: false,
        err,
        message: 'usuario no encontrado'
      })
    }
    return res.status(200).json({ user: dbUser })
  })
}

const insertUser = (req, res) => {
  const body = req.body

  const usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: Bcript.hashSync(body.password, 10),
    fecha: body.fecha,
    telefono: body.telefono
  })

  usuario.save((err, dbUser) => {
    if (err) {
      return res.status(400).json({
        correcto: false,
        err
      })
    }

    return res.status(200).json({
      correcto: true,
      user: dbUser
    })
  })
}
const updateUser = (req, res) => {
  const body = req.body

  Usuario.findOneAndUpdate({ email: body.email }, body, { new: true }, (err, dbUser) => {
    if (err) {
      return res.status(400).json({
        correcto: false,
        err
      })
    }

    return res.status(200).json({
      correcto: true,
      user: dbUser
    })
  })
}

const deleteUser = (req, res) => {
  const body = req.body

  Usuario.deleteOne({ email: body.email }, (err) => {
    if (err) {
      res.status(404).json({
        correcto: false,
        message: 'Usuario no existente'
      })
    }

    return res.status(200).json({
      correcto: true,
      message: 'usuario eliminado'
    })
  })
}

const userLogin = (req, res) => {
  const body = req.body

  Usuario.find({ email: body.email }, (err, dbUser) => {
    if (err) {
      return res.status(400).json({
        correcto: false,
        err,
        message: `El usuario ${body.email} no existe`
      })
    }

    if (!Bcript.compareSync(body.password, dbUser[0].password)) {
      return res.status(401).json({
        correcto: false,
        message: 'contraseña incorrecta'
      })
    }

    const token = jwt.sign({
      user: dbUser
    }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

    return res.status(200).json({
      correcto: true,
      message: 'login correcto',
      token
    })
  })
}

module.exports = {
  getUser,
  insertUser,
  deleteUser,
  updateUser,
  userLogin
}
