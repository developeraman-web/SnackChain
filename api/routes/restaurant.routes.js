import express from "express";
import {
  getRestaurantByCampus,
  registerRestaurant,
  VerifyRestaurantOwner,
} from "../controllers/restaurant.controller.js";
import upload from "../config/multer.js";
const restaurantRoutes = express.Router();
restaurantRoutes.post("/register", upload.single("file"), registerRestaurant);
restaurantRoutes.post("/verify-owner", VerifyRestaurantOwner);
restaurantRoutes.get("/get-all/:campusid", getRestaurantByCampus);
export default restaurantRoutes;
