import { NextResponse } from "next/server";

import { GET as getRouteNames } from "@/app/api/get/route";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export const revalidate = 0;

export const GET = async (request, { params }) => {
  params = await params;

  if (Pokedex.api.routeNames.includes(params["route-name"])) {
    const name =
      request.nextUrl.searchParams.get("encodedName") ??
      request.nextUrl.searchParams.get("name");

    const items = await Pokedex.api(params["route-name"], "rootEndpoint")();
    const item = items.results.find((item) => item.name === name) ?? {};

    return new NextResponse(
      JSON.stringify(
        "url" in item ? await Pokedex.api.getResource(item.url) : items
      ),
      {
        headers: new Headers({ "content-type": "application/json" }),
      }
    );
  }

  return getRouteNames();
};
