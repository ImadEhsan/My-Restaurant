import express from 'express';
import { createProduct, getProductById, getProducts } from '../controller/productController.js';
const productroutes = express.Router();

productroutes.post('/create',createProduct)
productroutes.get('/getproducts',getProducts)
productroutes.get('/getbyid/:id',getProductById)



export default productroutes;   