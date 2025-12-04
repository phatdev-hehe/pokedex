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

const api = [
  "getResource",
  ...Object.values(routeMap).flatMap((o) =>
    Object.values(o).flatMap(Object.values)
  ),
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

export default Object.assign(
  (a, b) =>
    api[
      Object.fromEntries(Object.values(routeMap).flatMap(Object.entries))[a][b]
    ],
  {
    ...api,
    routeNames: Object.values(routeMap).flatMap(Object.keys),
    routeMap,
  }
);
