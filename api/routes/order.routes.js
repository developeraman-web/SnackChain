import express from "express";
import {
  generateOrderItems,
  placeOrder,
  showAllOrders,
  showMyOrder,
} from "../controllers/order.controller.js";
const orderRoutes = express.Router();
orderRoutes.post("/place-order", placeOrder, generateOrderItems);
orderRoutes.get("/show-my-order/:userid", showMyOrder);
orderRoutes.get("/show-all-order/:restid", showAllOrders);
export default orderRoutes;
