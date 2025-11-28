import { Checkbox, highlighter, table } from "@/(shared)/components";
import { Link } from "@/(shared)/components/link";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";

const Page = await Pokedex.createDetailPage("pokemon-species");

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonSpecies */
  const pokemonSpecies = context.data;
  const previousPokemonSpeciesName = pokemonSpecies.evolves_from_species?.name; // ??

  return (
    <>
      {table(undefined, [
        ["Id", pokemonSpecies.id],
        [
          highlighter(
            "The Pokémon species that evolves into this Pokemon_species.",
            "Pokémon species"
          ),
          <Link href={`/pokemon-species/${previousPokemonSpeciesName}`}>
            {titleCase(previousPokemonSpeciesName)}
          </Link>,
        ],
        [
          highlighter(
            "The generation this Pokémon species was introduced in.",
            "generation"
          ),
          <Link href={`/generation/${pokemonSpecies.generation.name}`}>
            {titleCase(pokemonSpecies.generation.name)}
          </Link>,
        ],
        [
          highlighter("Whether or not this is a baby Pokémon.", "baby"),
          <Checkbox checked={pokemonSpecies.is_baby} />,
        ],
        [
          highlighter(
            "Whether or not this is a legendary Pokémon.",
            "legendary"
          ),
          <Checkbox checked={pokemonSpecies.is_legendary} />,
        ],
        [
          highlighter("Whether or not this is a mythical Pokémon.", "mythical"),
          <Checkbox checked={pokemonSpecies.is_mythical} />,
        ],
        [
          highlighter(
            "The order in which species should be sorted. Based on National Dex order, except families are grouped together and sorted by stage.",
            "National Dex order"
          ),
          pokemonSpecies.order,
        ],
        [
          highlighter(
            "The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon.",
            "happiness"
          ),
          pokemonSpecies.base_happiness,
        ],
        [
          highlighter(
            "The base capture rate; up to 255. The higher the number, the easier the catch.",
            "capture rate"
          ),
          pokemonSpecies.capture_rate,
        ],
        [
          highlighter("The color of this Pokémon for Pokédex search.", "color"),
          titleCase(pokemonSpecies.color.name),
        ],
        [
          "The rate at which this Pokémon species gains levels.",
          <Link href={`/growth-rate/${pokemonSpecies.growth_rate.name}`}>
            {titleCase(pokemonSpecies.growth_rate.name)}
          </Link>,
        ],
        [
          highlighter(
            "Whether or not this Pokémon has multiple forms and can switch between them.",
            "multiple forms"
          ),
          <Checkbox checked={pokemonSpecies.forms_switchable} />,
        ],
        [
          "The chance of this Pokémon being female, in eighths; or -1 for genderless.",
          pokemonSpecies.gender_rate,
        ],
        [
          highlighter(
            "The habitat this Pokémon species can be encountered in.",
            "habitat"
          ),
          titleCase(pokemonSpecies.habitat?.name), // ??
        ],
        [
          "Whether or not this Pokémon has visual gender differences.",
          <Checkbox checked={pokemonSpecies.has_gender_differences} />,
        ],
        [
          highlighter(
            `Initial hatch counter: one must walk Y × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's. Y varies per generation. In Generations II, III, and VII, Egg cycles are 256 steps long. In Generation IV, Egg cycles are 255 steps long. In Pokémon Brilliant Diamond and Shining Pearl, Egg cycles are also 255 steps long, but are shorter on special dates. In Generations V and VI, Egg cycles are 257 steps long. In Pokémon Sword and Shield, and in Pokémon Scarlet and Violet, Egg cycles are 128 steps long.`,
            "Initial hatch counter"
          ),
          pokemonSpecies.hatch_counter,
        ],
        [
          highlighter("The shape of this Pokémon for Pokédex search.", "shape"),
          <Link href={`/pokemon-shape/${pokemonSpecies.shape.name}`}>
            {titleCase(pokemonSpecies.shape.name)}
          </Link>,
        ],
      ])}
      {Page.tabs(
        [
          "varieties",
          table.pagination(pokemonSpecies.varieties, {
            thead: [undefined, "default"],
            renderFirstItem: ({ context }) => (
              <Link href={`/pokemon/${context.pokemon.name}`}>
                {titleCase(context.pokemon.name)}
              </Link>
            ),
            renderItems: ({ context }) => [
              <Checkbox checked={context.is_default} />,
            ],
          }),
        ],
        Page.tabs.names(pokemonSpecies.names),
        [
          "egg_groups",
          table.pagination(pokemonSpecies.egg_groups, {
            renderFirstItem: ({ context }) => (
              <Link href={`/egg-group/${context.name}`}>
                {titleCase(context.name)}
              </Link>
            ),
          }),
        ],
        Page.tabs.flavorTextEntries(pokemonSpecies.flavor_text_entries),
        Page.tabs.descriptions(
          pokemonSpecies.form_descriptions,
          "form_descriptions"
        ),
        [
          "genera",
          table.pagination(pokemonSpecies.genera, {
            thead: [undefined, "language"],
            renderFirstItem: ({ context }) => context.genus,
            renderItems: ({ context }) => [
              <Pokedex.LanguageLink code={context.language.name} />,
            ],
          }),
        ],
        [
          "pal_park_encounters",
          table.pagination(pokemonSpecies.pal_park_encounters, {
            thead: ["area", "base_score", "rate"],
            renderFirstItem: ({ context }) => titleCase(context.area.name),
            renderItems: ({ context }) => [context.base_score, context.rate],
          }),
        ],
        [
          "pokedex_numbers",
          table.pagination(pokemonSpecies.pokedex_numbers, {
            thead: [undefined, "entry_number"],
            renderFirstItem: ({ context }) => (
              <Link href={`/pokedex/${context.pokedex.name}`}>
                {titleCase(context.pokedex.name)}
              </Link>
            ),
            renderItems: ({ context }) => [context.entry_number],
          }),
        ]
      )}
    </>
  );
});
