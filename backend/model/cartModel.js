import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: { type: Number,default: 1 },
        price: { type: Number, }
    }],
    totalPrice: {type: Number, default: 1},
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date, default: null}  
}, { timestamps: true});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;