import { asyncNoop, mapValues, noop } from "es-toolkit";

import { noContent } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

export default mapValues(
  {
    ...Pokedex.api.routeNames.reduce((a, b) => {
      a[b] = {};

      return a;
    }, {}),
  },
  ({
    getAvatar = noop,
    getContent = asyncNoop,
    getFavicon = noop,
    prerenderLimit = Infinity,
  }) => ({
    getAvatar,
    getContent: async (...args) => (await getContent(...args)) ?? noContent(),
    getFavicon,
    prerenderLimit,
  })
);
