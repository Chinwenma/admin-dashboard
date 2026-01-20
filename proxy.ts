import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret });
  if(!req.url.includes('/admin')) {
    return NextResponse.next();
  }
  // Must be logged in
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Must have ADMIN role
  // if (token.role !== "ADMIN") {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
