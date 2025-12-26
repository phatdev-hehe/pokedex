import { NextResponse } from "next/server";

import { feed } from "@/lib/feed";

export const GET = () =>
  new NextResponse(feed.atom1(), {
    headers: new Headers({ "content-type": "application/xml" }),
  });
