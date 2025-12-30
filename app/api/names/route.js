import { NextResponse } from "next/server";
import fs from "node:fs";

import { Pokedex } from "@/lib/pokedex-promise-v2";

export const GET = async () => {
  const data = JSON.stringify(
    await Pokedex.api.routeNames.reduce(async (a, b) => {
      a = await a;

      a[b] = (await Pokedex.api(b, "rootEndpoint")()).results.map(
        (item) => item.name
      );

      return a;
    }, {})
  );

  fs.writeFileSync("app/api/names/data.json", data);

  return new NextResponse(data, {
    headers: new Headers({ "content-type": "application/json" }),
  });
};
