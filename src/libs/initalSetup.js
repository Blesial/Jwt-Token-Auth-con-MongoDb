const Role = require('../models/Role');

const createRoles = async () => {

    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return;
   
        const rolValues = await Promise.all([
           new Role({name:'User'}).save(),
           new Role({name:'Admin'}).save(),
           new Role({name:'Moderador'}).save()
        ]);
        console.log(rolValues);
    } catch (error) {
        console.log(error);
    }
  



}  

module.exports = createRoles