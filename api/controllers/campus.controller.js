import { handleError } from "../helpers/handleError.js";
import Campus from "../models/campus.model.js";

export const RegisterCampus = async (req, res, next) => {
  try {
    const { collegeName, city, state, slug } = req.body;
    const campus = await Campus.findOne({ collegeName: collegeName });
    if (campus) {
      return next(handleError(404, "The college is already registered"));
    }
    const newCampus = new Campus({
      collegeName,
      city,
      state,
      slug,
    });
    await newCampus.save();
    res.status(200).json({
      success: true,
      message: "Campus registered successfully",
      campus: newCampus,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const getAllCampus = async (req, res, next) => {
  try {
    const campus = await Campus.find().lean().exec();
    if (!campus) {
      return next(handleError(404, "Not available"));
    }

    res.status(200).json({
      success: true,
      message: "Campus found successfully",
      campus,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
