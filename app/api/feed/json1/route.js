import { feed } from "@/lib/pokedex-promise-v2/feed";
import { NextResponse } from "next/server";

export const GET = () =>
  new NextResponse(feed.json1(), {
    headers: new Headers({ "content-type": "application/json" }),
  });
