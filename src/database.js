const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/authMongoDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Db is connected'))
    .catch(err => console.log(err))



module.exports = db;