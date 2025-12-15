import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("item", {
  getAvatar: ({ context }) => {
    /** @type Item */
    const item = context.data;

    return item.sprites.default;
  },
  get getFavicon() {
    return this.getAvatar;
  },
  staticLimit: process.env.DEFAULT_STATIC_LIMIT,
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Item */
  const item = context.data;

  const flingEffect = item.fling_effect?.name;

  item.machines;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "The category of items this item falls into.",
            "category"
          ),
          <Link href={`/item-category/${item.category.name}`}>
            {titleCase(item.category.name)}
          </Link>,
        ],
        [highlighter("The price of this item in stores.", "price"), item.cost],
        [
          "The effect of the move Fling when used with this item.",
          <Link href={`/item-fling-effect/${flingEffect}`}>
            {titleCase(flingEffect)}
          </Link>,
        ],
        [
          "The power of the move Fling when used with this item.",
          item.fling_power,
        ],
      ])}
      {tabs({
        attributes: table.pagination(item.attributes, {
          renderRows: ({ context }) => [
            <Link href={`/item-attribute/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        }),
        held_by_pokemon: table.pagination(item.held_by_pokemon, {
          renderRows: ({ context }) => [
            <Link href={`/pokemon/${context.pokemon.name}`}>
              {titleCase(context.pokemon.name)}
            </Link>,
            table.pagination(context.version_details, {
              renderRows: ({ context }) => [
                <Link href={`/version/${context.version.name}`}>
                  {titleCase(context.version.name)}
                </Link>,
                context.rarity,
              ],
              thead: [undefined, "rarity"],
            }),
          ],
          thead: [undefined, "version_details"],
        }),
        ...Page.tabs.effectEntries(item.effect_entries),
        ...Page.tabs.flavorTextEntries(item.flavor_text_entries),
        ...Page.tabs.gameIndices(item.game_indices),
        ...Page.tabs.names(item.names),
      })}
    </>
  );
});
