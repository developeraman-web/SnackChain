import express from "express";
import {
  updateCampus,
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/user.controller.js";
const userRoutes = express.Router();
userRoutes.post("/signup", userSignup);
userRoutes.post("/login", userLogin);
userRoutes.post("/update/:userid", updateCampus);
userRoutes.get("/logout", userLogout);
export default userRoutes;
