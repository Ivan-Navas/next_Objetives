import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { TokenInterface } from "@/interface/user";

export const GET = async (req: NextRequest, context: { params: Promise<{id: string}>}) => { 
  try {
    const userId = ( await context.params).id;
    const token = req.cookies.get("token")?.value;
    if(!token){
      return NextResponse.json({
        status: "error",
        message: "No se pudo autenticar"
      })
    }
    const SECRET_VALUE = process.env.SECRET_VALUE;
    const verify = jwt.verify(token, SECRET_VALUE!);
    const tokenId = (verify as TokenInterface).id;
    if(tokenId !== parseInt(userId)){
      return NextResponse.json({
        status: "error",
        message: "El token no es correcto",
      })
    }
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(String(userId)),
      },
      select: {
        id: true,
      }
    });
    if(!user){
      return NextResponse.json({
        status: "error",
        message: "El usuario no existe",
      })
    }
    const objetives = await prisma.objetive.findMany({
      where: {
        userId: user?.id,
      },
    });
    return NextResponse.json({
      status: "success",
      message: "Lista de objetivos",
      objetives: objetives,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: "Error al obtener los objetivos",
      error: error.message,
    });
  }
};
