// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { clearCart, fetchCart } from "../redux/feature/cart/cartSlice";

// const Checkout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { cartItems, totalPrice } = useSelector((state) => state.cart);

//   // Form State
//   const [billingDetails, setBillingDetails] = useState({
//     name: "",
//     email: "",
//     address: "",
//   });

//   useEffect(() => {
//     dispatch(fetchCart()); // Load cart on checkout page
//   }, [dispatch]);

//   // Handle Input Change
//   const handleChange = (e) => {
//     setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
//   };

//   // Handle Order Submission
//   const handleCheckout = () => {
//     if (!billingDetails.name || !billingDetails.email || !billingDetails.address) {
//       alert("Please fill in all details!");
//       return;
//     }

//     // Simulate Order Success
//     alert("Order placed successfully!");

//     dispatch(clearCart()); // Empty the cart after order
//     navigate("/order-success"); // Redirect after checkout
//   };

//   return (
//     <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
//       <div className="flex flex-col justify-start items-start w-full space-y-9">
//         <div className="flex justify-start flex-col items-start space-y-2">
//           <button
//             className="flex flex-row items-center text-gray-600 dark:text-white hover:text-gray-500 space-x-1"
//             onClick={() => navigate(-1)} // Go back to the previous page
//           >
//             <svg
//               className="fill-stroke"
//               width="14"
//               height="14"
//               viewBox="0 0 14 14"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M2.91681 7H11.0835"
//                 stroke="currentColor"
//                 strokeWidth="0.666667"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M2.91681 7L5.25014 9.33333"
//                 stroke="currentColor"
//                 strokeWidth="0.666667"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//               <path
//                 d="M2.91681 7.00002L5.25014 4.66669"
//                 stroke="currentColor"
//                 strokeWidth="0.666667"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//             <p className="text-sm leading-none">Back</p>
//           </button>
//           <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-gray-50">
//             Checkout
//           </p>
//           <p className="text-base leading-normal sm:leading-4 text-gray-600 dark:text-white">
//             Home - Cart - Checkout
//           </p>
//         </div>

//         <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
//           {/* Order Summary */}
//           <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
//             <div className="flex flex-col justify-start items-start w-full space-y-4">
//               <h3 className="text-xl md:text-2xl leading-normal text-gray-800 dark:text-gray-50">
//                 Order Summary
//               </h3>
//               {cartItems.length === 0 ? (
//                 <p className="text-gray-600 dark:text-white">Your cart is empty.</p>
//               ) : (
//                 cartItems.map((item) => (
//                   <div key={item._id} className="w-full border-b border-gray-200 py-4 flex items-center space-x-4">
//                     {/* Product Image */}
//                     <img
//                       src={item.image} // Ensure `item.image` contains the correct image URL
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded-md"
//                     />
//                     {/* Product Details */}
//                     <div>
//                       <p className="text-lg font-semibold">{item.name}</p>
//                       <p className="text-gray-600 dark:text-white">
//                         Quantity: {item.quantity} | Price: ${item.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//               <h3 className="text-xl font-bold mt-6">Total: ${totalPrice}</h3>
//             </div>
//           </div>

//           {/* Billing Details Form */}
//           <div className="p-8 bg-gray-100 dark:bg-gray-800 flex flex-col lg:w-full xl:w-3/5">
//             <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-50 mb-6">
//               Billing Details
//             </h3>

//             {/* Name Input */}
//             <div className="mt-4">
//               <input
//                 className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
//                 type="text"
//                 name="name"
//                 placeholder="Full Name"
//                 value={billingDetails.name}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Email Input */}
//             <div className="mt-8">
//               <input
//                 className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={billingDetails.email}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Address Input */}
//             <div className="mt-8">
//               <input
//                 className="border border-gray-300 p-4 rounded w-full text-base leading-4 placeholder-gray-600 text-gray-600"
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={billingDetails.address}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Checkout Button */}
//             <button
//               onClick={handleCheckout}
//               className="mt-8 border border-transparent hover:border-gray-300 dark:bg-white dark:hover:bg-gray-900 dark:text-gray-900 dark:hover:text-white dark:border-transparent bg-gray-900 hover:bg-white text-white hover:text-gray-900 flex justify-center items-center py-4 rounded w-full"
//             >
//               <p className="text-base leading-4">Pay ${totalPrice}</p>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
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
