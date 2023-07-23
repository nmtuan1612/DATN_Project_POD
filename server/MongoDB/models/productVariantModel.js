import mongoose from "mongoose";

const ProductVariantSchema = mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    retailPrice: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
      required: true,
    },
    profitMargin: {
      type: Number,
      required: true,
    },
    productionCost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ProductVariantModel = mongoose.model(
  "ProductVariant",
  ProductVariantSchema
);
export default ProductVariantModel;
