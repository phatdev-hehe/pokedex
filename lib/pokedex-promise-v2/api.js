import "server-only";

import { uniqBy } from "@/utils";
import delay from "delay";
import isPlainObject from "is-plain-obj";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";

const pokeAPI = new PokeAPI();

const routeMap =
  // https://github.com/PokeAPI/pokedex-promise-v2/blob/405c7fd1bce0f1201ffda7b543f790e79e1b352e/src/utils/RootEndpoints.ts
  // https://github.com/PokeAPI/pokedex-promise-v2/blob/405c7fd1bce0f1201ffda7b543f790e79e1b352e/src/utils/Endpoints.ts
  {
    pokemon: {
      rootEndpoint: "getPokemonsList",
      endpoint: "getPokemonByName",
    },
    berry: {
      rootEndpoint: "getBerriesList",
    },
    ability: {
      rootEndpoint: "getAbilitiesList",
    },
    item: {
      rootEndpoint: "getItemsList",
    },
    move: {
      rootEndpoint: "getMovesList",
    },
    pokedex: {
      rootEndpoint: "getPokedexList",
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
    "evolution-trigger": {
      rootEndpoint: "getEvolutionTriggersList",
    },
    "pokemon-form": {
      rootEndpoint: "getPokemonFormsList",
    },
    gender: {
      rootEndpoint: "getGendersList",
    },
    generation: {
      rootEndpoint: "getGenerationsList",
    },
    "egg-group": {
      rootEndpoint: "getEggGroupsList",
    },
    "growth-rate": {
      rootEndpoint: "getGrowthRatesList",
    },
    "pokemon-shape": {
      rootEndpoint: "getPokemonShapesList",
    },
    language: {
      rootEndpoint: "getLanguagesList",
    },
    version: {
      rootEndpoint: "getVersionsList",
    },
    "version-group": {
      rootEndpoint: "getVersionGroupsList",
    },
    "berry-firmness": {
      rootEndpoint: "getBerriesFirmnessList",
    },
    "berry-flavor": {
      rootEndpoint: "getBerriesFlavorsList",
    },
    "contest-type": {
      rootEndpoint: "getContestTypesList",
    },
    "encounter-method": {
      rootEndpoint: "getEncounterMethodsList",
    },
  };

const api = [
  "getResource",
  ...Object.values(routeMap).flatMap(Object.values),
].reduce((a, b) => {
  a[b] = async (...args) => {
    if (process.env.NODE_ENV === "production") await delay(1000);

    try {
      const data = await pokeAPI[b](...args);

      if (
        isPlainObject(data) &&
        ["count", "next", "previous", "results"].every((key) => key in data)
      ) {
        const [result] = data.results;

        if (
          isPlainObject(result) &&
          ["name", "url"].every((key) => key in result)
        ) {
          data.results = uniqBy(data.results, (item) => item.name);
          data.count = data.results.length;
        }
      }

      return data;
    } catch (error) {
      console.error(error);
      notFound();
    }
  };

  return a;
}, {});

export default Object.assign((a, b) => api[routeMap[a][b]], {
  ...api,
  routeNames: Object.keys(routeMap),
});
