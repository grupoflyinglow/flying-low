import { NextResponse, type NextRequest } from "next/server";
import { localeFromPathname } from "./app/route-localization";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-flying-low-locale", localeFromPathname(request.nextUrl.pathname));
  requestHeaders.set("x-flying-low-pathname", request.nextUrl.pathname);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.svg|og.png|images/).*)"],
};
