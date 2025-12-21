import { highlighter, table, tabs } from "@/components";
import { Link } from "@/components/link";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.defineDetailPage("berry");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Berry */
  const berry = context.data;

  return (
    <>
      {table(undefined, [
        [
          highlighter(
            "Berries are actually items. This is a reference to the item specific data for this berry.",
            "the item"
          ),
          <Link href={`/item/${berry.item.name}`}>
            {titleCase(berry.item.name)}
          </Link>,
        ],
        [
          highlighter(
            "The firmness of this berry, used in making Pokéblocks or Poffins.",
            "firmness"
          ),
          <Link href={`/berry-firmness/${berry.firmness.name}`}>
            {titleCase(berry.firmness.name)}
          </Link>,
        ],
        [
          "Time it takes the tree to grow one stage, in hours. Berry trees go through four of these growth stages before they can be picked.",
          berry.growth_time,
        ],
        [
          "The maximum number of these berries that can grow on one tree in Generation IV.",
          berry.max_harvest,
        ],
        [
          highlighter(
            'The power of the move "Natural Gift" when used with this Berry.',
            "power"
          ),
          berry.natural_gift_power,
        ],
        [
          highlighter(
            `The type inherited by "Natural Gift" when used with this Berry.`,
            "type"
          ),
          <Link href={`/type/${berry.natural_gift_type.name}`}>
            {titleCase(berry.natural_gift_type.name)}
          </Link>,
        ],
        [
          highlighter("The size of this Berry, in millimeters.", "size"),
          berry.size,
        ],
        [
          highlighter(
            "The smoothness of this Berry, used in making Pokéblocks or Poffins.",
            "smoothness"
          ),
          berry.smoothness,
        ],
        [
          highlighter(
            "The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly.",
            "soil dries"
          ),
          berry.soil_dryness,
        ],
      ])}
      {tabs({
        flavors: table.pagination(berry.flavors, {
          renderRows: ({ context }) => [
            <Link href={`/berry-flavor/${context.flavor.name}`}>
              {titleCase(context.flavor.name)}
            </Link>,
            context.potency,
          ],
          thead: [undefined, "potency"],
        }),
      })}
    </>
  );
});
