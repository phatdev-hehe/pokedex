import "server-only";

import { uniqBy } from "@/(shared)/utils";
import delay from "delay";
import isPlainObject from "is-plain-obj";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";
import { cache } from "react";

const pokeAPI = new PokeAPI();

const groups = {
  pokemon: {
    getList: "getPokemonsList",
    getByName: "getPokemonByName",
  },
  berry: {
    getList: "getBerriesList",
    getByName: "getBerryByName",
  },
  ability: {
    getList: "getAbilitiesList",
    getByName: "getAbilityByName",
  },
  item: {
    getList: "getItemsList",
    getByName: "getItemByName",
  },
  move: {
    getList: "getMovesList",
    getByName: "getMoveByName",
  },
  pokedex: {
    getList: "getPokedexList",
    getByName: "getPokedexByName",
  },
  "pokemon-species": {
    getList: "getPokemonSpeciesList",
    getByName: "getPokemonSpeciesByName",
  },
  stat: {
    getList: "getStatsList",
    getByName: "getStatByName",
  },
  type: {
    getList: "getTypesList",
    getByName: "getTypeByName",
  },
  "evolution-trigger": {
    getList: "getEvolutionTriggersList",
    getByName: "getEvolutionTriggerByName",
  },
  "pokemon-form": {
    getList: "getPokemonFormsList",
    getByName: "getPokemonFormByName",
  },
  gender: {
    getList: "getGendersList",
    getByName: "getGenderByName",
  },
  generation: {
    getList: "getGenerationsList",
    getByName: "getGenerationByName",
  },
  "egg-group": {
    getList: "getEggGroupsList",
    getByName: "getEggGroupByName",
  },
};

const api = [
  "getResource",
  ...Object.values(groups).flatMap(Object.values),
].reduce((a, b) => {
  a[b] = cache(async (...args) => {
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
  });

  return a;
}, {});

export default Object.assign((...values) => api[groups[values[0]][values[1]]], {
  ...api,
  groupNames: Object.keys(groups),
});
