import mongoose from "mongoose";
const menuSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "restaurant",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
    requried: true,
  },
  thumbImg: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  tag: {
    type: String,
    enum: ["veg", "non-veg"],
    required: true,
  },
  prepTime: {
    type: String,
  },
  rating: {
    type: Number,
  },
});
const Menu = mongoose.model("menu", menuSchema, "menu");
export default Menu;
