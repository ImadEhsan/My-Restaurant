import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import './styles/output.css';
import CartPopup from "./pages/CartPopup ";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Achalogin from "./pages/Achalogin";
import { useSelector } from "react-redux";
import OrderSuccess from "./pages/OrderSuccess";
import SearchBox from "./pages/SearchBox";



function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/achalogin" element={<Achalogin/>} />
          <Route path="/addcart" element={user ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/popup" element={<CartPopup/>} />
          <Route path="/OrderSuccess" element={<OrderSuccess/>} />
          <Route path="/search/:keyword" element={<Menu/>} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
