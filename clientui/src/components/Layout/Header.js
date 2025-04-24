import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Logo from "../../images/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/HeaderStyles.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/feature/cart/cartSlice";
import { logout, logoutuser } from "../../redux/feature/auth/authSlice";
import SearchBox from "../../pages/SearchBox";


const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ... (handleLogout and other state/functions remain the same) ...
  const handleLogout = async () => {
    try {
      await dispatch(logoutuser()).unwrap();
      dispatch(logout());
      dispatch(clearCart());
      localStorage.removeItem("user");
      localStorage.removeItem("cartItems");
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  // --- Menu drawer (Mobile View) ---
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      >
        <NavLink to="/">
          <img src={Logo} alt="logo" height={"70"} width="200" />
        </NavLink>
      </Typography>
      <Divider />

      {/* Add SearchBox in Drawer */}
      <Box sx={{ px: 2, py: 1 }}> {/* Add some padding */}
        <SearchBox />
      </Box>
      <Divider /> {/* Optional divider */}


      <ul className="mobile-navigation">
        {/* ... (mobile navigation li elements remain the same) ... */}
         <li>
          <NavLink to={"/"} className={({isActive}) => isActive ? "active" : ""}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/menu"} className={({isActive}) => isActive ? "active" : ""}>
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to={"/about"} className={({isActive}) => isActive ? "active" : ""}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to={"/contact"} className={({isActive}) => isActive ? "active" : ""}>
            Contact
          </NavLink>
        </li>
        <li>
          {!user ? (
            <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="text-black text-xl bg-transparent border-none cursor-pointer p-0 font-inherit"
            >
              Logout
            </button>
          )}
        </li>
        <li>
          <NavLink to="/addcart" className="relative flex items-center justify-center">
            <span className="mr-1">🛒</span>
            Cart
            {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                 {cartItems.length}
               </span>
             )}
          </NavLink>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
          <Toolbar>
            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Typography
              color={"goldenrod"}
              variant="h6"
              component="div"
              // Adjust flexGrow if needed based on searchbox placement
              sx={{ flexGrow: { xs: 1, sm: 0 }, mr: { sm: 2 } }} // Don't let logo grow too much on desktop
            >
              <NavLink to="/">
                 <img src={Logo} alt="logo" height={"70"} width="200" /> {/* Adjusted width slightly */}
              </NavLink>
            </Typography>

             {/* Optional Spacer */}
             {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }} /> */}


            {/* --- Desktop Navigation & Search --- */}
            {/* Make this Box a flex container to hold search and nav links */}
            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", flexGrow: 1, justifyContent: 'flex-end' }}>

               {/* Add SearchBox Here (before or after nav links) */}
              <Box sx={{ width: 'auto', mr: 2 }}> {/* Container for SearchBox with margin */}
                <SearchBox />
              </Box>

              <ul className="navigation-menu">
                 {/* ... (desktop navigation li elements remain the same) ... */}
                <li>
                  <NavLink to={"/"} className={({isActive}) => isActive ? "active" : ""}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/menu"} className={({isActive}) => isActive ? "active" : ""}>
                    Menu
                  </NavLink>
                </li>
                 <li>
                  <NavLink to={"/about"} className={({isActive}) => isActive ? "active" : ""}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/contact"} className={({isActive}) => isActive ? "active" : ""}>
                    Contact
                  </NavLink>
                </li>
                <li>
                  {!user ? (
                     <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink>
                   ) : (
                     <button
                       onClick={handleLogout}
                       className="text-white bg-transparent border-none cursor-pointer p-0 font-inherit hover:text-gray-300"
                     >
                       Logout
                     </button>
                   )}
                </li>
                 <li>
                   <NavLink to="/addcart" className="relative flex items-center">
                     <span className="mr-1">🛒</span>
                     Cart
                     {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                         {cartItems.length}
                       </span>
                     )}
                   </NavLink>
                 </li>
              </ul>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer Component */}
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
};

export default Header;
///////// icons ko theek kiya gya hai idr css ki styling k sath///////////
/////////// icon mein login logout cart ahi //////////
// import React, { useState } from "react";
// import {
//   AppBar,
//   Box,
//   Divider,
//   Drawer,
//   IconButton,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import Logo from "../../images/logo.svg";
// import MenuIcon from "@mui/icons-material/Menu";
// import { NavLink, useNavigate } from "react-router-dom";
// import "../../styles/HeaderStyles.css"; // Keep this for existing styles
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../../redux/feature/cart/cartSlice";
// import { logout, logoutuser } from "../../redux/feature/auth/authSlice";

// const Header = () => {
//   const user = useSelector((state) => state.auth.user);
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutuser()).unwrap();
//       dispatch(logout());
//       dispatch(clearCart());
//       localStorage.removeItem("user");
//       localStorage.removeItem("cartItems");
//       // Use setTimeout for a slight delay if needed, otherwise navigate directly
//       navigate("/login");
//       // setTimeout(() => {
//       //     navigate("/login");
//       //   }, 100); // Shorter delay might be sufficient
//     } catch (error) {
//       console.log("Logout failed:", error);
//     }
//   };

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   // Menu drawer (Mobile View)
//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
//       <Typography
//         color={"goldenrod"}
//         variant="h6"
//         component="div"
//         sx={{ flexGrow: 1, my: 2 }}
//       >
//         {/* Use NavLink for logo to go home */}
//         <NavLink to="/">
//           <img src={Logo} alt="logo" height={"70"} width="200" />
//         </NavLink>
//       </Typography>
//       <Divider />
//       {/* --- Mobile Navigation --- */}
//       <ul className="mobile-navigation">
//         <li>
//           <NavLink to={"/"} className={({isActive}) => isActive ? "active" : ""}>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={"/menu"} className={({isActive}) => isActive ? "active" : ""}>
//             Menu
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={"/about"} className={({isActive}) => isActive ? "active" : ""}>
//             About
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={"/contact"} className={({isActive}) => isActive ? "active" : ""}>
//             Contact
//           </NavLink>
//         </li>
//         {/* --- Login/Logout --- */}
//         <li>
//           {!user ? (
//             <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink>
//           ) : (
//             <button
//               onClick={handleLogout}
//               // Apply styles similar to mobile nav links using Tailwind or CSS class
//               // Using Tailwind for inline styling similar to mobile links (adjust font-size if needed)
//               className="text-black text-xl bg-transparent border-none cursor-pointer p-0 font-inherit" // Added text-xl, adjust if needed
//             >
//               Logout
//             </button>
//           )}
//         </li>
//         {/* --- Cart Link (Moved inside li) --- */}
//         <li>
//           <NavLink to="/addcart" className="relative flex items-center justify-center"> {/* Added flex for alignment */}
//             <span className="mr-1">🛒</span> {/* Added margin */}
//             Cart
//             {cartItems.length > 0 && ( // Conditionally render badge
//                 <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                  {cartItems.length}
//                </span>
//              )}
//           </NavLink>
//         </li>
//       </ul>
//     </Box>
//   );

//   return (
//     <>
//       <Box>
//         <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
//           <Toolbar>
//             {/* Mobile Menu Icon */}
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               sx={{
//                 mr: 2,
//                 display: { sm: "none" },
//               }}
//               onClick={handleDrawerToggle}
//             >
//               <MenuIcon />
//             </IconButton>

//             {/* Logo */}
//             <Typography
//               color={"goldenrod"}
//               variant="h6"
//               component="div"
//               sx={{ flexGrow: 1 }}
//             >
//               {/* Use NavLink for logo to go home */}
//               <NavLink to="/">
//                  <img src={Logo} alt="logo" height={"70"} width="250" />
//               </NavLink>
//             </Typography>

//             {/* Desktop Navigation */}
//             <Box sx={{ display: { xs: "none", sm: "block" } }}>
//               <ul className="navigation-menu">
//                 <li>
//                   {/* Use function with isActive for NavLink v6+ */}
//                   <NavLink to={"/"} className={({isActive}) => isActive ? "active" : ""}>
//                     Home
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to={"/menu"} className={({isActive}) => isActive ? "active" : ""}>
//                     Menu
//                   </NavLink>
//                 </li>
//                  <li>
//                   <NavLink to={"/about"} className={({isActive}) => isActive ? "active" : ""}>
//                     About
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to={"/contact"} className={({isActive}) => isActive ? "active" : ""}>
//                     Contact
//                   </NavLink>
//                 </li>
//                 {/* --- Login/Logout --- */}
//                 <li>
//                   {!user ? (
//                      <NavLink to="/login" className={({isActive}) => isActive ? "active" : ""}>Login</NavLink>
//                    ) : (
//                      <button
//                        onClick={handleLogout}
//                        // Apply styles similar to desktop nav links (text-white)
//                        className="text-white bg-transparent border-none cursor-pointer p-0 font-inherit hover:text-gray-300" // Added hover effect
//                      >
//                        Logout
//                      </button>
//                    )}
//                 </li>
//                 {/* --- Cart Link (Moved inside li) --- */}
//                 <li>
//                     {/* Add relative positioning to li if needed for badge positioning */}
//                    <NavLink to="/addcart" className="relative flex items-center"> {/* Added flex for alignment */}
//                      <span className="mr-1">🛒</span> {/* Added margin */}
//                      Cart
//                      {/* Conditionally render badge only if items exist */}
//                      {cartItems.length > 0 && (
//                         <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                          {cartItems.length}
//                        </span>
//                      )}
//                    </NavLink>
//                  </li>
//               </ul>
//             </Box>
//           </Toolbar>
//         </AppBar>

//         {/* Mobile Drawer Component */}
//         <Box component="nav">
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: "240px", // Adjust width if needed
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         {/* Add Toolbar to prevent content from going under AppBar */}
//         <Box>
//           <Toolbar />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Header;
/////////// orignal edited by awab & imad//////////////
/////////// yahan khatm ho rha hai or agla shuru /////////
// import React, { useState } from "react";
// import {
//   AppBar,
//   Box,
//   Divider,
//   Drawer,
//   IconButton,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import Logo from "../../images/logo.svg";

// import MenuIcon from "@mui/icons-material/Menu";
// import {  NavLink, useNavigate } from "react-router-dom";
// import "../../styles/HeaderStyles.css";
// import {  useDispatch, useSelector } from "react-redux";

// import { clearCart } from "../../redux/feature/cart/cartSlice";
// import { logout, logoutuser } from "../../redux/feature/auth/authSlice";



// const Header = () => {
//   const user = useSelector((state) => state.auth.user);
//   const cartItems = useSelector((state) => state.cart.cartItems);
//   // console.log(cartItems)

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleLogout = async () => {
//     try {
//       await 
//       dispatch(logoutuser()).unwrap(); // Ensure API call succeeds
//       dispatch(logout()); // ✅ Clears user state
//       dispatch(clearCart()); // ✅ Clears cart state
//       localStorage.removeItem("user"); // ✅ Remove user from localStorage
//       localStorage.removeItem("cartItems"); // ✅ Remove cart from localStorage
//       // Navigate without await
//       setTimeout(() => {
//           navigate("/login");
//         }, 3000);
//         // navigate("/login");
  
//     } catch (error) {
//       console.log("Logout failed:", error);
//     }
//   };
//   const [mobileOpen, setMobileOpen] = useState(false);
//   // hndle menu click
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };
//   //menu drawer
//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
//       <Typography
//         color={"goldenrod"}
//         variant="h6"
//         component="div"
//         sx={{ flexGrow: 1, my: 2 }}
//       >
//         <img src={Logo} alt="logo" height={"70"} width="200" />
//       </Typography>
//       <Divider />
//       <ul className="mobile-navigation">
//         <li>
//           <NavLink activeClassName="active" to={"/"}>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to={"/menu"}>Menu</NavLink>
//         </li>
//         <li>
//         {!user ? (
//           <NavLink to="/login">Login</NavLink>
//         ) : (
//           <button onClick={handleLogout} className="text-white">Logout</button>
//         )}
//                 </li>
//         <li>
//           <NavLink to={"/about"}>About</NavLink>
//         </li>
//         <li>
//           <NavLink to={"/contact"}>Contact</NavLink>
//         </li>
//         <NavLink to="/addcart" className="relative">
//           🛒 Cart <span className="bg-red-500 text-white px-2 py-1 rounded-full">{cartItems.length}</span>
//         </NavLink>
//       </ul>
//     </Box>
//   );
//   return (
//     <>
//       <Box>
//         <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               sx={{
//                 mr: 2,
//                 display: { sm: "none" },
//               }}
//               onClick={handleDrawerToggle}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography
//               color={"goldenrod"}
//               variant="h6"
//               component="div"
//               sx={{ flexGrow: 1 }}
//             >
//               <img src={Logo} alt="logo" height={"70"} width="250" />
//             </Typography>
//             <Box sx={{ display: { xs: "none", sm: "block" } }}>
//               <ul className="navigation-menu">
//                 <li>
//                   <NavLink activeClassName="active" to={"/"}>
//                     Home
//                   </NavLink>
//                 </li>
//                 <li>
//                   <NavLink to={"/menu"}>Menu</NavLink>
//                 </li>
//                 <li>
//                 {!user ? (
//           <NavLink to="/login">Login</NavLink>
//         ) : (
//           <button onClick={handleLogout} className="text-white">Logout</button>
//         )}
//                 </li>
//                 <li>
//                   <NavLink to={"/about"}>About</NavLink>
//                 </li>
//                 <li>
//                   <NavLink to={"/contact"}>Contact</NavLink>
//                 </li>
//                 <NavLink to="/addcart" className="relative">
//           🛒 Cart <span className="bg-red-500 text-white px-2 py-1 rounded-full">{cartItems.length}</span>
//         </NavLink>
//               </ul>
//             </Box>
//           </Toolbar>
//         </AppBar>
//         <Box component="nav">
//           <Drawer
//             variant="temporary"
//             open={mobileOpen}
//             onClose={handleDrawerToggle}
//             sx={{
//               display: { xs: "block", sm: "none" },
//               "& .MuiDrawer-paper": {
//                 boxSizing: "border-box",
//                 width: "240px",
//               },
//             }}
//           >
//             {drawer}
//           </Drawer>
//         </Box>
//         <Box>
//           <Toolbar />
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default Header;
/////////// orignal edited by awab & imad//////////////