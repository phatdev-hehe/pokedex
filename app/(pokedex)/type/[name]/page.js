import { table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import Link from "next/link";

const Page = await Pokedex.createPage({
  getList: "getTypesList",
  getData: "getTypeByName",
  titleSuffix: "type",
  getAvatar: ({ data }) => {
    /** @type Type */
    const type = data;

    return type.sprites["generation-ix"]["scarlet-violet"].name_icon;
  },
});

export const generateMetadata = Page.generateMetadata;
export const generateStaticParams = Page.generateStaticParams;

export default Page.withData(({ data }) => {
  /** @type Type */
  const type = data;

  return (
    <Page.Root>
      {table(undefined, [
        ["Id", type.id],
        [
          "The generation this type was introduced in.",
          titleCase(type.generation.name),
        ],
        [
          "The class of damage inflicted by this type.",
          titleCase(type.move_damage_class?.name), // ??
        ],
      ])}
      {Page.tabs(
        Page.tabs.sprites(type.sprites),
        Page.tabs.names(type.names),
        [
          "pokemon",
          "A list of details of Pokémon that have this type.",
          table(
            [undefined, "Slot"],
            type.pokemon.map((typePokemon) => [
              <Link href={`/pokemon/${typePokemon.pokemon.name}`}>
                {titleCase(typePokemon.pokemon.name)}
              </Link>,
              typePokemon.slot,
            ])
          ),
        ],
        [
          "moves",
          "A list of moves that have this type.",
          table(
            undefined,
            type.moves.map((move) => [titleCase(move.name)])
          ),
        ],
        [
          "damage_relations",
          "A detail of how effective this type is toward others and vice versa.",
          table(
            undefined,
            Object.entries(type.damage_relations).map(([key, value]) => [
              titleCase(key),
              table(
                ["Type"],
                value.map((type) => [
                  <Link href={`/type/${type.name}`}>
                    {titleCase(type.name)}
                  </Link>,
                ])
              ),
            ])
          ),
        ],
        [
          "game_indices",
          undefined,
          table(
            undefined,
            type.game_indices.map((generationGameIndex) => [
              generationGameIndex.game_index,
              titleCase(generationGameIndex.generation.name),
            ])
          ),
        ]
      )}
    </Page.Root>
  );
});
