import mongoose from "mongoose";

const campusSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
const Campus = mongoose.model("campus", campusSchema, "campus");
export default Campus;
