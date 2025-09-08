import { prisma } from "@/libs/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { TokenInterface } from "@/interface/user";

export const PUT = async (req: NextRequest, context: { params: Promise<{id: string}> }) => {
  try {
    const objetiveEdited = await req.json();
    const token = cookies().get("token")?.value;
    const tokenGoogle = await getToken({req, secret: process.env.NEXTAUTH_SECRET});
    const id = (await context.params)?.id;
    if(!token && !tokenGoogle){
      return NextResponse.json({
        status: "error",
        message: "No se pudo autenticar",
      })
    }
    const objetiveToEdit = await prisma.objetive.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if(!objetiveToEdit){
      return NextResponse.json({
        status: "error",
        message: "El objetivo no existe",
      })
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
        }
      })
      if(!userExist){
        return NextResponse.json({
          status: "error",
          message: "El usuario no existe",
        })
      }
      if(objetiveToEdit.userId !== userExist.id){
        return NextResponse.json({
          status: "error",
          message: "El objetivo no le pertenece a este usuario",
        })
      }
      const wasEdited = await prisma.objetive.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title: objetiveEdited.title,
          amount: parseInt(objetiveEdited.amount),
          progress: parseInt(objetiveEdited.progress),
        },
      });
      return NextResponse.json({
        status: "success",
        message: "Editado exitosamente",
        objetive: wasEdited,
      });
    } 
    if(tokenGoogle){
      const userGExist = await prisma.user.findFirst({
        where: {
          email: tokenGoogle.email!,
        },
        select: {
          id: true,
        }
      })
      if(!userGExist){
        return NextResponse.json({
          status: "error",
          message: "El usuario no existe",
        })
      }
      if(objetiveToEdit.userId !== userGExist.id){
        return NextResponse.json({
          status: "error",
          message: "El objetivo no le pertenece a este usuario",
        })
      }
      const wasEdited = await prisma.objetive.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title: objetiveEdited.title,
          amount: parseInt(objetiveEdited.amount),
          progress: parseInt(objetiveEdited.progress),
        },
      });
      return NextResponse.json({
        status: "success",
        message: "Editado exitosamente",
        objetive: wasEdited,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrió un error"
    }) 
  }
};
