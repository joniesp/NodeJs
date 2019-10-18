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
        password: body.password //Bcript.hashSync(body.password, 10),
    })

    usuario.save( (err, dbUser) => {
        
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

module.exports = {
    getUser,
    insertUser,
    deleteUser,
    updateUser
}