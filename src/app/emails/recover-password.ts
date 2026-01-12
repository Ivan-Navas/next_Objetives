"use server"
import crypto from "crypto";
import { recoverPasswordEmail } from "@/libs/brevo";

interface Params {
  email: string,
  name: string,
}

export async function sendPasswordRecover({ email, name }:Params) {
  const userEmail = email;
  const userName = name;
  const code = crypto.randomInt(10000, 999999);
  if(!userEmail && !userName) return console.log("Faltan datos por llenar");
  try {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/recover-password/save`, {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
      })
    })
  } catch (error) {
    console.log(error);
  }
  await recoverPasswordEmail({
    code: code as number,
    to: [
      {
        email: userEmail as string,
        name: userName as string,
      }
    ]
  })
}