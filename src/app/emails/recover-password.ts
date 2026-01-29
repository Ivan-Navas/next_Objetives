"use server"
import crypto from "crypto";
import { recoverPasswordEmail } from "@/libs/brevo";

export async function sendPasswordRecover(email: string) {
  const userEmail = email;
  const code = crypto.randomInt(10000, 999999);
  if(!userEmail) return console.log("Faltan datos por llenar");
  try {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/recover-password/save`, {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({
        email: userEmail,
        code: code,
      })
    })
    const data = await request.json();
  } catch (error) {
    console.log(error);
  }
  const send = await recoverPasswordEmail({
    code: code as number,
    to: [
      {
        email: "ivanrng.work@gmail.com",
        name: "ivan",
      }
    ]
  })
  console.log(send);
}
