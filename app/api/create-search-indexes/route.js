import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";
import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

// https://github.com/fuma-nama/fumadocs/blob/304204a38455f103b430bd8ea6fbdcc64ac4ad2f/packages/core/src/search/server.ts#L101
export const GET = async () => {
  const data = JSON.stringify(
    (
      await Promise.all(
        Pokedex.api.groupNames.map(async (groupName) =>
          (
            await Pokedex.api(groupName, "getList")()
          ).results.map((item) => ({
            breadcrumbs: [titleCase(groupName)],
            title: titleCase(item.name),
            url: `/${groupName}/${item.name}`,
          }))
        )
      )
    ).flat()
  );

  fs.writeFileSync(
    path.join(process.cwd(), "app", "api", "search", "indexes.json"),
    data
  );

  return new NextResponse(data, {
    headers: new Headers({ "content-type": "application/json" }),
  });
};
