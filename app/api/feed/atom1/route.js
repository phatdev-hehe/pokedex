import { NextResponse } from "next/server";

import { feed } from "@/app/api/feed";

export const GET = () =>
  new NextResponse(feed.atom1(), {
    headers: new Headers({ "content-type": "application/xml" }),
  });
