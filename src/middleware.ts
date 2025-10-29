import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
//import { jwtVerify } from "jose";

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  const tokenAuth = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (token === undefined && !tokenAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: [
    "/",
  ],
};
