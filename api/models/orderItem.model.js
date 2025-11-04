import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "order",
  },
  menuId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "menu",
  },
  quantity: {
    required: true,
    type: Number,
  },
});

const OrderItem = mongoose.model("orderItem", orderItemSchema, "orderItem");
export default OrderItem;
