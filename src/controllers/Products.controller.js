const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const {name, category, price, imgURL} = req.body;

    const productCreated = new Product({name, category, price, imgURL})
    console.log(productCreated)
    const savedProduct = await productCreated.save();

    res.json(savedProduct);
    
}

const getProduct = async (req, res) => {
    const productsFounded = await Product.find()
    res.json(productsFounded)
}

const getProductById = async (req, res) => {
   const productFounded = await Product.findById(req.params.productId)
   res.json(productFounded);
}

const upadateProductById = async (req, res) => {
    const productUpdated = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    });
    console.log(req.body)
    res.json(productUpdated);
}

const deleteProductById = (req, res) => {
    
}


module.exports = {
    createProduct,
    getProduct,
    getProductById,
    upadateProductById,
    deleteProductById
}