import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: Array(String),
    isPublished: Boolean,

    variants: Array(String), // list variant ids
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
