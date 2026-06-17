import { NextRequest, NextResponse } from "next/server";
import { handleAuthProxy } from "./features/auth/utils/auth-proxy";

export async function proxy(req: NextRequest) {
  return await handleAuthProxy(req);
}

export const config = {
  matcher: ["/sign-in", "/dashboard", "/dashboard/:path*"]
}
