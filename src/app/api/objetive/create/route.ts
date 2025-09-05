import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import jwt from "jsonwebtoken";
import { TokenInterface } from "@/interface/user";
import { getToken } from "next-auth/jwt";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const token = req.cookies.get("token")?.value;
    const googleToken = req.cookies.get("next-auth.session-token")?.value;

    if(!token && !googleToken){
      return NextResponse.json({
        status: "error",
        message: "No se pudo autenticar",
      })
    }
    if(token){
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
            amount: parseInt(String(await data.amount)),
            userId: userId,
            progress: 0,
          },
        });
        return NextResponse.json({
          status: "success",
          message: "Objetivo creado con exito",
          objetive: objetiveCreate,
        });
      }

    }
    if(googleToken){
      const tokenGoogle = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if(!tokenGoogle){
        return NextResponse.json({
          status: "error",
          message: "Token invalido"
        })
      }
      const userGExist = await prisma.user.findFirst({
        where: {
          email: tokenGoogle.email!,
        },
        select: {
          id: true
        }
      })
      if(!userGExist){
        return NextResponse.json({
          status: "error",
          message: "El usuario no existe",
        })
      }
      const objetiveGCreate = await prisma.objetive.create({
        data: {
          title: data.title,
          amount: parseInt(String(await data.amount)),
          userId: userGExist.id,
          progress: 0,
        }
      })
      console.log(objetiveGCreate);
      return NextResponse.json({
        status: "success",
        message: "Objetivo creado con exito",
        objetive: objetiveGCreate,
      })
    }
    else {
      console.log("aquí")
      return NextResponse.json({
        status: "error",
        message: "Faltan datos",
      });
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      status: "error",
      message: "Ocurio un error al guardar el objetivo",
      error,
    });
  }
};
