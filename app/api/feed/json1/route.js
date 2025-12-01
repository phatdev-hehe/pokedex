import { feed } from "@/app/api/feed";
import { NextResponse } from "next/server";

export const GET = () =>
  new NextResponse(feed.json1(), {
    headers: new Headers({ "content-type": "application/json" }),
  });
