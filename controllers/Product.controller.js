const Product = require('../models/Product.model');

// GET ITEMS
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// GET ONE ITEM BY ID
const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: `No product found with ID: ${id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// CREATE ITEMS
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// UPDATE ITEMS
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: `No product found with ID: ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// DELETE ITEMS
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: `No product found with ID: ${id}` });
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
