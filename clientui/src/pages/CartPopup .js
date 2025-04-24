import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./CartPopup.css"; // for blink animation

const CartPopup = () => {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { name: "Pizza", price: "$10" },
    { name: "Burger", price: "$5" },
  ]);

  const handleAddToCart = () => {
    // You can update this logic to add real items
    setOpen(true);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddToCart}>
        Add to Cart
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} className="blink-popup">
        <DialogTitle>🛒 Your Cart</DialogTitle>
        <DialogContent>
          {cartItems.length === 0 ? (
            <Typography>No items in cart.</Typography>
          ) : (
            <List>
              {cartItems.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.name} secondary={item.price} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CartPopup;
