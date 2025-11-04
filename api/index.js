import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import campusRoutes from "./routes/campus.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";
dotenv.config();
const port = process.env.PORT;
const app = express();
// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// api routes
app.use("/api/user", userRoutes);
app.use("/api/campus", campusRoutes);
app.use("/api/business", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "foodApp",
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("server running on port:", port);
});
