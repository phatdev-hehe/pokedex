import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";

const createTreeFolders = async (...values) =>
  await Promise.all(
    values.map(async ([fnName, path]) => {
      const data = await Pokedex.api[fnName]();

      return {
        name: `${data.count} ${path}`,
        type: "folder",
        children: data.results.map((item) => ({
          name: titleCase(item.name),
          url: `/${path}/${item.name}`,
        })),
      };
    })
  );

const sections = [
  [["getPokemonsList", "pokemon"]],
  [
    ["getAbilitiesList", "ability"],
    ["getMovesList", "move"],
    ["getPokedexList", "pokedex"],
    ["getPokemonSpeciesList", "pokemon-species"],
    ["getStatsList", "stat"],
    ["getTypesList", "type"],
  ],
];

export const navigation = {
  tree: {
    children: [
      // ...(await createTreeFolders(...sections[0])),
      // ...(await createTreeFolders(...sections[1])),
      {
        defaultOpen: true,
        name: "List of",
        type: "folder",
        children: sections.flat().map(([, value]) => ({
          name: titleCase(value),
          url: `/${value}`,
        })),
      },
    ],
  },
  sections,
};
