import { IUser, IUserBasic } from "@/lib/types/data_types";
import { conn } from "@/models/mongo_db_connection";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const POST = async (req: NextRequest) => {
  try {
    await conn();
    const data: IUserBasic = await req.json();
    const createUser = await User.create(data);
    return NextResponse.json(createUser);
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
    const user_uid = await req.nextUrl.searchParams.get("uid");
    const email = await req.nextUrl.searchParams.get("email");
    const query = email ? { email } : { uid: user_uid };
    const user = await User.findOne({
      ...query,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json(user);
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
    const body: Partial<IUser> = await req.json();
    const user = await User.findByIdAndUpdate(
      {
        _id: body._id,
      },
      body,
      { new: true }
    );
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }
    return NextResponse.json(user);
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      message: err.message,
      success: false,
    });
  }
};
