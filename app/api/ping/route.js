import { NextResponse } from "next/server";

export const GET = () =>
  new NextResponse(JSON.stringify({ pong: Math.random() }));
