import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/libs/prisma";
import { TokenInterface } from "@/interface/user";

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;
    if(!token){
      return NextResponse.json({
        status: "error",
        message: "No se ha podido autenticar"
      })
    }
    const SECRET = process.env.SECRET_VALUE;
    const verify = jwt.verify(token, SECRET!);
    const userId = (verify as TokenInterface).id;
    const userExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    })
    if(!userExist){
      return NextResponse.json({
        status: "error",
        message: "El usuario no existe"
      })
    }
    return NextResponse.json({
      status: "success",
      message: "Perfil obtenido con exito",
      user: userExist,
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrió un error",
      error,
    });
  }
};
