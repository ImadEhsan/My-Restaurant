import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    category: String,
    image: [String]
})
const Product = mongoose.model('Product', productSchema);

export default Product;