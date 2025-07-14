import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({
      status: "error",
      message: "No estas logeado",
    });
  }
  try {
    jwt.verify(token, process.env.SECRET_VALUE!);
    const response =  NextResponse.json({
      status: "success",
      message: "Sesion cerrada",
    });
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Token invalido",
      error,
    });
  }
};
