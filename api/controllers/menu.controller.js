import { handleError } from "../helpers/handleError.js";
import Menu from "../models/menu.model.js";
import cloudinary from "../config/cloudinary.js";
export const addMenu = async (req, res, next) => {
  try {
    const { name, price, category, description, tag } = req.body;
    const { restaurantid } = req.params;
    const menu = await Menu.findOne({ name: name, restaurant: restaurantid });
    if (menu) {
      return next(handleError(404, "The menu item is already present"));
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
    const newMenu = new Menu({
      restaurant: restaurantid,
      name,
      price,
      category,
      description,
      tag,
      thumbImg: featuredImage,
    });
    await newMenu.save();
    res.status(200).json({
      success: true,
      message: "Menu item added successfully",
      menu: newMenu,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getMenuById = async (req, res, next) => {
  try {
    const { menuid } = req.params;
    const menu = await Menu.findById(menuid);
    if (!menu) {
      return next(handleError(404, "menu item doesn't exist!"));
    }
    res.status(200).json({
      success: true,
      message: "Menu item found successfully!",
      menu,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
export const getAllMenu = async (req, res, next) => {
  try {
    const { restaurantid } = req.params;
    const menu = await Menu.find({ restaurant: restaurantid })
      .populate("restaurant", "name")
      .lean()
      .exec();
    if (!menu) {
      return next(handleError(404, "No Menu Item"));
    }
    res.status(200).json({
      success: true,
      message: "Menu items found successfully!",
      menu,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const editMenu = async (req, res, next) => {
  try {
    const { name, price, category, description, tag } = req.body;
    const { menuid } = req.params;
    const menu = await Menu.findById(menuid);
    menu.name = name;
    menu.price = price;
    menu.category = category;
    menu.description = description;
    menu.tag = tag;
    let featuredImage = menu.thumbImg;
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
    menu.thumbImg = featuredImage;
    await menu.save();
    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      menu,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteMenu = async (req, res, next) => {
  try {
    const { menuid } = req.params;
    const menu = await Menu.findByIdAndDelete(menuid).exec();
    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
      menu,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
