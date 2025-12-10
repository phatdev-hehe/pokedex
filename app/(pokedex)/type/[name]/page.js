import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

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

  const moveDamageClass = type.move_damage_class?.name;

  return (
    <>
      {table(undefined, [
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
          <Link href={`/move-damage-class/${moveDamageClass}`}>
            {titleCase(moveDamageClass)}
          </Link>,
        ],
      ])}
      {tabs(
        Page.tabs.sprites(type.sprites),
        Page.tabs.names(type.names),
        [
          "pokemon",
          table.pagination(type.pokemon, {
            thead: [undefined, "slot"],
            renderRows: ({ context }) => [
              <Link href={`/pokemon/${context.pokemon.name}`}>
                {titleCase(context.pokemon.name)}
              </Link>,
              context.slot,
            ],
          }),
        ],
        Page.tabs.moves(type.moves),
        [
          "damage_relations",
          table.pagination(Object.entries(type.damage_relations), {
            thead: [undefined, "Type"],
            renderRows: ({ context }) => [
              titleCase(context[0]),
              table.pagination(context[1], {
                renderRows: ({ context }) => [
                  <Link href={`/type/${context.name}`}>
                    {titleCase(context.name)}
                  </Link>,
                ],
              }),
            ],
          }),
        ],
        Page.tabs.gameIndices(type.game_indices)
      )}
    </>
  );
});
