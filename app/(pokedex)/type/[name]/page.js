import { highlighter, Link, table, tabs } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";

const Page = await Pokedex.createDetailPage("type", {
  getAvatar: ({ context }) => {
    /** @type Type */
    const type = context.data;

    return type.sprites["generation-ix"]["scarlet-violet"].name_icon;
  },
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Type */
  const type = context.data;

  return (
    <>
      {table(undefined, [
        ["Id", type.id],
        [
          highlighter(
            "The generation this type was introduced in.",
            "generation"
          ),
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
            [undefined, "slot"],
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
          tabs.paginate(type.moves, (move) => (
            <Link href={`/move/${move.name}`}>{titleCase(move.name)}</Link>
          )),
        ],
        [
          "damage_relations",
          "A detail of how effective this type is toward others and vice versa.",
          table(
            [undefined, "Type"],
            Object.entries(type.damage_relations).map(([key, value]) => [
              titleCase(key),
              tabs.paginate(value, (type) => (
                <Link href={`/type/${type.name}`}>{titleCase(type.name)}</Link>
              )),
            ])
          ),
        ],
        Page.tabs.gameIndices(type.game_indices)
      )}
    </>
  );
});
