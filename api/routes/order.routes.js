import express from "express";
import {
  generateOrderItems,
  placeOrder,
  showMyOrder,
} from "../controllers/order.controller.js";
const orderRoutes = express.Router();
orderRoutes.post("/place-order", placeOrder, generateOrderItems);
orderRoutes.get("/show-my-order/:userid", showMyOrder);
export default orderRoutes;
