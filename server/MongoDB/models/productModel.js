 import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Array({_id: String, name: String}),
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    details: {
      type: Array(String),
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
    image: {
      type: String,
      required: true,
    },
    otherImages: Array(String),
    type: {
      type: String,
      required: true,
    },
    hiddenTag: String,
    isPublished: Boolean,
    rating: Number,
    sold: Number,

    variants: Array(String), // list variant ids
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
