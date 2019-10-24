const jwt = require('jsonwebtoken')

const verificarToken = (req, res, next) => {
  const token = req.get('token') // aun no se si el header se llamará token o authorization lo estoy pensando aún

  jwt.verify(token, process.env.SEED, (err, tokenDecoded) => {
    if (err) {
      return res.status(401).json({
        msg: 'error',
        err
      })
    }
  })

  next()
}

module.exports = {
  verificarToken
}
