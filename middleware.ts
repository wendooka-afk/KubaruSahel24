import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const auth = req.headers.get("authorization")

    if (auth !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
  }
}
