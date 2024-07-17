import { Schema, model, Types, models } from "mongoose";
const FormSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    department: {
      type: Types.ObjectId,
      ref: "Department",
    },
    published: {
      type: Boolean,
      default: false,
    },
    views: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    deadline: {
      type: String,
      required: true,
    },
    fields: [
      {
        type: {
          type: String,
          enum: ["text", "textarea", "dropdown", "radio", "checkbox"],
        },
        title: String,
        required: Boolean,
        options: [String],
        properties: Schema.Types.Mixed,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Form = models.Form || model("Form", FormSchema);

export default Form;
