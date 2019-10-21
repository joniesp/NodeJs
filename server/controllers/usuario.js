const Usuario = require('../models/usuario')

const getUser = (req, res) => {

    let body = req.body

    Usuario.find({email: body.email}, (err, dbUser) => {
        if (err) {
            return res.status(404).json({
                correcto: false,
                err, 
                message: 'usuario no encontrado'
            })
        }

        res.json({user: dbUser})
    })

}


const insertUser = (req, res) => {
    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password, //Bcript.hashSync(body.password, 10),
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

        res.json({
            correcto: true,
            user: dbUser
        })
    })

}


const updateUser = (req, res) => {
    
    let body = req.body

    Usuario.findOneAndUpdate({email: body.email}, body, {new: true}, (err, dbUser) => {

        if (err) {
            return res.status(400).json({
                correcto: false,
                err
            })
        }

        res.json({
            correcto: true,
            user: dbUser
        })
    })
}


const deleteUser = (req, res) => {
    
    let body = req.body

    Usuario.deleteOne({email: body.email}, (err) => {

        if (err) {
            res.status(404).json({
                correcto: false,
                message: 'Usuario no existente'
            })
        }

        res.json({
            correcto: true,
            message: 'usuario eliminado'
        })
    })

}


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
    getUser,
    insertUser,
    deleteUser,
    updateUser,
    userLogin
}