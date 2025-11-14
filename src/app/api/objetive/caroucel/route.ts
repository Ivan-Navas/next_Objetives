import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import jwt from "jsonwebtoken";
import { TokenInterface } from "@/interface/user";
import { getToken } from "next-auth/jwt";

const getPorcent = (progress: number, amount: number) => {
  let num: number = (progress / amount) * 100;
  const porcent = Math.round(num * 100) / 100;
  return porcent;
};

export const GET = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;
    const tokenGoogle = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log(token)
    if (!token && !tokenGoogle) {
      return NextResponse.json({
        status: "error",
        messge: "No se pudo autenticar",
      });
    }
    if (token) {
      const verify = jwt.verify(token, process.env.SECRET_VALUE!);
      const userId = (verify as TokenInterface).id;
      const userExist = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
        },
      });
      if (!userExist) {
        return NextResponse.json({
          status: "error",
          message: "El usuario no existe",
        });
      }
      const objetives = await prisma.objetive.findMany({
        where: {
          userId: userExist.id,
        },
      });
      if (objetives) {
        const last = await prisma.objetive.findFirst({
          where: {
            userId: userExist.id,
          },
          orderBy: {
            id: "desc",
          },
        });
        const first = await prisma.objetive.findFirst({
          where: {
            userId: userExist.id,
          },
          orderBy: {
            id: "asc",
          },
        });
        const complete = objetives.filter(
          (r) => r.progress === r.amount || r.progress === r.amount
        );
        const response = [
            last && {
              title: "Objetivo reciente",
              objetive: last,
              page: 1,
            },
            first && {
              title: "Mas antiguo",
              objetive: first,
              page: 2,
            },
            complete[0] && {
              title: "Objetivo completo",
              objetive: complete[0],
              page: 3,
            },
        ].filter(Boolean);
        console.log(response)
        return NextResponse.json({
          status: "success",
          message: "caroucel obtenido",
          objetives: response,
        });
      }
      else{
        return NextResponse.json({
          status: "error",
          message: "No hay objetivos"
        })
      }
    }
    if (tokenGoogle) {
      const userGExist = await prisma.user.findFirst({
        where: {
          email: tokenGoogle.email!,
        },
        select: {
          id: true,
        },
      });
      if (!userGExist) {
        return NextResponse.json({
          status: "error",
          message: "El usuario no existe",
        });
      }
      const gObjetives = await prisma.objetive.findMany({
        where: {
          userId: userGExist.id,
        },
      });
      if (gObjetives.length >= 1) {
        const gLast = await prisma.objetive.findFirst({
          where: {
            userId: userGExist.id,
          },
          orderBy: {
            id: "desc",
          },
        });
        const gFirst = await prisma.objetive.findFirst({
          where: {
            userId: userGExist.id,
          },
          orderBy: {
            id: "asc",
          },
        });
        const gComplete = gObjetives.filter(
          (r) => r.progress === r.amount || r.progress === r.amount
        );
        const gResponse = [
          gLast && {
            title: "Objetivo reciente",
            objetive: gLast,
            page: 1,
          },
          gFirst && {
            title: "Mas antiguo",
            objetive: gFirst,
            page: 2,
          },
          gComplete[0] && {
            title: "Objetivo completo",
            objetive: gComplete[0],
            page: 3,
          },
        ].filter(Boolean);
        return NextResponse.json({
          status: "success",
          message: "caroucel obtenido",
          objetives: gResponse,
        });
      } else {
        return NextResponse.json({
          status: "error",
          massage: "No hay objetivos",
        });
      }
    }
    
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrio un error",
    });
  }
};
