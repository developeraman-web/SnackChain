import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
    },
    campus: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "campus",
    },
    restaurantFeatureImage: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    ownerContact: {
      type: String,
      required: true,
    },
    restaurantContact: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      enum: ["veg", "non-veg", "both"],
      required: true,
    },
    restaurantRating: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
const Restaurant = mongoose.model("restaurant", restaurantSchema, "restaurant");
export default Restaurant;
