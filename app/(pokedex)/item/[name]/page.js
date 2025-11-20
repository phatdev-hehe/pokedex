import { highlighter, Link, table, tabs } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";

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
      {Page.tabs(
        Page.tabs.names(item.names),
        [
          "attributes",
          "A list of attributes this item has.",
          tabs.paginate(item.attributes, (itemAttribute) =>
            titleCase(itemAttribute.name)
          ),
        ],
        Page.tabs.effectEntries(item.effect_entries),
        Page.tabs.flavorTextEntries(item.flavor_text_entries),
        Page.tabs.gameIndices(
          item.game_indices,
          "A list of game indices relevent to this item by generation."
        ),
        [
          "held_by_pokemon",
          "A list of Pokémon that might be found in the wild holding this item.",
          table(
            [undefined, "version_details"],
            item.held_by_pokemon.map((heldByPokemon) => [
              <Link href={`/pokemon/${heldByPokemon.pokemon.name}`}>
                {titleCase(heldByPokemon.pokemon.name)}
              </Link>,
              table(
                [undefined, "rarity"],
                heldByPokemon.version_details.map((rarityVersion) => [
                  titleCase(rarityVersion.version.name),
                  rarityVersion.rarity,
                ])
              ),
            ])
          ),
        ]
      )}
    </>
  );
});
