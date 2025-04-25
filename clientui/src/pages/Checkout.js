import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  fetchCart } from "../redux/feature/cart/cartSlice";


export default function CheckoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart()); // Load cart on checkout page
  }, [dispatch]);

  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: ""
  });

  const handleChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    if (!billingDetails.firstName || !billingDetails.email || !billingDetails.address) {
      alert("Please fill in all details!");
      return;
    }
    alert("Order placed successfully!");
    // dispatch(clearCart());
    navigate("/paymentmade");
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 min-h-screen justify-center">
      <div className="w-full md:w-2/3 space-y-6 order-1 md:order-2">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" value={billingDetails.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" />
            <input name="lastName" value={billingDetails.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" />
          </div>
          <input name="email" value={billingDetails.email} onChange={handleChange} type="email" placeholder="Email address" className="w-full border p-2 rounded mt-4" />
          <input name="phone" value={billingDetails.phone} onChange={handleChange} type="text" placeholder="Phone Number" className="w-full border p-2 rounded mt-4" />
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <input name="address" value={billingDetails.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded w-full mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <input name="city" value={billingDetails.city} onChange={handleChange} placeholder="City" className="border p-2 rounded" />
            <input name="postalCode" value={billingDetails.postalCode} onChange={handleChange} placeholder="Postal Code" className="border p-2 rounded" />
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Delivery Method</h2>
          <div className="flex gap-4">
            <label className="border p-3 rounded-lg flex-1 cursor-pointer">
              <input type="radio" value="standard" checked={deliveryMethod === "standard"} onChange={() => setDeliveryMethod("standard")} /> Standard - $6.00
            </label>
            <label className="border p-3 rounded-lg flex-1 cursor-pointer">
              <input type="radio" value="express" checked={deliveryMethod === "express"} onChange={() => setDeliveryMethod("express")} /> Express - $16.00
            </label>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <div className="flex gap-4">
            <label className="border p-3 rounded-lg flex-1 cursor-pointer">
              <input type="radio" value="creditCard" checked={paymentMethod === "creditCard"} onChange={() => setPaymentMethod("creditCard")} /> Credit Card
            </label>
            <label className="border p-3 rounded-lg flex-1 cursor-pointer">
              <input type="radio" value="paypal" checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")} /> PayPal
            </label>
          </div>
          {paymentMethod === "creditCard" && (
            <div className="mt-4">
              <input name="cardNumber" value={billingDetails.cardNumber} onChange={handleChange} placeholder="Card Number" className="border p-2 rounded w-full mb-2" />
              <input name="cardName" value={billingDetails.cardName} onChange={handleChange} placeholder="Name on Card" className="border p-2 rounded w-full mb-2" />
              <div className="grid grid-cols-2 gap-4">
                <input name="expiry" value={billingDetails.expiry} onChange={handleChange} placeholder="MM/YY" className="border p-2 rounded" />
                <input name="cvc" value={billingDetails.cvc} onChange={handleChange} placeholder="CVC" className="border p-2 rounded" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-white p-6 shadow-md rounded-lg order-2 md:order-1">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 ml-4">
                <p>{item.name}</p>
                <p className="text-gray-600">${item.price} x {item.quantity}</p>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t mt-4 pt-4">
          <p>Subtotal: ${totalPrice.toFixed(2)}</p>
          <p>Shipping: ${deliveryMethod === "standard" ? "6.00" : "16.00"}</p>
          <p className="font-semibold">Total: ${(totalPrice + (deliveryMethod === "standard" ? 6 : 16)).toFixed(2)}</p>
        </div>
        <button onClick={handleCheckout} className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg">Confirm Order</button>
      </div>
    </div>
  );
}
