import express from "express";
import { makepayment } from "../controller/stripeController.js";

const stripe = express.Router();

stripe.post('/stripepayment',makepayment)


export default stripe;