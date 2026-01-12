import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

export const POST = async (req: NextRequest)=>{
  try {
    const { email, code } = await req.json();
    if(!email || !code){
      return NextResponse.json({
        status: "error",
        message: "Faltan datos por llenar",
      })
    }
    const userExist = await prisma.user.findFirst({
      where: {
        email: email as string,
      }
    })
    if(!userExist){
      return NextResponse.json({
        status: "error",
        message: "El usuario no existe",
      })
    }
    const codeExist = await prisma.passwordRecover.findFirst({
      where: {
        code: code as number,
        email: email as string,
      }
    })
    if(!codeExist){
      return NextResponse.json({
        status: "error",
        message: "El codigo no existe"
      })
    }
    const date = new Date();
    if(codeExist.expiresAt > date){
      return NextResponse.json({
        status: "error",
        message: "El codigo ya expiró",
      })
    }
    if(codeExist.isVerify){
      return NextResponse.json({
        status: "error",
        message: "El codigo ya a sido utilizado",
      })
    }
    await prisma.passwordRecover.update({
      where: {
        id: codeExist.id,
        code: codeExist.code,
        email: codeExist.email,
      },
      data: {
        isVerify: true,
      }
    })
    return NextResponse.json({
      status: "success",
      message: "Codigo correcto",
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrió un error",
      error,
    })
  }
}
