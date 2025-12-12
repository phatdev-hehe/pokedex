import { createSearchAPI } from "fumadocs-core/search/server";

import data from "@/app/api/local-data/data.json";
import { titleCase } from "@/utils/title-case";

// https://github.com/fuma-nama/fumadocs/blob/304204a38455f103b430bd8ea6fbdcc64ac4ad2f/packages/core/src/search/server.ts#L101
export const { GET } = createSearchAPI("simple", {
  indexes: Object.entries(data).flatMap(([key, value]) => {
    const breadcrumbs = [titleCase(key)];

    return value.map((value) => ({
      breadcrumbs,
      title: titleCase(value),
      url: `/${key}/${value}`,
    }));
  }),
});
