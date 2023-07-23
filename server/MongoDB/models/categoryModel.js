import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
