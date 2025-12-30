import { prisma } from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, code } = await req.json();
    if(!email){
      return NextResponse.json({
        status: "error",
        message: "Ingrese su correo"
      })
    }
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
      }
    })
    if(userExist){
      return NextResponse.json({
        status: "error",
        message: "El usuario ya existe",
      })
    }
    const codeSaved = await prisma.userVerify.create({
      data: {
        email: email,
        code: code,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      }
    })
    if(!codeSaved){
      return NextResponse.json({
        status: "error",
        message: "Error al guardar el codigo de verificación"
      })
    }
    return NextResponse.json({
      status: "success",
      message: "Codigo guardado"
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrio un error"
    })
  }
}
