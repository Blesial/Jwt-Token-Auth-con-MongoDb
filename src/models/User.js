const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
}],
}, {
    timestamps: true,
    versionKey: false
});

// creo metodo tanto para cifrar como para comparar las contrasenias ! porque cuando guardamos un dato cifrado de alguna manera vamos a tener
// q comparar la contra guardada con la contra que esta tipeando el usuario. 

// satatics: forma de agregar metodos sin necesidad de instanciar el objeto/. 
UserSchema.statics.encryptPassword = async (password) => {
    // forma de aplicar el algoritmo. y le damos el recorrido con el 10. (cuantas veces va a ejecutarse);
   const salt = await bcrypt.genSalt(10)
   // ahora creamos el hash o contra cifrada:
   const hashed = await bcrypt.hash(password, salt) // password seria la contra actual q el usuario esta tipeando. 
   return hashed;

};
// cuando el usuario VUELVA a entrar , se debera comparar las passswords:  // tengo q arreglarla
UserSchema.statics.comparePassword = async (password, receivedPassword) => {
    const result = await bcrypt.compare(password, receivedPassword); // devuelve true o false. 
    console.log(result);
    return result;
};



module.exports = model('User', UserSchema);