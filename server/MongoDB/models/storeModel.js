import mongoose from "mongoose";

const StoreSchema = mongoose.Schema(
  {
    owner_id: {
      type: String,
      required: true,
    },
    store_name: {
      type: String,
      required: true,
    },
    //   store_address: {
    //     type: String,
    //     required: true,
    //   },
    products: {
      type: Array(String),
      required: true,
    }, // [ObjectId("product_id")]
    orders: {
      type: Array(String),
      required: true,
    }, //[ObjectId("order_id")]
  },
  { timestamps: true }
);

const StoreModel = mongoose.model("Store", StoreSchema);
export default StoreModel;
