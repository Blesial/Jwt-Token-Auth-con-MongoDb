const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = require('../config');
const Role = require('../models/Role');

// ver en modelo usurio donde hago el cifrado de la password previamente ! Con modulo bcrypt

// Crear nuevo user.
    const signUp = async (req, res) => {
    // 1ro vemos si existe o no el usuario. si existe no lo creamos. 
    const {name, email, password, roles} = req.body;

    // para validar si ya existe el usuario.
    const nameAlreadyExists = await User.findOne({name});
    if (nameAlreadyExists) return res.json('Name Already Exists');
    const emailAlreadyExists = await User.findOne({email});
    if (emailAlreadyExists) return res.json('Email Already Exists');



    const userCreated = new User({
        name,
        email,
        password: await User.encryptPassword(password) // ENTONCES AL FINAL LO Q EN REALIDAD GUARDAMOS ES LA PASS HASHEADA. 
    })
// -- verifico si el user tiene asignado un Rol. en caso de que no, se le agregar POR DEFAULT el rol de Usuario. 

    console.log(roles)
    if (roles) { // si encuentra roles asignados se le asigna el id de los roles correspondientes o correspondiente:
       const roleFound = await Role.find({name: {$in: roles}})
       userCreated.roles = roleFound.map(role => role._id);
    } else { // si no lo encuentra. se le asigna por default el id del rol 'user'
        const role = await Role.findOne({name:'User'});
        userCreated.roles = [role._id];
    }

    const newUser = await userCreated.save();

    console.log(newUser);
    // ahora con el usuario guardado voy a generar un token. el token es para devolver el usuario, no los datos sino cmo string bastante largo donde va
    // a estar alojado el id de su registro. D esta manera el front end pueda obtener nuevamente los datos. y reutilizar el id para pedir mas cosas al back. 
    // entonces generamos el token, q seria el pase. 

// para generar el token: 1er argumento usamos el id q nos da mongoose, el 2do es el SECRET , corre a cuenta de nosotros..el 3 argumento es configuracion
    const token = jwt.sign({id: newUser._id}, secret.SECRET, {
        expiresIn: 86400 // = 24hs
    })
    res.json({token})

    // entonces este token del usuario es como su pase. entonces, para las proximas rutas que protejamos. el debera darme este token para darle acceso.
}


// aca el usuario nos da solo email y password.
const signIn = async (req, res) => {

    const {email, password} = req.body;
   
    //  1 -- Verifico si el usuario (email) existe:
    const userFound = await User.findOne({email}).populate('roles'); // aca el populate pide que me traiga del atributo roles del modelo de Role. toda la info de ese objeto. no unicamente su id
    
    if(!userFound) return res.status(404).json({message: 'User not found'});

    // 2 -- Comparo password en mi base de datos con la que el usuario esta tipeando:
    const matchPassword = await User.comparePassword(password, userFound.password);
    
    if (!matchPassword) return res.json({message: 'Password is invalid'});

    // 3 -- Le de devuelvo su token. 
    const token = jwt.sign({id: userFound._id}, secret.SECRET, {
        expiresIn: 86400 // = 24hs
    })
    res.json({token})
}


module.exports = {
    signUp,
    signIn
}