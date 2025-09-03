import { prisma } from "@/libs/prisma";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
//import { Resend } from "resend";

export const POST = async (req: NextRequest) => {
  try {
    //const resend = new Resend(process.env.RESEND_API_KEY);
    const { email } = await req.json();
    const userExist = await prisma.user.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
      }
    })
    if(userExist){
      return NextResponse.json({
        status: "error",
        message: "El usuario ya existe",
      })
    }
    const code = crypto.randomInt(100000,999999);
    const codeSaved = await prisma.userVerify.create({
      data: {
        email: email,
        code: code,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      }
    })
    if(!codeSaved){
      return NextResponse.json({
        status: "error",
        message: "Error al guardar el codigo de verificación"
      })
    }
    //const { error } = await resend.emails.send({
      //from: "onboarding@resend.dev",
      //to: email,
      //subject: "Tu codigo de verificación",
      //html: `<p>Tu código de verificación es: <b>${code}</b></p>
       // <p>Expira en 15 minutos.</p>`
    //})
    //console.log(error);
    //if(error){
      //return NextResponse.json({
        //status: "error",
        //message: "Error al enviar el correo de verificacion"
      //})
    //}
    return NextResponse.json({
      status: "success",
      message: "Codigo guardado"
    })
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrio un error"
    })
  }
}
