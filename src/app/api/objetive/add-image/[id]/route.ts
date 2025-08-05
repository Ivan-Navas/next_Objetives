import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import { TokenInterface } from "@/interface/user";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const PUT = async (req: NextRequest, context: { params: Promise<{id: string}>}) => {
  try {
    const token = req.cookies.get("token")?.value;
    const objetiveId = (await context.params).id;
    if(!token){
      return NextResponse.json({
        status: "error",
        message: "No se pudo autenticar"
      })
    }
    const SECRET_VALUE = process.env.SECRET_VALUE;
    const verify = jwt.verify(token, SECRET_VALUE!);
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
        message: "El usuario no existe"
      })
    }
    const objetiveExist = await prisma.objetive.findUnique({
      where: {
        id: parseInt(objetiveId),
      },
      include: {
        user: true
      }
    });
    if(objetiveExist?.userId !== userExist.id){
      return NextResponse.json({
        status: "error",
        message: "El objetivo no coincide con el usuario"
      })
    }
    if (objetiveExist) {
      const data = await req.formData();
      const file: any = data.get("file");
      if (!file) {
        return NextResponse.json({
          status: "error",
          message: "No se ha encontrado la imagen",
        });
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const response: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `Oinc/objetive_images/${objetiveExist.user.name}`,
            },
            (err, result) => {
              if (err) {
                reject(err);
              }
              resolve(result);
            }
          )
          .end(buffer);
      });
      const imageObjetive = await prisma.objetive.update({
        where: {
          id: parseInt(objetiveId),
        },
        data: {
          image: response.secure_url,
        },
      });
      return NextResponse.json({
        status: "success",
        message: "Objetivo editado",
        objetive: imageObjetive,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "No se ha encontrado el objetivo",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "ocurrió un error al agregar la imagen",
    });
  }
};
