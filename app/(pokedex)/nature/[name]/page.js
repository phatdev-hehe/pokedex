import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("nature");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Nature */
  const nature = context.data;

  const decreasedStat = nature.decreased_stat?.name;
  const hatesFlavor = nature.hates_flavor?.name;
  const increasedStat = nature.increased_stat?.name;
  const likesFlavor = nature.likes_flavor?.name;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The stat decreased by 10% in Pokémon with this nature.",
            "stat decreased"
          ),
          <Link href={`/stat/${decreasedStat}`}>
            {titleCase(decreasedStat)}
          </Link>,
        ],
        [
          highlighter(
            "The flavor hated by Pokémon with this nature.",
            "flavor hated"
          ),
          <Link href={`/berry-flavor/${hatesFlavor}`}>
            {titleCase(hatesFlavor)}
          </Link>,
        ],
        [
          highlighter(
            "The stat increased by 10% in Pokémon with this nature.",
            "stat increased"
          ),
          <Link href={`/stat/${increasedStat}`}>
            {titleCase(increasedStat)}
          </Link>,
        ],
        [
          highlighter(
            "The flavor liked by Pokémon with this nature.",
            "flavor liked"
          ),
          <Link href={`/berry-flavor/${likesFlavor}`}>
            {titleCase(likesFlavor)}
          </Link>,
        ],
      ])}
      {tabs(
        Page.tabs.names(nature.names),
        [
          "move_battle_style_preferences",
          table.pagination(nature.move_battle_style_preferences, {
            renderRows: ({ context }) => [
              <Link
                href={`/move-battle-style/${context.move_battle_style.name}`}
              >
                {titleCase(context.move_battle_style.name)}
              </Link>,
              context.high_hp_preference,
              context.low_hp_preference,
            ],
            thead: [undefined, "high_hp_preference", "low_hp_preference"],
          }),
        ],
        [
          "pokeathlon_stat_changes",
          table.pagination(nature.pokeathlon_stat_changes, {
            renderRows: ({ context }) => [
              <Link href={`/pokeathlon-stat/${context.pokeathlon_stat.name}`}>
                {titleCase(context.pokeathlon_stat.name)}
              </Link>,
              context.max_change,
            ],
            thead: [undefined, "max_change"],
          }),
        ]
      )}
    </>
  );
});
