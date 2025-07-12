import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const {email, password} = await req.json();
    if(!email || !password){
      return NextResponse.json({
        status: "error",
        message: "Faltan datos por llenar"
      })
    }
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      }
    })
    if(!userExist || password !== userExist.password){
      return NextResponse.json({
        status: "error",
        message: "Correo o contraseña incorrecta"
      })
    }
    const token = jwt.sign(
      {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
      },
      process.env.SECRET_VALUE!,
      {expiresIn: "30d"},
    )
    const response =  NextResponse.json({
      status: "success",
      message: "Iniciando sesíon",
      user: {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
      },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 60 * 60 * 24, // 30 días
    });
    return response
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrió un error",
    })
  }
};
