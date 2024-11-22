import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
  const req = await request;
  const test = process.env.TEST;
  console.log(test)
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(String(params.id)),
    },
  });

  try {
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
