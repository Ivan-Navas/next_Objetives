import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  if (token === undefined) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export const config = {
  matcher: [
    "/",
  ],
};
