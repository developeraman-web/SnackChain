import express from "express";
import {
  addMenu,
  deleteMenu,
  editMenu,
  getAllMenu,
  getMenuById,
} from "../controllers/menu.controller.js";
import upload from "../config/multer.js";
const menuRoutes = express.Router();
menuRoutes.get("/get-dish/:menuid", getMenuById);
menuRoutes.get("/get-restaurant-menu/:restaurantid", getAllMenu);
menuRoutes.post("/add/:restaurantid", upload.single("file"), addMenu);
menuRoutes.post("/edit/:menuid", upload.single("file"), editMenu),
  menuRoutes.delete("/delete/:menuid", deleteMenu);
export default menuRoutes;
