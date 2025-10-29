import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
    required: true,
  },
  campus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "campus",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchema, "user");
export default User;
