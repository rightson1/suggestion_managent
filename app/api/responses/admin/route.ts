import { IResponse } from "@/lib/types/data_types";
import { conn } from "@/models/mongo_db_connection";
import Response from "@/models/response";
import Form from "@/models/form";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";
export const GET = async (req: NextRequest) => {
  try {
    await conn();

    const user_id = req.nextUrl.searchParams.get("user_id");
    const form_id = req.nextUrl.searchParams.get("form_id");

    if (!form_id) {
      return NextResponse.json(
        {
          message: "User ID and Form ID are required",
          success: false,
        },
        { status: 400 }
      );
    }
    const query = user_id
      ? {
          user: new mongoose.Types.ObjectId(user_id),
          form: new mongoose.Types.ObjectId(form_id),
        }
      : { form: new mongoose.Types.ObjectId(form_id) };

    const response = await Response.aggregate([
      {
        $match: {
          ...query,
        },
      },
      {
        $lookup: {
          from: "forms",
          localField: "form",
          foreignField: "_id",
          as: "formDetails",
        },
      },
      {
        $unwind: "$formDetails",
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $addFields: {
          responses: {
            $map: {
              input: "$responses",
              as: "response",
              in: {
                $mergeObjects: [
                  "$$response",
                  {
                    fieldDetails: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$formDetails.fields",
                            cond: { $eq: ["$$this._id", "$$response.field"] },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          responses: {
            _id: 1,
            field: 1,
            answer: 1,
            fieldDetails: 1,
          },
          createdAt: 1,
          updatedAt: 1,
          //   form: "$formDetails",
          user: "$userDetails",
        },
      },
    ]);

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
        success: false,
      },
      { status: 500 }
    );
  }
};
