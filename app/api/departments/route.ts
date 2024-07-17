import { IDepartment } from "@/lib/types/data_types";
import Department from "@/models/department";
import Form from "@/models/form";
import { conn } from "@/models/mongo_db_connection";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const POST = async (req: NextRequest) => {
  try {
    await conn();
    const data: IDepartment = await req.json();
    const new_department = await Department.create(data);
    return NextResponse.json(new_department);
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
    const departments = await Department.aggregate([
      {
        $lookup: {
          from: User.collection.name,
          localField: "_id",
          foreignField: "departments",
          as: "students",
        },
      },
      {
        $lookup: {
          from: Form.collection.name,
          localField: "_id",
          foreignField: "department",
          as: "forms",
        },
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          updatedAt: 1,
          title: 1,
          description: 1,
          numberOfStudents: { $size: "$students" },
          numberOfForms: { $size: "$forms" },
        },
      },
    ]);

    return NextResponse.json(departments);
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      message: err.message,
      success: false,
    });
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await conn();
    const data: IDepartment = await req.json();
    const updated_department = await Department.findByIdAndUpdate(
      data._id,
      data,
      { new: true }
    );
    return NextResponse.json(updated_department);
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      message: err.message,
      success: false,
    });
  }
};
