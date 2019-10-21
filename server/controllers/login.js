const Usuario = require('../models/usuario')



const userLogin = (req, res) => {

    let body = req.body


    Usuario.find({email: body.email}, (err, dbUser) => {
        if (err) {
            return res.status(400).json({
                correcto: false,            
                err,
                message: `El usuario ${body.email} no existe`
            })
        }

        if (dbUser[0].password !== body.password) {
            return res.status(401).json({
                correcto: false,
                message: 'contraseña incorrecta'
            })
        }

        res.json({
            correcto: true,
            message: `login correcto`
        })
    })

}

module.exports = {
    userLogin
}