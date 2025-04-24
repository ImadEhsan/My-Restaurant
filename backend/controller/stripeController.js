// import Stripe from "stripe";
// import dotenv from 'dotenv'; // Agar .env file use kar rahe hain

// dotenv.config(); // Load environment variables

// // Ensure Stripe Key is present
// if (!process.env.STRIPE_SECRET_KEY) {
//     console.error("FATAL ERROR: STRIPE_SECRET_KEY is not defined.");
//     // Optional: exit process or handle gracefully
//     // process.exit(1);
// }

// // Initialize Stripe with Secret Key and API version
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: '2024-04-10', // Use the latest appropriate version
// });

// export const makepayment = async (req, res) => {
//     try {
//         // --- SECURITY WARNING ---
//         // The following line assumes req.body contains the product details directly from the client.
//         // This is INSECURE. You should receive product IDs and quantities,
//         // then fetch the actual price, name, and image from your DATABASE on the server.

//         // Example: Assuming client sends { items: [{ id: 'prod_123', quantity: 2 }, ...] }
//         const clientCartItems = req.body.items; // Adjust 'items' based on actual request body structure

//         console.log("Received Cart Items:", clientCartItems);

//         if (!clientCartItems || clientCartItems.length === 0) {
//             return res.status(400).json({ message: "Cart is empty" });
//         }

//         // --- SECURITY IMPLEMENTATION NEEDED HERE ---
//         // 1. Create an array of product IDs from clientCartItems.
//         // 2. Fetch product details (price, name, image) for these IDs from your database.
//         // 3. Check if all products were found and are available.
//         // 4. Merge database details with client quantities to create secure product data.
//         //    Example structure for secure data:
//         //    const secureProductsData = [
//         //      { id: 'prod_123', name: 'DB Name 1', price: 10.99, image: ['db_image_url_1'], quantity: 2 },
//         //      { id: 'prod_456', name: 'DB Name 2', price: 5.50, image: ['db_image_url_2'], quantity: 1 }
//         //    ];

//         // --- TEMPORARY Placeholder - Replace with Secure Logic ---
//         // For now, using the insecure client data for demonstration, BUT DO NOT USE THIS IN PRODUCTION
//         const insecureProductsData = clientCartItems; // Replace this line!
//         // --- End of TEMPORARY Placeholder ---


//         // Use the SECURE product data to build lineItems
//         const lineItems = insecureProductsData.map((product) => {
//             // Ensure product data exists (especially after DB fetch)
//             if (!product || !product.name || !product.price || !product.image) {
//                 throw new Error(`Invalid product data encountered for item.`); // Handle appropriately
//             }
//              // Validate price is a number
//              const price = parseFloat(product.price);
//              if (isNaN(price) || price < 0) {
//                  throw new Error(`Invalid price for product: ${product.name}`);
//              }

//             return {
//                 price_data: {
//                     currency: "usd", // Or your desired currency
//                     product_data: {
//                         name: product.name, // Use name from DB
//                         // Ensure image is an array of strings
//                         images: Array.isArray(product.image) ? product.image.filter(img => typeof img === 'string') : (typeof product.image === 'string' ? [product.image] : []), // Use image from DB
//                     },
//                     unit_amount: Math.round(price * 100), // Use price from DB, ensure it's in cents
//                 },
//                 quantity: product.quantity || 1 // Use quantity from client input (usually safe)
//             };
//         });

//         // Ensure lineItems is not empty after mapping/validation
//         if (lineItems.length === 0) {
//              return res.status(400).json({ message: "No valid items to process." });
//         }


//         // Get URLs from environment variables, provide defaults for development
//         const successUrl = process.env.STRIPE_SUCCESS_URL || "http://localhost:3000/OrderSuccess";
//         const cancelUrl = process.env.STRIPE_CANCEL_URL || "http://localhost:3000/cart";

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: lineItems,
//             mode: "payment",
//             success_url: successUrl,
//             cancel_url: cancelUrl,
//             // Optional: Add customer email if available
//             // customer_email: req.user.email, // If you have user authentication
//             // Optional: Add metadata
//             // metadata: { order_id: 'your_internal_order_id' }
//         });

//         console.log("Session Created:", { id: session.id, url: session.url }); // Log session ID and URL
//         res.status(200).json({ sessionId: session.id, url: session.url }); // Send session ID and URL to client


//     } catch (error) {
//         console.error("Stripe Payment Error:", error);
//         // Provide a more user-friendly error message in production if needed
//         res.status(500).json({ error: error.message || "An error occurred during payment processing." });
//     }
// };





///// imad bhai ka stripe controller ///////////

import Stripe from "stripe";
import * as config from "../config/StripeKey.js"
import dotenv from 'dotenv'; // Agar .env file use kar rahe hain

// dotenv.config( stripe_secret_key ); // Load environment variables

const stripe = new Stripe(config.stripe_secret_key); 

export const makepayment = async (req, res) => {
    try {
        const products = req.body; 

        console.log("Received Products:", products);

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
            success_url:config.success_url,
            cancel_url:config.cancel_url
            // success_url: process.env.success_url  || "http://localhost:3000/OrderSuccess",
            // cancel_url: process.env.cancel_url  || "http://localhost:3000/cart",
            
        });

        console.log("Session Created:", session);
        res.status(200).json({ sessionId: session.id });
        

    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({ error: error.message });
    }
};