import { IDepartment, IForm } from "@/lib/types/data_types";
import Department from "@/models/department";
import Form from "@/models/form";
import { conn } from "@/models/mongo_db_connection";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await conn();
    const data: IForm = await req.json();
    const newForm = await Form.create(data);
    return NextResponse.json(newForm);
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      message: err.message,
      success: false,
    });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await conn();
    const form_id = req.nextUrl.searchParams.get("form_id");
    if (form_id) {
      Department;
      const form = await Form.findById(form_id).populate("department");
      return NextResponse.json(form);
    }
    const forms = await Form.aggregate([
      {
        $lookup: {
          from: "responses",
          localField: "_id",
          foreignField: "form",
          as: "responses",
        },
      },
      {
        $addFields: {
          responseCount: { $size: "$responses" },
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "departmentDetails",
        },
      },
      {
        $unwind: "$departmentDetails",
      },
      {
        $project: {
          responses: 0,
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