import { IUser, IUserBasic } from "@/lib/types/data_types";
import { conn } from "@/models/mongo_db_connection";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await conn();
    const users = await User.find({
      role: "user",
    });
    return NextResponse.json(users);
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      message: err.message,
      success: false,
    });
  }
};
