import { highlighter, Link, table } from "@/(shared)/components";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils";

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
          <Link href={`/generation/${type.generation.name}`}>
            {titleCase(type.generation.name)}
          </Link>,
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
          table.pagination(type.pokemon, {
            thead: [undefined, "slot"],
            renderFirstItem: ({ context }) => (
              <Link href={`/pokemon/${context.pokemon.name}`}>
                {titleCase(context.pokemon.name)}
              </Link>
            ),
            renderItems: ({ context }) => [context.slot],
          }),
        ],
        Page.tabs.moves(type.moves, {
          description: "A list of moves that have this type.",
        }),
        [
          "damage_relations",
          "A detail of how effective this type is toward others and vice versa.",
          table.pagination(Object.entries(type.damage_relations), {
            thead: [undefined, "Type"],
            renderFirstItem: ({ context }) => titleCase(context[0]),
            renderItems: ({ context }) => [
              table.pagination(context[1], {
                renderFirstItem: ({ context }) => (
                  <Link href={`/type/${context.name}`}>
                    {titleCase(context.name)}
                  </Link>
                ),
              }),
            ],
          }),
        ],
        Page.tabs.gameIndices(type.game_indices)
      )}
    </>
  );
});
