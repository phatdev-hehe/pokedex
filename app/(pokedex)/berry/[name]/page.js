import { Link, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";

const Page = await Pokedex.createDetailPage("berry");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Berry */
  const berry = context.data;

  return (
    <>
      {table(undefined, [
        ["Id", berry.id],
        [
          "Berries are actually items. This is a reference to the item specific data for this berry.",
          <Link href={`/item/${berry.item.name}`}>
            {titleCase(berry.item.name)}
          </Link>,
        ],
        [
          "The firmness of this berry, used in making Pokéblocks or Poffins.",
          titleCase(berry.firmness.name),
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
          'The power of the move "Natural Gift" when used with this Berry.',
          berry.natural_gift_power,
        ],
        [
          `The type inherited by "Natural Gift" when used with this Berry.`,
          <Link href={`/type/${berry.natural_gift_type.name}`}>
            {titleCase(berry.natural_gift_type.name)}
          </Link>,
        ],
        ["The size of this Berry, in millimeters.", berry.size],
        [
          "The smoothness of this Berry, used in making Pokéblocks or Poffins.",
          berry.smoothness,
        ],
        [
          "The speed at which this Berry dries out the soil as it grows. A higher rate means the soil dries more quickly.",
          berry.soil_dryness,
        ],
      ])}
      {Page.tabs([
        "flavors",
        "A list of references to each flavor a berry can have and the potency of each of those flavors in regard to this berry.",
        table(
          [undefined, "potency"],
          berry.flavors.map((flavor) => [
            titleCase(flavor.flavor.name),
            flavor.potency,
          ])
        ),
      ])}
    </>
  );
});
