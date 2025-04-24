// config/stripeKeys.js
import dotenv from 'dotenv';
dotenv.config();


const   secretKey= process.env.STRIPE_SECRET_KEY
const   publishableKey= process.env.STRIPE_PUBLISHABLE_KEY



const success_url= "http://localhost:3000/OrderSuccess"
const cancel_url= "http://localhost:3000/cart"


export { cancel_url,success_url,secretKey,publishableKey};
