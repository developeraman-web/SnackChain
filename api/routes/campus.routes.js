import express from "express";
import {
  getAllCampus,
  RegisterCampus,
} from "../controllers/campus.controller.js";
const campusRoutes = express.Router();
campusRoutes.post("/register", RegisterCampus);
campusRoutes.get("/get-all", getAllCampus);
export default campusRoutes;
