import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/libs/prisma";
import { TokenInterface } from "@/interface/user";
import { getToken } from "next-auth/jwt";

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;
    const tokenGoogle = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    
    if(!token && !tokenGoogle){
      return NextResponse.json({
        status: "error",
        message: "No se ha podido autenticar"
      })
    }
    if(token){
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
    }
    if(tokenGoogle){
      const userGExist = await prisma.user.findFirst({
        where: {
          email: tokenGoogle.email!,
        },
        select: {
          id: true,
          email: true,
          name: true,
        }
      })
      if(!userGExist){
        return NextResponse.json({
          status: "error",
          message: "El usuario no existe"
        })
      }
      return NextResponse.json({
        status: "success",
        message: "Perfil obtenido con exito",
        user: userGExist,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrió un error",
      error,
    });
  }
};
