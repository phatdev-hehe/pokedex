import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils";
import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

// https://github.com/fuma-nama/fumadocs/blob/304204a38455f103b430bd8ea6fbdcc64ac4ad2f/packages/core/src/search/server.ts#L101
export const GET = async () => {
  const data = JSON.stringify(
    (
      await Promise.all(
        Pokedex.api.types.map(async (apiType) => {
          const data = await Pokedex.api(apiType, "getList")();

          return data.results.map((item) => ({
            breadcrumbs: [titleCase(apiType)],
            title: titleCase(item.name),
            url: `/${apiType}/${item.name}`,
          }));
        })
      )
    ).flat()
  );

  fs.writeFileSync(
    path.join(process.cwd(), "app", "api", "search", "indexes.json"),
    data
  );

  return new NextResponse(data);
};
