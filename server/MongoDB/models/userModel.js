import { mongoose } from "mongoose";
const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    profilePicture: String,
    roles: {
      type: Array(String),
      required: true,
    },
    listStore: {
      type: Array(String),
      required: true,
    },
    cart: [
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

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
