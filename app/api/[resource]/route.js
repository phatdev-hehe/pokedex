import { NextResponse } from "next/server";

import { GET as fallback } from "@/app/api/route";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  params = await params;

  if (Pokedex.api.routes.includes(params.resource)) {
    const items = await Pokedex.api(params.resource, "rootEndpoint")();

    const item =
      items.results.find(
        (item) => item.name === request.nextUrl.searchParams.get("name")
      ) ?? {};

    return NextResponse.json(
      "url" in item ? await Pokedex.api.getResource(item.url) : items
    );
  }

  return fallback();
};
