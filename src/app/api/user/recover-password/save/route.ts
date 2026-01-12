import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

export const POST = async (req: NextRequest)=> {
  try {
    const { email, code } = await req.json();
    if(!email){
      return NextResponse.json({
        status: "error",
        message: "Faltan campos por llenar",
      })
    }
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      }
    })
    if(!userExist){
      return NextResponse.json({
        status: "error",
        message: "El usuario no existe"
      })
    }
    await prisma.passwordRecover.create({
      data: {
        email: email,
        code: code,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      }
    })
    return NextResponse.json({
      status: "success",
      message: "Codigo enviado"
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrió un error",
      error
    })
  }
}
