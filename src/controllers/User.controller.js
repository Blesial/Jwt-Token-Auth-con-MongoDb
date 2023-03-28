const User = require('../models/User');

const createUser = async (req, res) => {
    const {name, category, price, imgURL} = req.body;

    const productCreated = new Product({name, category, price, imgURL})
    console.log(productCreated)
    const savedProduct = await productCreated.save();

    res.json(savedProduct);
    
}