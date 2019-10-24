// const jwt = require('jsonwebtoken')

const verificarToken = (res, req, next) => {
  const token = req.get('token') // aun no se si el header se llamará token o authorization lo estoy pensando aún

  console.log(token)

  res.json({
    token
  })

  next()
}

module.exports = {
  verificarToken
}
