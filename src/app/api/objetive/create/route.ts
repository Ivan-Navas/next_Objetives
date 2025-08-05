import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import jwt from "jsonwebtoken";
import { TokenInterface } from "@/interface/user";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const token = req.cookies.get("token")?.value;
    if(!token){
      return NextResponse.json({
        status: "error",
        message: "No se pudo autenticar",
      })
    }
    const verify = jwt.verify(token, process.env.SECRET_VALUE!);
    const userId = (verify as TokenInterface).id;
    const userExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      }
    })
    if(!userExist){
      return NextResponse.json({
        status: "error",
        message: "El usuario no existe",
      })
    }
    if (userId && data.title && data.amount) {
      const objetiveCreate = await prisma.objetive.create({
        data: {
          title: data.title,
          amount: parseInt(String(await data.amount)), //* el amount se recibe como cadena(string)
          userId: userId,
          progress: 0,
        },
      });
      return NextResponse.json({
        status: "success",
        message: "Objetivo creado con exito",
        objetive: objetiveCreate,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "Faltan datos",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurio un error al guardar el objetivo",
      error,
    });
  }
};
