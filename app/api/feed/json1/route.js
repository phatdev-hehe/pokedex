import { NextResponse } from "next/server";

import { feed } from "@/app/api/feed";

export const GET = () =>
  new NextResponse(feed.json1(), {
    headers: new Headers({ "content-type": "application/json" }),
  });
