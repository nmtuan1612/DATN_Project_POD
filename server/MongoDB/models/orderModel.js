import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    }, // ObjectId("user_id")
    storeId: {
      type: String,
      required: true,
    }, // ObjectId("store_id")
    totalCost: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    items: [
      {
        variantId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
