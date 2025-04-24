import express from "express";
import { 
    Addcart, 
    fetchCart, 
    incrementCartItem, 
    decrementCartItem, 
    removeCartItem 
} from "../controller/cartController.js";

const routes = express.Router();

// ✅ Add product to cart
routes.post("/addcart", Addcart);

// ✅ Fetch cart items with product details
routes.get("/:userId", fetchCart);

// ✅ Increment product quantity in cart
routes.patch("/increment", incrementCartItem);

// ✅ Decrement product quantity in cart
routes.patch("/decrement", decrementCartItem);

// ✅ Remove product from cart
routes.delete("/remove", removeCartItem);

export default routes;
