import { Schema, model, Types, models } from "mongoose";

const ResponseSchema = new Schema(
  {
    form: {
      type: Types.ObjectId,
      ref: "Form",
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    responses: [
      {
        field: {
          type: Types.ObjectId,
          required: true,
        },
        answer: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Response = models.Response || model("Response", ResponseSchema);

export default Response;
