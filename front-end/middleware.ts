import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  console.log(req.nextUrl.pathname);

  if (!token) {
    if (req.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/ui/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    const decoded = jwt.decode(token) as { role?: string };

    if (req.nextUrl.pathname.startsWith("/admin") && decoded?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/ui/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/dashboard/:path*"],
};
