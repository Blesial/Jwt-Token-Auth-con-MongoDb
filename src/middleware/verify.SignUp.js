// validator

const jwt = require('jsonwebtoken');
const secret = require('../config');
const User = require('../models/User');
    // ver que rutas necesitan tokens para ser autorizadas. (crear producto, modificar producto, borrar producto)
    const verifySignUp = async (req, res, next) => {
        try {
            const token = req.headers["token"]; // guardo el token que me deberia mandar el usuario por HEADER

            console.log(token);
    
            if (!token) return res.status(403).json({message: 'No token provided'}); // si no me manda nada. no le permito crear el producto.

        // con esto sig decodifico el token para obtener el id del usuario.
        // ahi podemos comprobar si el usuario existe, porque podrian mandarnos cualq token sino. 
            const decoded = jwt.verify(token, secret.SECRET)

            console.log(decoded);
    
            const user = await User.findById(decoded.id, {password:0}); // no necesito q me devuelva la password, solo el id.

            if (!user) return res.status(404).json({message: 'No user found'}).SECRET

            next(); // Aca se le permite continuar. 

    }   catch (error) {

            return res.json({message: 'UnAuthorized'}) // mensaje de desautorizado si no existe el token
    }
}
  

module.exports = verifySignUp