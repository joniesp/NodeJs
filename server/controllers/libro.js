const Book = require('../models/libro')

const getBook = (req, res) => {
  const body = req.body

  Book.find({ ISBN: body.ISBN }, (err, dbBook) => {
    if (err) {
      return res.status(404).json({
        correcto: false,
        err,
        message: 'libro no encontrado'
      })
    }

    if (dbBook.length === 0) {
      return res.status(200).json({ message: 'no existe el libro' })
    }

    return res.status(200).json({ book: dbBook })
  })
}

const insertBook = (req, res) => {
  const body = req.body

  const book = new Book({
    titulo: body.titulo,
    ISBN: body.ISBN,
    autor: body.autor,
    fecha: body.fecha,
    precio: body.precio,
    descripcion: body.descripcion
  })

  book.save((err, dbLib) => {
    if (err) {
      return res.status(400).json({
        correcto: false,
        err
      })
    }

    return res.status(200).json({
      correcto: true,
      libro: dbLib
    })
  })
}
const updateBook = (req, res) => {
  const body = req.body

  Book.findOneAndUpdate({ ISBN: body.ISBN }, body, { new: true }, (err, dbLib) => {
    if (err) {
      return res.status(400).json({
        correcto: false,
        err
      })
    }

    return res.status(200).json({
      correcto: true,
      user: dbLib
    })
  })
}

const deleteBook = (req, res) => {
  const body = req.body

  Book.deleteOne({ ISBN: body.ISBN }, (err) => {
    if (err) {
      res.status(404).json({
        correcto: false,
        message: 'Libro no existente'
      })
    }

    return res.status(200).json({
      correcto: true,
      message: 'Libro eliminado'
    })
  })
}

module.exports = {
  getBook,
  insertBook,
  updateBook,
  deleteBook
}
