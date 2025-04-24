import asyncHandler from 'express-async-handler'
import Product from '../model/product.js'
import cloudinary from '../cloudinary/cloudinary.js';

export const createProduct = asyncHandler(async(req, res)=> {
    const {name, price, image, brand, category, description, quantity} = req.body
    let cloudinaryResponse = null;
    
    if (image) {
        cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
    }

    const product = await Product.create({
        name,
        price,
        image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
        brand,
        category,
        description,
        quantity
    })
    if (product){
        res.status(201).json(product)
    } else {
        res.status(400).json({message: 'Invalid product data'})
    }
})

export const getProducts = asyncHandler(async(req, res)=> {
    const keyword = req.query.keyword ? {
        name: { $regex: req.query.keyword, $options: 'i' }
    } : {}
    const products = await Product.find({...keyword})
    res.json(products)
})
// export const getProducts = asyncHandler(async(req, res)=> {
//     const products = await Product.find({})
//     res.json(products)
// })

export const getProductById = asyncHandler(async(req, res)=> {
    const {id} = req.params
    const product = await Product.findById(id)
    if (product){
        res.json(product)
    }else{
        res.status(404).json({message: 'Product not found'})
    }
})

export const deleteProduct = asyncHandler(async(req, res)=> {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({message: "Product deleted", product})
        
    } catch (error) {
        res.status(500).json({message: "Server Error"})
        
    }
})