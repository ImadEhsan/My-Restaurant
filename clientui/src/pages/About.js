import React from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Layout>
      <Box
        sx={{
          my: 15,
          textAlign: "center",
          p: 2,
          "& h4": {
            fontWeight: "bold",
            my: 2,
            fontSize: "2rem",
          },
          "& p": {
            textAlign: "justify",
          },
          "@media (max-width:600px)": {
            mt: 0,
            "& h4 ": {
              fontSize: "1.5rem",
            },
          },
        }}
      >
        <Typography variant="h4">Welcome To My Resturant</Typography>
        <p>
        Welcome to My Restaurant, where flavor meets passion! We’re not just serving food — we’re serving experiences. From sizzling grilled burgers to crispy loaded fries, every bite is crafted with love and quality ingredients. Whether you’re craving juicy chicken, spicy beef, or a refreshing drink, we’ve got something for everyone. Our goal is to bring you bold flavors, quick service, and a comfortable vibe. We believe great food should be affordable, fast, and unforgettable. So come hungry, leave happy — and remember, at My Restaurant, your cravings are always our top priority!
        </p>
        <br />
        <p>
        At My Restaurant, we’re more than just a fast-food stop — we’re your go-to spot for comfort food done right. We take pride in using fresh ingredients, handcrafted recipes, and a touch of creativity to bring you meals that are both delicious and satisfying. Our team is passionate about food and dedicated to delivering the best service, whether you're dining in, taking out, or ordering online. We’re constantly evolving our menu with new flavors, exciting combos, and seasonal specials to keep things fresh. Thank you for being part of our journey — we can’t wait to serve you again!
        </p>
      </Box>
    </Layout>
  );
};

export default About;
