import { table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import Link from "next/link";

const page = await Pokedex.createPage({
  getList: "getTypesList",
  getData: "getTypeByName",
  titleSuffix: "Type",
  getAvatar: ({ data }) => {
    /** @type Type */
    const type = data;

    return type.sprites["generation-ix"]["scarlet-violet"].name_icon;
  },
});

export const generateMetadata = page.generateMetadata;
export const generateStaticParams = page.generateStaticParams;

export default page.withData(({ data }) => {
  /** @type Type */
  const type = data;

  return (
    <>
      {table(undefined, [
        ["Id", type.id],
        [
          "The generation this type was introduced in.",
          Pokedex.formatName(type.generation.name),
        ],
        [
          "The class of damage inflicted by this type.",
          Pokedex.formatName(type.move_damage_class?.name), // ??
        ],
      ])}
      {page.sections(
        [
          "Sprites",
          undefined,
          table.fromObject(
            undefined,
            type.sprites,
            Pokedex.formatName,
            (src) => <Pokedex.Image src={src} />
          ),
        ],
        page.sections.names(type.names),
        [
          "Pokémon",
          "A list of details of Pokémon that have this type.",
          table(
            [undefined, "Slot"],
            type.pokemon.map((typePokemon) => [
              <Link href={`/pokemon/${typePokemon.pokemon.name}`}>
                {Pokedex.formatName(typePokemon.pokemon.name)}
              </Link>,
              typePokemon.slot,
            ])
          ),
        ],
        [
          "Moves",
          "A list of moves that have this type.",
          table(
            undefined,
            type.moves.map((move) => [Pokedex.formatName(move.name)])
          ),
        ],
        [
          "Damage Relations",
          "A detail of how effective this type is toward others and vice versa.",
          table(
            undefined,
            Object.entries(type.damage_relations).map(([key, value]) => [
              Pokedex.formatName(key),
              table(
                ["Type"],
                value.map((type) => [
                  <Link href={`/type/${type.name}`}>
                    {Pokedex.formatName(type.name)}
                  </Link>,
                ])
              ),
            ])
          ),
        ],
        [
          "Game Indices",
          undefined,
          table(
            undefined,
            type.game_indices.map((generationGameIndex) => [
              generationGameIndex.game_index,
              Pokedex.formatName(generationGameIndex.generation.name),
            ])
          ),
        ]
      )}
    </>
  );
});
