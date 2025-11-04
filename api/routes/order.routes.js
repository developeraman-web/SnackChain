import express from "express";
import {
  generateOrderItems,
  placeOrder,
} from "../controllers/order.controller.js";
const orderRoutes = express.Router();
orderRoutes.post("/place-order", placeOrder, generateOrderItems);
export default orderRoutes;
