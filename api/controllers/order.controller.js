import mongoose from "mongoose";
import { handleError } from "../helpers/handleError.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";

export const placeOrder = async (req, res, next) => {
  try {
    const { items, orderMenu, userId, restId } = req.body;
    let total = 0;
    for (const item of items) {
      const dbItem = orderMenu.find((i) => i._id.toString() === item.itemId);
      if (dbItem) {
        total += dbItem.price * item.quantity;
      }
    }
    const order = new Order({
      userId: userId,
      restaurantId: restId,
      totalAmount: total,
    });
    await order.save();
    req.orderItems = items;
    req.order = order;
    next();
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const generateOrderItems = async (req, res) => {
  try {
    const orderItems = req.orderItems;
    const order = req.order;
    orderItems.map(async (item) => {
      let dbOrderItem = new OrderItem({
        orderId: order._id,
        menuId: item.itemId,
        quantity: item.quantity,
      });
      if (!orderItems) {
        return next(handleError(404, "order items cannot be added"));
      }
      await dbOrderItem.save();
    });

    res.json({ message: "Order Placed successfully" });
  } catch (error) {
    return next(handleError());
  }
};

export const showMyOrder = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const orders = await Order.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userid) } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "orderItem",
          localField: "_id",
          foreignField: "orderId",
          as: "orderItems",
          pipeline: [
            {
              $lookup: {
                from: "menu",
                localField: "menuId",
                foreignField: "_id",
                as: "menu",
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      name: 1,
                    },
                  },
                ],
              },
            },
            {
              $unwind: {
                path: "$menu",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
        },
      },

      {
        $lookup: {
          from: "restaurant",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$restaurant",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]).exec();
    res.status(200).json({
      message: "orders fetched successfuly",
      orders,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

export const showAllOrders = async (req, res, next) => {
  try {
    const { restid } = req.params;
    const orders = await Order.aggregate([
      {
        $match: { restaurantId: new mongoose.Types.ObjectId(restid) },
      },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "orderItem",
          localField: "_id",
          foreignField: "orderId",
          as: "orderItems",
          pipeline: [
            {
              $lookup: {
                from: "menu",
                localField: "menuId",
                foreignField: "_id",
                as: "menu",
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      name: 1,
                    },
                  },
                ],
              },
            },
            {
              $unwind: {
                path: "$menu",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
        },
      },

      {
        $lookup: {
          from: "restaurant",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$restaurant",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "orders found succesfully",
      orders,
    });
  } catch (error) {
    return next(handleError(500, `catch block error: ${error.message} `));
  }
};
