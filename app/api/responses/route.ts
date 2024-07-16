import { IResponse } from "@/lib/types/data_types";
import { conn } from "@/models/mongo_db_connection";
import Response from "@/models/response";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await conn();

    const body: IResponse = await req.json();
    const reponse_exists = await Response.findOne({
      form: body.form,
      user: body.user,
    });
    if (reponse_exists) {
      return NextResponse.json({
        message: "Response already exists",
        success: false,
      });
    }
    const response = await Response.create(body);
    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
      success: false,
    });
  }
};
