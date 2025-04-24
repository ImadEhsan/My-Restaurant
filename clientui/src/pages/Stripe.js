import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { decrementCartItem, fetchCart, incrementCartItem, removeCartItem } from "../redux/feature/cart/cartSlice";
import { Link } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js'

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, loading, error, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart()); // Fetch cart on component mount
  }, [dispatch, cartItems]);

  const handleCheckout = async () => {
    try {
        const stripe = await loadStripe("pk_test_51R9uRaQIFzVjhTcsWGpm3REDVwFgpdWbPQJ9eE7BZZDr3LwRSdeA9GZTPAjWcIOeVJOrpFnXgELQX3Q2chh90SFq00JCY0DHei");

        const response = await fetch("http://localhost:8080/api/stripepayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartItems)
        });

        const session = await response.json();
        console.log("Stripe Session:", session);

        if (!session.sessionId) {
            console.error("Session ID not received", session);
            return;
        }

        const { error } = await stripe.redirectToCheckout({ sessionId: session.sessionId });

        if (error) {
            console.error("Stripe Checkout Error:", error);
        }
    } catch (error) {
        console.error("Checkout Error:", error);
    }
};


  if (loading) return <p className="text-center text-lg font-semibold">Loading cart...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold my-4">Shopping Cart</h1>
        {/* <Link to="/checkout"> */}
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={handleCheckout}>
            Checkout
          </button>
        {/* </Link> */}
      </div>
      <div className="mt-8">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <img src={item.image} alt={item.title || "Product Image"} className="w-32 h-32 object-cover" />
              </div>

              {/* Product Details */}
              <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <div className="mt-4 flex items-center">
                  <span className="mr-2 text-gray-600">Quantity:</span>
                  <div className="flex items-center">
                    <button
                      className="bg-gray-200 rounded-l-lg px-2 py-1"
                      onClick={() => dispatch(decrementCartItem(item.productId))}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2 text-gray-600">{item.quantity}</span>
                    <button
                      className="bg-gray-200 rounded-r-lg px-2 py-1"
                      onClick={() => dispatch(incrementCartItem(item.productId))}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <span className="ml-auto font-bold">${item.price ? item.price.toFixed(2) : "0.00"}</span>
                </div>
              </div>

              {/* Remove Button */}
              <div className="mt-4 md:mt-0 md:ml-6 flex items-center">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => dispatch(removeCartItem(item.productId))}
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end items-center mt-8">
        <span className="text-gray-600 mr-4">Subtotal:</span>
        <span className="text-xl font-bold">${Number(totalPrice).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;