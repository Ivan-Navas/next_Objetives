import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const { email, code } = await req.json();
    if(!code || !email){
      return NextResponse.json({
        status: "error",
        message: "Faltan campos por llenar"
      })
    }
    const codeExist = await prisma.userVerify.findFirst({
      where: {
        email: email,
        code: Number(code),
      },
      select: {
        id: true,
        email: true,
        code: true,
        isVerify: true,
        expiresAt: true,
      }
    })
    
    if(!codeExist){
      return NextResponse.json({
        status: "error",
        message: "El codigo no existe",
      })
    }
    if(codeExist?.isVerify){
      return NextResponse.json({
        status: "error",
        message: "El codigo ya a sido utilizado",
      })
    }
    const now = new Date();
    if(now > codeExist.expiresAt){
      return NextResponse.json({
        status: "error",
        message: "El codigo ya expiró"
      })
    }
    await prisma.userVerify.update({
      where:{
        id: codeExist.id,
        email: codeExist.email,
        code: codeExist.code,
      },
      data: {
        isVerify: true,
      }
    })
    return NextResponse.json({
      status: "success",
      message: "Codigo verificado con exito",
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "error",
      message: "Ocurrio un error",
    })
  }
}
