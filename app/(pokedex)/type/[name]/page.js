import { highlighter, table, tabs, ul } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("type", {
  getAvatar: ({ context }) => {
    /** @type Type */
    const type = context.data;

    return type.sprites["generation-ix"]["scarlet-violet"].name_icon;
  },
});

export const { generateStaticParams } = Page;

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
      {tabs({
        damage_relations: table.pagination(
          Object.entries(type.damage_relations),
          {
            renderRows: ({ context }) => [
              titleCase(context[0]),
              ul(
                ...context[1].map((type) => (
                  <Link href={`/type/${type.name}`}>
                    {titleCase(type.name)}
                  </Link>
                ))
              ),
            ],
            thead: [undefined, "type"],
          }
        ),
        pokemon: table.pagination(type.pokemon, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon/${context.pokemon.name}`}>
              {titleCase(context.pokemon.name)}
            </Link>,
            context.slot,
          ],
          thead: [undefined, "slot"],
        }),
        ...Page.tabs.gameIndices(type.game_indices),
        ...Page.tabs.moves(type.moves),
        ...Page.tabs.names(type.names),
        ...Page.tabs.sprites(type.sprites),
      })}
    </>
  );
});
