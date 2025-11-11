import { navigation } from "@/shared/navigation";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import { createSearchAPI } from "fumadocs-core/search/server";

// https://github.com/fuma-nama/fumadocs/blob/304204a38455f103b430bd8ea6fbdcc64ac4ad2f/packages/core/src/search/server.ts#L101
export const { GET } = createSearchAPI("simple", {
  indexes: (
    await Promise.all(
      navigation.sections.flatMap(async ([[fnName, path]]) => {
        const data = await Pokedex.api[fnName]();

        return data.results.map((item) => ({
          breadcrumbs: [titleCase(path)],
          title: titleCase(item.name),
          url: `/${path}/${item.name}`,
        }));
      })
    )
  ).flat(),
});
