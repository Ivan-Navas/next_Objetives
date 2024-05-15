import { Objetive } from "@/interface/objetive";
import { prisma } from "@/libs/prisma";
import { cookies } from "next/headers";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
const { verify } = require("jsonwebtoken");

export const PUT = async (request: any, { params }: any) => {
  const objetiveEdited = await request.json();
  const token = cookies().get("token")?.value;
  const { id } = params;
  const objetiveToEdit = await prisma.objetive.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (objetiveToEdit) {
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
  } else {
    return NextResponse.json({
      status: "success",
      message: "El objetivo no existe",
    });
  }
};
