import Department from "@/models/department";
import Form from "@/models/form";
import { conn } from "@/models/mongo_db_connection";
import Response from "@/models/response";
import User from "@/models/user";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.nextUrl.searchParams.get("_id");

    if (!userId) {
      return NextResponse.json({
        message: "User ID is required",
        success: false,
      });
    }

    await conn();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }

    const forms = await Form.aggregate([
      {
        $match: {
          department: { $in: user.departments },
        },
      },
      {
        $lookup: {
          from: "responses",
          let: { formId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$form", "$$formId"] },
                    { $eq: ["$user", new Types.ObjectId(userId)] },
                  ],
                },
              },
            },
          ],
          as: "userResponses",
        },
      },
      {
        $addFields: {
          hasUserFilled: { $gt: [{ $size: "$userResponses" }, 0] },
          responseCount: { $size: "$userResponses" },
        },
      },
      {
        $project: {
          userResponses: 0,
        },
      },
    ]);

    return NextResponse.json(forms);
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      message: err.message,
      success: false,
    });
  }
};
