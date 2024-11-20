import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const PUT = async (req: Request, { params }: any) => {
  const objetiveId = params.id;
  try {
    const exist = await prisma.objetive.findUnique({
      where: {
        id: parseInt(objetiveId),
      },
    });
    if (exist) {
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
              folder: "Oinc/objetive_images",
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
