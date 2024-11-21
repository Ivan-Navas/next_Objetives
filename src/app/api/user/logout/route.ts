import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
const { verify } = require("jsonwebtoken");

export const POST = async (request: NextRequest) => {
  const token = cookies().get("token");
  if (!token?.value) {
    return NextResponse.json({
      status: "error",
      message: "No estas logeado",
    });
  }

  try {
    verify(token.value, process.env.SECRET_VALUE);

    cookies().set({
      name: "token",
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0,
      secure: process.env.NODE_ENV === "production",
    });
    return NextResponse.json({
      status: "succes",
      message: "Sesion cerrada",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Token invalido",
    });
  }
};
