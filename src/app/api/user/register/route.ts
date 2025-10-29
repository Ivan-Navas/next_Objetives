import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const hash: number = 10;
    const {name, email, password} = await req.json();
    if(!name || !email || !password){
      return NextResponse.json({
        status: "error",
        message: "Faltan datos por llenar"
      })
    }
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userExist) {
      return NextResponse.json({
        status: "error",
        message: "El usuario ya existe",
      });
    } const bcryptPassword = await bcrypt.hash(password, hash);
    const userSaved = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: bcryptPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        objetives: true,
      }
    });
    const token = jwt.sign(
      {
        email: email,
        name: name,
        id: userSaved.id,
        exp: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 30),
      },
      process.env.SECRET_VALUE!
    );
    console.log(token)
    const response = NextResponse.json({
      status: "success",
      mesagge: "Se ragistró con exito al usuario",
      user: {
        id: userSaved.id,
        name: userSaved.name,
        email: userSaved.email,
      },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 30 * 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: "error",
      message: "Error al registrar el usuario",
      error,
    });
  }
};
