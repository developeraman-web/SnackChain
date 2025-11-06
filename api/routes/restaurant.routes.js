import express from "express";
import {
  getRestaurantByCampus,
  getRestaurantById,
  registerRestaurant,
  updateRestaurant,
  VerifyRestaurantOwner,
} from "../controllers/restaurant.controller.js";
import upload from "../config/multer.js";
const restaurantRoutes = express.Router();
restaurantRoutes.post("/register", upload.single("file"), registerRestaurant);
restaurantRoutes.post("/verify-owner", VerifyRestaurantOwner);
restaurantRoutes.post("/update", upload.single("file"), updateRestaurant);
restaurantRoutes.get("/get-all/:campusid", getRestaurantByCampus);
restaurantRoutes.get("/get-restaurant/:restaurantid", getRestaurantById);
export default restaurantRoutes;
