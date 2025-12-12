import { Checkbox, Link, table, tabs, ul } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const Page = await Pokedex.createDetailPage("evolution-chain", {
  staticLimit: process.env.DEFAULT_STATIC_LIMIT,
});

export const { generateMetadata, generateStaticParams } = Page;

export const evolutionChainPage = (evolution_chain) => {
  /** @type EvolutionChain */
  const evolutionChain = evolution_chain;

  const babyTriggerItem = evolutionChain.baby_trigger_item?.name;
  const [evolutionDetail] = evolutionChain.chain.evolution_details;

  const chainTabs = (...chains) =>
    tabs(
      ...chains.map((chain) => [
        chain.species.name,
        <>
          {table(undefined, [
            [
              "species",
              <Link href={`/pokemon-species/${chain.species.name}`}>
                {titleCase(chain.species.name)}
              </Link>,
            ],
            ["is_baby", <Checkbox checked={chain.is_baby} />],
            [
              "evolution_details",
              chain.evolution_details.map((evolutionDetail) => {
                const item = evolutionDetail.item?.name;
                const heldItem = evolutionDetail.held_item?.name;
                const knownMove = evolutionDetail.known_move?.name;
                const knownMoveType = evolutionDetail.known_move_type?.name;
                const location = evolutionDetail.location?.name;
                const partySpecies = evolutionDetail.party_species?.name;
                const partyType = evolutionDetail.party_type?.name;
                const tradeSpecies = evolutionDetail.trade_species?.name;
                const trigger = evolutionDetail.trigger?.name;

                return ul(
                  ...[
                    ["base_form_id", evolutionDetail.base_form_id],
                    ["gender", evolutionDetail.gender],
                    [
                      "held_item",
                      <Link href={`/item/${heldItem}`}>
                        {titleCase(heldItem)}
                      </Link>,
                    ],
                    [
                      "item",
                      <Link href={`/item/${item}`}>{titleCase(item)}</Link>,
                    ],
                    [
                      "known_move",
                      <Link href={`/move/${knownMove}`}>
                        {titleCase(knownMove)}
                      </Link>,
                    ],
                    [
                      "known_move_type",
                      <Link href={`/type/${knownMoveType}`}>
                        {titleCase(knownMoveType)}
                      </Link>,
                    ],
                    [
                      "location",
                      <Link href={`/location/${location}`}>{location}</Link>,
                    ],
                    ["min_affection", evolutionDetail.min_affection],
                    ["min_beauty", evolutionDetail.min_beauty],
                    ["min_happiness", evolutionDetail.min_happiness],
                    ["min_level", evolutionDetail.min_level],
                    [
                      "needs_overworld_rain",
                      <Checkbox
                        checked={evolutionDetail.needs_overworld_rain}
                      />,
                    ],
                    [
                      "party_species",
                      <Link href={`/pokemon-species/${partySpecies}`}>
                        {titleCase(partySpecies)}
                      </Link>,
                    ],
                    [
                      "party_type",
                      <Link href={`/type/${partyType}`}>
                        {titleCase(partyType)}
                      </Link>,
                    ],
                    ["region_id", evolutionDetail.region_id],
                    [
                      "relative_physical_stats",
                      evolutionDetail.relative_physical_stats,
                    ],
                    ["time_of_day", evolutionDetail.time_of_day],
                    [
                      "trade_species",
                      <Link href={`/pokemon-species/${tradeSpecies}`}>
                        {titleCase(tradeSpecies)}
                      </Link>,
                    ],
                    [
                      "trigger",
                      <Link href={`/evolution-trigger/${trigger}`}>
                        {titleCase(trigger)}
                      </Link>,
                    ],
                    [
                      "turn_upside_down",
                      <Checkbox checked={evolutionDetail.turn_upside_down} />,
                    ],
                  ].map(([a, b]) => (
                    <>
                      {a}: {b}
                    </>
                  ))
                );
              }),
            ],
          ])}
          {chainTabs(...chain.evolves_to)}
        </>,
      ])
    );

  return (
    <>
      {table(undefined, [
        [
          "baby_trigger_item",
          <Link href={`/item/${babyTriggerItem}`}>
            {titleCase(babyTriggerItem)}
          </Link>,
        ],
      ])}
      {chainTabs(evolutionChain.chain)}
    </>
  );
};

export default Page(({ context }) => evolutionChainPage(context.data));
