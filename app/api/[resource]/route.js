import { NextResponse } from "next/server";

import { GET as getRouteNames } from "@/app/api/route";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export const revalidate = 0;

export const GET = async (request, { params }) => {
  params = await params;

  if (Pokedex.api.routeNames.includes(params.resource)) {
    const name =
      request.nextUrl.searchParams.get("encodedName") ??
      request.nextUrl.searchParams.get("name");

    const items = await Pokedex.api(params.resource, "rootEndpoint")();
    const item = items.results.find((item) => item.name === name) ?? {};

    return NextResponse.json(
      "url" in item ? await Pokedex.api.getResource(item.url) : items
    );
  }

  return getRouteNames();
};
