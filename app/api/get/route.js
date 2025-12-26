import { NextResponse } from "next/server";

import { Pokedex } from "@/lib/pokedex-promise-v2";

export const revalidate = 0;

export const GET = () =>
  new NextResponse(JSON.stringify(Pokedex.api.routeNames), {
    headers: new Headers({ "content-type": "application/json" }),
  });
