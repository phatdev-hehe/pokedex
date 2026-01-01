import { isPlainObject, uniqBy } from "es-toolkit";
import { get } from "es-toolkit/compat";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";

import routeGroups from "./route-groups";

const pokeAPI = new PokeAPI({
  versionPath: process.env.NEXT_PUBLIC_API_VERSION_PATH,
});

const routes = Object.fromEntries(
  Object.values(routeGroups).flatMap(Object.entries)
);

const api = {};

for (const [route, endpoints] of Object.entries({
  ...routes,
  resource: {
    rootEndpoint: "getResource",
  },
}))
  for (const endpoint of Object.values(endpoints))
    api[endpoint] = async (...args) => {
      try {
        const data = await pokeAPI[endpoint](...args);

        if (isPlainObject(data) && "results" in data)
          if (isPlainObject(data.results[0]) && "url" in data.results[0]) {
            data.results = uniqBy(
              data.results.map(({ name, ...rest }, index) => ({
                name: name ?? `${route}-${++index}`,
                ...rest,
              })),
              (item) => item.name
            );

            data.count = data.results.length;
          }

        return data;
      } catch (error) {
        console.error(error);
        notFound();
      }
    };

export default Object.assign((...path) => api[get(routes, path)], {
  ...api,
  routeGroups,
  routes: Object.keys(routes), // routeSegments
});
