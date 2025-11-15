import { table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";

const Page = await Pokedex.createDetailPage("item", (context) => {
  /** @type Item */
  const item = context.data;

  return item.sprites.default;
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page.withContext((context) => {
  /** @type Item */
  const item = context.data;

  return (
    <>
      {table(undefined, [
        [
          "The category of items this item falls into.",
          titleCase(item.category.name),
        ],
        ["The price of this item in stores.", item.cost],
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
        [
          "attributes",
          "A list of attributes this item has.",
          table(
            undefined,
            item.attributes.map((itemAttribute) => [
              titleCase(itemAttribute.name),
            ])
          ),
        ],
        Page.tabs.effectEntries(
          item.effect_entries,
          "The effect of this ability listed in different languages."
        ),
        Page.tabs.flavorTextEntries(
          item.flavor_text_entries,
          "The flavor text of this ability listed in different languages."
        )
      )}
    </>
  );
});
