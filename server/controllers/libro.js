const Book = require('../models/libro')

const getBook = (req, res) => {
  const body = req.body

  Book.find({ autor: body.autor }, (err, dbBook) => {
    if (err) {
      return res.status(404).json({
        correcto: false,
        err,
        message: 'libro no encontrado'
      })
    }
    return res.status(200).json({ book: dbBook })
  })
}

const insertBook = (req, res) => {
  const body = req.body

  const book = new Book({
    titulo: body.titulo,
    autor: body.autor,
    fecha: body.fecha
  })

  book.save((err, dbUser) => {
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
const updateBook = (req, res) => {
  const body = req.body

  Book.findOneAndUpdate({ email: body.email }, body, { new: true }, (err, dbUser) => {
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

const deleteBook = (req, res) => {
  const body = req.body

  Book.deleteOne({ email: body.email }, (err) => {
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

module.exports = {
  getBook,
  insertBook,
  updateBook,
  deleteBook
}
