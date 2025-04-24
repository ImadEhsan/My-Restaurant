import Cart from "../model/cartModel.js";
import Product from "../model/product.js";
import User from "../model/usermodel.js";

export const Addcart = async (req, res) =>{
    try {
        console.log("Received request body:", req.body);
        const { productId, quantity = 1, userId } = req.body;
        if (!userId) return res.status(400).json({ message: "User ID is required" });
        if (!productId) return res.status(400).json({ message: "Product ID is required" });
        
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });
   
        let cart = await Cart.findOne({ userId });
        if (!cart) {
         
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else {
           
            const cartItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (cartItemIndex > -1) {
          
                cart.items[cartItemIndex].quantity += quantity;
            } else {
               
                cart.items.push({ productId, quantity });
            } 
        }
        await cart.save();
        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        console.error("Full Server Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const fetchCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) return res.status(400).json({ message: "User ID is required" });

        let cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart) return res.status(200).json({ cart: { items: [], total: 0 } });

     
        const total = cart.items.reduce((sum, item) => sum + item.quantity * item.productId.price, 0);

       
        const formattedCart = {
            ...cart.toObject(),
            items: cart.items.map(item => ({
                productId: item.productId._id,  
                name: item.productId.name,      
                price: item.productId.price,    
                image: item.productId.image,    
                quantity: item.quantity         
            })),
            total,
        };

        res.status(200).json({ cart: formattedCart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const incrementCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) return res.status(400).json({ message: "User ID and Product ID are required" });

        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });


        const cartItem = cart.items.find(item => item.productId.toString() === productId);
        if (!cartItem) return res.status(404).json({ message: "Product not found in cart" });

        cartItem.quantity += 1;
        await cart.save();

        res.status(200).json({ message: "Quantity increased", cart });
    } catch (error) {
        console.error("Increment Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const decrementCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) return res.status(400).json({ message: "User ID and Product ID are required" });

        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const cartItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (cartItemIndex === -1) return res.status(404).json({ message: "Product not found in cart" });

   
        if (cart.items[cartItemIndex].quantity > 1) {
            cart.items[cartItemIndex].quantity -= 1;
        } else {
      
            cart.items.splice(cartItemIndex, 1);
        }

        await cart.save();

        res.status(200).json({ message: "Quantity decreased", cart });
    } catch (error) {
        console.error("Decrement Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
export const removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) return res.status(400).json({ message: "User ID and Product ID are required" });

        const cart = await Cart.findOne({ userId });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // ✅ Remove the item from cart
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        await cart.save();

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        console.error("Remove Item Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
