import { prisma } from "@/libs/prisma";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { TokenInterface } from "@/interface/user";

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const token = cookies().get("token")?.value;
    const objetiveId = (await context.params)?.id;
    const tokenGoogle = await getToken({
      req,
      secret: process.env.AUTH_SECRET!,
    });
    if (!token && !tokenGoogle) {
      return NextResponse.json({
        status: "error",
        message: "No se pudo autenticar",
      });
    }
    if (token) {
      const verify = await jwt.verify(token, process.env.SECRET_VALUE!);
      const userId = (verify as TokenInterface).id;
      const objetiveExist = await prisma.objetive.findUnique({
        where: {
          id: Number(objetiveId),
          userId: userId,
        },
      });
      if (!objetiveExist) {
        return NextResponse.json({
          status: "error",
          message: "El objetivo no existe",
        });
      }
      if (objetiveExist && objetiveExist.userId === userId) {
        const objetiveDelete = await prisma.objetive.delete({
          where: {
            id: objetiveExist.id,
          },
        });
        return NextResponse.json({
          status: "success",
          message: "Objetivo eliminado con exito",
          data: objetiveDelete,
        });
      }
    }
    if (tokenGoogle) {
      const userGExist = await prisma.user.findFirst({
        where: {
          email: tokenGoogle.email!,
        },
      });
      const objetiveGExist = await prisma.objetive.findUnique({
        where: {
          id: Number(objetiveId),
          userId: userGExist?.id,
        },
      });
      if (!objetiveGExist) {
        return NextResponse.json({
          status: "error",
          message: "El objetivo no existe",
        });
      }
      if (objetiveGExist && objetiveGExist.userId === userGExist?.id) {
        const objetiveGDelete = await prisma.objetive.delete({
          where: {
            id: objetiveGExist.id,
          },
        });
        return NextResponse.json({
          status: "success",
          message: "Objetivo eliminado con exito",
          data: objetiveGDelete,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      status: "success",
      message: "Ocurrio un error al eliminar el objetivo",
      error,
    });
  }
};
