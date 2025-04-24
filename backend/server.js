import express from 'express';
const app = express()
import dotenv from 'dotenv';
import { dbconnection } from './config/dbconnection.js';
import productroutes from './routes/productroutes.js';
import cors from 'cors';
import routesuser from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import routes from './routes/cartRoutes.js';
import stripe from './routes/stripeRoutes.js';
dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://my-restaurant-frontend-5hc3.onrender.com/"
  ],
  credentials: true             // 👈 cookie/session ke liye required
}));
dbconnection();
app.use(cookieParser())
app.use("/api", productroutes)
app.use("/api", routesuser)
app.use("/api", routes)
app.use("/api", stripe)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 
