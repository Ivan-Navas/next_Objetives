"use server";
import crypto from "crypto";
import { sendEmail } from "@/libs/brevo";
import { CreateCodeRequest } from "@/interface/user";
interface Params {
  email: string;
  name: string;
}

export async function sendVerificationEmail({ email, name }: Params) {
  const userEmail = email;
  const userName = name;
  const code = crypto.randomInt(100000, 999999);
  if (!userEmail) {
    return console.log("Ingrese su email");
  }
  try {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/email-verify/save`, {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify({
        email: userEmail,
        code: code,
      }),
    });
    const data: CreateCodeRequest = await request.json();
  } catch (error) {
    console.log(error);
  }
  await sendEmail({
    code: code as number,
    to: [
      {
        email: userEmail as string,
        name: userName as string,
      },
    ],
  });
}
