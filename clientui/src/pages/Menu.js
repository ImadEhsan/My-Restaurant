import React, { useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../redux/feature/product/productSlice";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { addCartProduct } from "../redux/feature/cart/cartSlice";
import { useParams } from "react-router-dom";
// import Login from "./Login";

const Menu = () => {

  const { keyword } = useParams();



  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product); // Ensure correct state access


  const user = useSelector((state) => state.auth.user); // Get user from Redux

  const handleaddcart = (product) => {
    if (!user || !user.data) {
      alert("Please login to add product to cart");
      return;
    }

    if (!user.data._id) {
      // console.error("User ID is missing"); // Log an error if User._id is missing
      return;
    }

    // console.log("Adding product to cart:", {
    //   id: product._id,
    //   quantity: 1,
    //   userid: user.data._id,
    // });

    dispatch(
      addCartProduct({
        productId: product._id,
        quantity: 1,
        userid: user.data._id, // ✅ Corrected user ID access
      })
    );
  };

  useEffect(() => {
    dispatch(fetchAllProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          py: 4,
        }}
      >
        {products?.map((product) => (
          <Card
            key={product._id}
            sx={{
              maxWidth: 390,
              display: "flex",
              flexDirection: "column",
              m: 2,
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardActionArea>
              <CardMedia
                sx={{ minHeight: 400 }}
                component="img"
                src={product.image}
                alt={product.name}
              />
              {/* <CardContent>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "#1f2937" }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "#1f2937" }}
                  alignContent={"flex-end"}
                >
                  {product.price}
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  {product.description
                    ? product.description.slice(0, 100) + "..."
                    : "No description"}
                </Typography>
              </CardContent> */}
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#1f2937" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#1f2937" }}
                  >
                    Rs {product.price}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#6b7280", mt: 1 }}>
                  {product.description
                    ? product.description.slice(0, 100) + "..."
                    : "No description"}
                </Typography>
              </CardContent>

            </CardActionArea>

            <CardActions sx={{ justifyContent: "center", pb: 2 }}>

              <Button

                onClick={() => handleaddcart(product)}
                variant="contained"
                sx={{
                  backgroundColor: "#3b82f6",
                  "&:hover": { backgroundColor: "#2563eb" },
                  borderRadius: 2,
                  textTransform: "none",
                  px: 4,
                }}
              >
                Add to Cart 🛒
              </Button>


            </CardActions>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default Menu;