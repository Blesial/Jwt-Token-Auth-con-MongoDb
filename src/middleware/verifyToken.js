// autorizacion de rutas para ver que el token exista y sea el que corresponda. 

const jwt = require('jsonwebtoken');
const secret = require('../config');
const Role = require('../models/Role');
const User = require('../models/User');
// ver que rutas necesitan tokens para ser autorizadas. (crear producto, modificar producto, borrar producto)
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["token"]; // guardo el token que me manda el usuario por header

        console.log(token);
    
        if (!token) return res.status(403).json({message: 'No token provided'}); // si no me manda nada. no le permto crear el producto
    // con esto sig decodifico el token para obtener el id del usuario.
    // ahi podemos comprobar si el usuario existe, porque podrian mandarnos cualq token sino. 
        const decoded = jwt.verify(token, secret.SECRET)
        console.log(decoded);
    
        const user = await User.findById(decoded.id, {password:0}); // no necesito q me devuelva la password, solo el id 
        if (!user) return res.status(404).json({message: 'No user found'})
        next();
    } catch (error) {
        return res.json({message: 'UnAuthorized'}) // mensaje de desautorizado si no existe el token
    }
}

const verifyIsModerador = async (req, res, next) => {
    const decode = jwt.verify(req.headers.token, secret.SECRET);
    const userId = decode.id;
    
    const user = await User.findById(userId);

   const roles = await Role.find({_id: {$in: user.roles}});
   console.log(roles)

   for(let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'Moderador') {

        next();
        return;
    } 
   }
   return res.status(403).json({message: 'Requiere Rol de Moderador'})
}   

const verifyIsAdmin = async (req, res, next) => {
    const decode = jwt.verify(req.headers.token, secret.SECRET);
    const userId = decode.id;
   const user = await User.findById(userId);

   const roles = await Role.find({_id: {$in: user.roles}});
   console.log(roles)

   for(let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'Admin') {
        next();
        return;
    } 
   }
   return res.status(403).json({message: 'Requiere Role de Admin'})
}
  

module.exports = {
    verifyToken,
    verifyIsModerador,
    verifyIsAdmin
}