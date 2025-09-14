import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "@/lib/api/serverApi";
import { cookies } from "next/headers";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if ((accessToken || refreshToken) && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute && !accessToken && refreshToken) {
    try {
      const res = await checkServerSession();

      if (res.status === 200) {
        const response = NextResponse.next();

        const setCookieHeader = res.headers["set-cookie"];
        if (setCookieHeader) {
          const cookiesArray = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];

          for (const cookie of cookiesArray) {
            response.headers.append("set-cookie", cookie);
          }
        }

        return response;
      } else {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } catch (err) {
      console.error("Failed to refresh session:", err);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
