import "server-only";

import { kebabCase } from "change-case";
import { delay, isPlainObject, uniqBy } from "es-toolkit";
import { get } from "es-toolkit/compat";
import PokeAPI from "pokedex-promise-v2";

const pokeAPI = new PokeAPI();

const routeMap =
  // https://github.com/PokeAPI/pokedex-promise-v2/blob/405c7fd1bce0f1201ffda7b543f790e79e1b352e/src/utils/RootEndpoints.ts
  // https://github.com/PokeAPI/pokedex-promise-v2/blob/405c7fd1bce0f1201ffda7b543f790e79e1b352e/src/utils/Endpoints.ts
  {
    pokemon: {
      pokemon: {
        rootEndpoint: "getPokemonsList",
        endpoint: "getPokemonByName",
      },
      ability: {
        rootEndpoint: "getAbilitiesList",
      },
      "egg-group": {
        rootEndpoint: "getEggGroupsList",
      },
      gender: {
        rootEndpoint: "getGendersList",
      },
      "growth-rate": {
        rootEndpoint: "getGrowthRatesList",
      },
      nature: {
        rootEndpoint: "getNaturesList",
      },
      "pokemon-color": {
        rootEndpoint: "getPokemonColorsList",
      },
      "pokemon-form": {
        rootEndpoint: "getPokemonFormsList",
      },
      "pokemon-habitat": {
        rootEndpoint: "getPokemonHabitatsList",
      },
      "pokemon-shape": {
        rootEndpoint: "getPokemonShapesList",
      },
      "pokemon-species": {
        rootEndpoint: "getPokemonSpeciesList",
      },
      stat: {
        rootEndpoint: "getStatsList",
      },
      type: {
        rootEndpoint: "getTypesList",
      },
    },
    berries: {
      berry: {
        rootEndpoint: "getBerriesList",
      },
      "berry-firmness": {
        rootEndpoint: "getBerriesFirmnessList",
      },
      "berry-flavor": {
        rootEndpoint: "getBerriesFlavorsList",
      },
    },
    evolution: {
      "evolution-trigger": {
        rootEndpoint: "getEvolutionTriggersList",
      },
    },
    games: {
      generation: {
        rootEndpoint: "getGenerationsList",
      },
      pokedex: {
        rootEndpoint: "getPokedexList",
      },
      version: {
        rootEndpoint: "getVersionsList",
      },
      "version-group": {
        rootEndpoint: "getVersionGroupsList",
      },
    },
    items: {
      item: {
        rootEndpoint: "getItemsList",
      },
      "item-attribute": {
        rootEndpoint: "getItemAttributesList",
      },
      "item-category": {
        rootEndpoint: "getItemCategoriesList",
      },
      "item-fling-effect": {
        rootEndpoint: "getItemFlingEffectsList",
      },
      "item-pocket": {
        rootEndpoint: "getItemPocketsList",
      },
    },
    locations: {
      location: {
        rootEndpoint: "getLocationsList",
      },
      "location-area": {
        rootEndpoint: "getLocationAreasList",
      },
      "pal-park-area": {
        rootEndpoint: "getPalParkAreasList",
      },
      region: {
        rootEndpoint: "getRegionsList",
      },
    },
    machines: {
      machine: {
        rootEndpoint: "getMachinesList",
      },
    },
    moves: {
      move: {
        rootEndpoint: "getMovesList",
      },
    },
    contests: {
      "contest-type": {
        rootEndpoint: "getContestTypesList",
      },
    },
    encounters: {
      "encounter-method": {
        rootEndpoint: "getEncounterMethodsList",
      },
      "encounter-condition": {
        rootEndpoint: "getEncounterConditionsList",
      },
      "encounter-condition-value": {
        rootEndpoint: "getEncounterConditionValuesList",
      },
    },
    utility: {
      language: {
        rootEndpoint: "getLanguagesList",
      },
    },
  };

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
      if (process.env.NODE_ENV === "production") await delay(1000);

      try {
        const data = await pokeAPI[endpoint](...args);

        if (isPlainObject(data) && "results" in data)
          if (isPlainObject(data.results[0]) && "url" in data.results[0]) {
            data.results = uniqBy(
              data.results.map(({ name, ...rest }, index) => ({
                name: name ?? kebabCase(`${routeName} ${++index}`),
                ...rest,
              })),
              (item) => item.name
            );

            data.count = data.results.length;
          }

        return data;
      } catch (error) {
        console.error(error);
      }
    };

export default Object.assign((...path) => api[get(flatRouteMap, path)], {
  ...api,
  routeNames: Object.keys(flatRouteMap),
  routeMap,
});
