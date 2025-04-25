

///// imad bhai ka stripe controller ///////////

import Stripe from "stripe";
import * as config from "../config/StripeKey.js"
import { stripeSecretKey } from '../config/StripeKey.js';
// import dotenv from 'dotenv'; // Agar .env file use kar rahe hain

// dotenv.config( stripe_secret_key ); // Load environment variables

const stripe = new Stripe(stripeSecretKey); 

export const makepayment = async (req, res) => {
    try {
        const products = req.body; 

        // console.log("Received Products:", products);

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "pkr",
                product_data: {
                    name: product?.name,  
                    images: Array.isArray(product?.image) ? product.image : [product.image],

                },
                unit_amount: Math.round(product?.price * 100), 
            },
            quantity: product?.quantity || 1
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url:"https://my-restaurant-frontend-5hc3.onrender.com/OrderSuccess",
            cancel_url:"https://my-restaurant-frontend-5hc3.onrender.com/addcart"
            // success_url: process.env.success_url  || "http://localhost:3000/OrderSuccess",
            // cancel_url: process.env.cancel_url  || "http://localhost:3000/cart",
            
        });

        // console.log("Session Created:", session);
        res.status(200).json({ sessionId: session.id });
        

    } catch (error) {
        // console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
};
