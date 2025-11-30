import { highlighter, Link, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("item", {
  getAvatar: ({ context }) => {
    /** @type Item */
    const item = context.data;

    return item.sprites.default;
  },
  get getFavicon() {
    return this.getAvatar;
  },
  limitStaticParams: 900,
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Item */
  const item = context.data;

  item.machines;

  return (
    <>
      {table(undefined, [
        ["Id", item.id],
        [
          highlighter(
            "The category of items this item falls into.",
            "category"
          ),
          titleCase(item.category.name),
        ],
        [highlighter("The price of this item in stores.", "price"), item.cost],
        [
          "The effect of the move Fling when used with this item.",
          titleCase(item.fling_effect?.name), // ??
        ],
        [
          "The power of the move Fling when used with this item.",
          item.fling_power,
        ],
      ])}
      {tabs(
        Page.tabs.names(item.names),
        [
          "attributes",
          table.pagination(item.attributes, {
            renderFirstItem: ({ context }) => titleCase(context.name),
          }),
        ],
        Page.tabs.effectEntries(item.effect_entries),
        Page.tabs.flavorTextEntries(item.flavor_text_entries),
        Page.tabs.gameIndices(item.game_indices),
        [
          "held_by_pokemon",
          table.pagination(item.held_by_pokemon, {
            thead: [undefined, "version_details"],
            renderFirstItem: ({ context }) => (
              <Link href={`/pokemon/${context.pokemon.name}`}>
                {titleCase(context.pokemon.name)}
              </Link>
            ),
            renderItems: ({ context }) => [
              table.pagination(context.version_details, {
                thead: [undefined, "rarity"],
                renderFirstItem: ({ context }) => (
                  <Link href={`/version/${context.version.name}`}>
                    {titleCase(context.version.name)}
                  </Link>
                ),
                renderItems: ({ context }) => [context.rarity],
              }),
            ],
          }),
        ]
      )}
    </>
  );
});
