import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <span className="text-5xl">✅</span>
      <p className="text-gray-500 text-sm font-semibold mt-2">SUCCESS</p>
      <h2 className="text-2xl font-bold mt-2">Your order has been placed</h2>
      <p className="text-gray-500 text-center max-w-md mt-2">
        Build a well-presented brand that everyone will love. Take care to develop resources
        continually and integrate them with previous projects.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
      >
        Continue Shopping
      </button>
    </div>
  );
}
