// import React from "react";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import { Box, Typography } from "@mui/material";
// const Footer = () => {
//   return (
//     <>
//       <Box
//         sx={{ textAlign: "center", bgcolor: "#1A1A19", color: "white", p: 3 }}
//       >
//         <Box
//           sx={{
//             my: 3,
//             "& svg": {
//               fontSize: "60px",
//               cursor: "pointer",
//               mr: 2,
//             },
//             "& svg:hover": {
//               color: "goldenrod",
//               transform: "translateX(5px)",
//               transition: "all 400ms",
//             },
//           }}
//         >
//           {/* icons */}
//           <InstagramIcon />
//           <TwitterIcon />
//           <GitHubIcon />
//           <YouTubeIcon />
//         </Box>
//         <Typography
//           variant="h5"
//           sx={{
//             "@media (max-width:600px)": {
//               fontSize: "1rem",
//             },
//           }}
//         >
//           All Rights Reserved &copy; Techinfo YT
//         </Typography>
//       </Box>
//     </>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from 'react-router-dom'; // Link ko import karna na bhoolein


const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-5 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* ABOUT */}
        <div>
          <h2 className="text-lg font-semibold mb-4">ABOUT</h2>
          <p className="text-sm text-gray-300 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex space-x-3">
            <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="paypal" className="w-8 h-8" />
            </a>
            <a href="https://www.americanexpress.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/amex.png" alt="amex" className="w-8 h-8" />
            </a>
            <a href="https://www.mastercard.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="mastercard" className="w-8 h-8" />
            </a>
            <a href="https://www.visa.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="visa" className="w-8 h-8" />
            </a>
            <a href="https://www.discover.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/discover.png" alt="discover" className="w-8 h-8" />
            </a>
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <h2 className="text-lg font-semibold mb-4">CATEGORIES</h2>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><a href="#" className="hover:underline">. Clothing</a></li>
            <li><a href="#" className="hover:underline">. Footwear</a></li>
            <li><a href="#" className="hover:underline">. Hand Bag</a></li>
            <li><a href="#" className="hover:underline">. Jewellery</a></li>
            <li><a href="#" className="hover:underline">. Belt</a></li>
          </ul>
        </div>

        {/* INFORMATION */}
        <div>
          <h2 className="text-lg font-semibold mb-4">INFORMATION</h2>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><a href="#" className="hover:underline">. About Us</a></li>
            <li><a href="#" className="hover:underline">. Contact Us</a></li>
            {/* <li><a href="" className="hover:underline">. Term & Condition</a></li> */}
            <li><Link to="/terms" className="hover:underline">. Term & Condition</Link></li>
            <li><a href="#" className="hover:underline">. Returns & Exchange</a></li>
            <li><a href="#" className="hover:underline">. Shipping & Delivery</a></li>
            <li><a href="#" className="hover:underline">. Private Policy</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-lg font-semibold mb-4">CONTACT</h2>
          <p className="text-sm text-gray-300 mb-1">XYZ, Lahore, Pakistan</p>
          <p className="text-sm text-gray-300 mb-1">Pin code - 110005</p>
          <p className="text-sm text-gray-300 mb-4">+92 3709208609</p>
          <div className="flex space-x-3">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="facebook" className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="instagram" className="w-6 h-6" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/twitter-squared.png" alt="twitter" className="w-6 h-6" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <img src="https://img.icons8.com/color/48/000000/youtube-play.png" alt="youtube" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
        Copyright ©2019 All rights reserved | Design by UI DEV
      </div>
    </footer>
  );
};

  export default Footer;
