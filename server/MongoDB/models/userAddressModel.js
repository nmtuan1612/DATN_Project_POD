import mongoose from "mongoose";

const UserAddressSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserAddressModel = mongoose.model("UserAddress", UserAddressSchema);
export default UserAddressModel;
