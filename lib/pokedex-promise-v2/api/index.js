import { isPlainObject, uniqBy } from "es-toolkit";
import { get } from "es-toolkit/compat";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";

import routeMap from "./route-map";

const pokeAPI = new PokeAPI();

const flatRouteMap = Object.fromEntries(
  Object.values(routeMap).flatMap(Object.entries)
);

const api = {};

for (const [routeName, endpoints] of Object.entries({
  ...flatRouteMap,
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
                name: name ?? `${routeName}-${++index}`,
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

export default Object.assign((...path) => api[get(flatRouteMap, path)], {
  ...api,
  routeMap,
  routeNames: Object.keys(flatRouteMap),
});
