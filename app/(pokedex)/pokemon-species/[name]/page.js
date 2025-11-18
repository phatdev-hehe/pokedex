import { Checkbox, highlighter, Link, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { titleCase } from "@/shared/utils";
import { getLanguageName } from "@/shared/utils/get-language-name";

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
          titleCase(pokemonSpecies.generation.name),
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
          titleCase(pokemonSpecies.growth_rate.name),
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
          titleCase(pokemonSpecies.shape.name),
        ],
      ])}
      {Page.tabs(
        [
          "varieties",
          "A list of the Pokémon that exist within this Pokémon species.",
          table(
            [undefined, "default"],
            pokemonSpecies.varieties.map((variety) => [
              <Link href={`/pokemon/${variety.pokemon.name}`}>
                {titleCase(variety.pokemon.name)}
              </Link>,
              <Checkbox checked={variety.is_default} />,
            ])
          ),
        ],
        Page.tabs.names(pokemonSpecies.names),
        [
          "egg_groups",
          "A list of egg groups this Pokémon species is a member of.",
          table(
            undefined,
            pokemonSpecies.egg_groups.map((eggGroups) => [
              titleCase(eggGroups.name),
            ])
          ),
        ],
        Page.tabs.flavorTextEntries(
          pokemonSpecies.flavor_text_entries,
          "A list of flavor text entries for this Pokémon species."
        ),
        [
          "form_descriptions",
          "Descriptions of different forms Pokémon take on within the Pokémon species.",
          table(
            [undefined, "language"],
            pokemonSpecies.form_descriptions.map((description) => [
              description.description,
              getLanguageName(description.language.name),
            ])
          ),
        ],
        [
          "genera",
          "The genus of this Pokémon species listed in multiple languages.",
          table(
            [undefined, "language"],
            pokemonSpecies.genera.map((genus) => [
              genus.genus,
              getLanguageName(genus.language.name),
            ])
          ),
        ],
        [
          "pal_park_encounters",
          "A list of encounters that can be had with this Pokémon species in pal park.",
          table(
            ["area", "base_score", "rate"],
            pokemonSpecies.pal_park_encounters.map((palParkEncounter) => [
              titleCase(palParkEncounter.area.name),
              palParkEncounter.base_score,
              palParkEncounter.rate,
            ])
          ),
        ],
        [
          "pokedex_numbers",
          "A list of Pokedexes and the indexes reserved within them for this Pokémon species.",
          table(
            ["pokedex", "entry_number"],
            pokemonSpecies.pokedex_numbers.map((pokedexNumber) => [
              <Link href={`/pokedex/${pokedexNumber.pokedex.name}`}>
                {titleCase(pokedexNumber.pokedex.name)}
              </Link>,
              pokedexNumber.entry_number,
            ])
          ),
        ]
      )}
    </>
  );
});
