import { feed } from "@/app/api/feed";
import { NextResponse } from "next/server";

export const GET = () =>
  new NextResponse(feed.atom1(), {
    headers: new Headers({ "content-type": "application/xml" }),
  });
