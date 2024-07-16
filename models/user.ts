import { Schema, model, Types, models } from "mongoose";
const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    uid: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} is not supported",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["active", "inactive"],
        message: "{VALUE} is not supported",
      },
      default: "active",
    },
    departments: {
      type: [Types.ObjectId],
      ref: "Department",
    },
  },
  {
    timestamps: true,
  }
);
const User = models.User || model("User", UserSchema);

export default User;
