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

    res.json({ message: "order Placed successfully" });
  } catch (error) {
    return next(handleError());
  }
};
