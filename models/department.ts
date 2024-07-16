import { Schema, model, Types, models } from "mongoose";
const DepartmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);
const Department = models.Department || model("Department", DepartmentSchema);

export default Department;
