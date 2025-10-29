import { handleError } from "../helpers/handleError.js";
import Restaurant from "../models/restraunt.model.js";
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";

export const registerRestaurant = async (req, res, next) => {
  try {
    const data = req.body;

    let newRestaurant = await Restaurant.findOne({
      name: data.restaurantName,
      campus: data.Campus,
    });
    if (newRestaurant) {
      return next(handleError(404, "The Restaurant is already registered"));
    }
    let featuredImage = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "foodApp",
          resource_type: "auto",
        })
        .catch((error) => {
          return next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }
    newRestaurant = new Restaurant({
      name: data.restaurantName,
      campus: data.campus,
      restaurantContact: data.restaurantContact,
      slug: data.slug,
      tag: data.tag,
      restaurantFeatureImage: featuredImage,
      ownerContact: data.ownerContact,
      ownerEmail: data.ownerEmail,
      ownerName: data.ownerName,
    });
    await newRestaurant.save();
    res.status(200).json({
      success: true,
      message: "Restaurant registered successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const VerifyRestaurantOwner = async (req, res, next) => {
  try {
    const { email } = req.body;
    const restaurantOfOwner = await Restaurant.findOne({ ownerEmail: email });
    if (!restaurantOfOwner) {
      return next(handleError(404, "Please Register"));
    }
    const payload = {
      _id: restaurantOfOwner._id,
      ownerEmail: restaurantOfOwner.ownerEmail,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("access_token_owner", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      restaurant: restaurantOfOwner,
      message: "verified successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getRestaurantByCampus = async (req, res, next) => {
  try {
    const { campusid } = req.params;
    const restaurants = await Restaurant.find({ campus: campusid })
      .lean()
      .exec();
    res.status(200).json({
      success: true,
      restaurants,
      message: "campus wise rest.",
    });
  } catch (error) {}
};
