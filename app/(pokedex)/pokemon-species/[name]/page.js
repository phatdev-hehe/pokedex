import { Checkbox, sections, table } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import Link from "next/link";

const { generateMetadata, generateStaticParams, withData } =
  await Pokedex.createPage({
    getList: "getPokemonSpeciesList",
    getData: "getPokemonSpeciesByName",
    titleSuffix: "Pokémon Species",
  });

export { generateMetadata, generateStaticParams };

export default withData(({ data }) => {
  /** @type PokemonSpecies */
  const pokemonSpecies = data;

  const previousPokemonSpeciesName =
    pokemonSpecies.evolves_from_species?.name ?? "";

  console.log(pokemonSpecies);

  return (
    <>
      {table(
        [undefined, "Value"],
        [
          ["Id", pokemonSpecies.id],
          [
            "The Pokémon species that evolves into this Pokemon_species.",
            <Link href={`/pokemon-species/${previousPokemonSpeciesName}`}>
              {Pokedex.formatName(previousPokemonSpeciesName)}
            </Link>,
          ],
          [
            "The generation this Pokémon species was introduced in.",
            Pokedex.formatName(pokemonSpecies.generation.name),
          ],
          ["Baby", <Checkbox checked={pokemonSpecies.is_baby} />],
          ["Legendary", <Checkbox checked={pokemonSpecies.is_legendary} />],
          ["Mythical", <Checkbox checked={pokemonSpecies.is_mythical} />],
          [
            "The order in which species should be sorted. Based on National Dex order, except families are grouped together and sorted by stage.",
            pokemonSpecies.order,
          ],
          [
            "The happiness when caught by a normal Pokéball; up to 255. The higher the number, the happier the Pokémon.",
            pokemonSpecies.base_happiness,
          ],
          [
            "The base capture rate; up to 255. The higher the number, the easier the catch.",
            pokemonSpecies.capture_rate,
          ],
          [
            "The color of this Pokémon for Pokédex search.",
            Pokedex.formatName(pokemonSpecies.color.name),
          ],
          [
            "The rate at which this Pokémon species gains levels.",
            Pokedex.formatName(pokemonSpecies.growth_rate.name),
          ],
          [
            "Whether or not this Pokémon has multiple forms and can switch between them.",
            <Checkbox checked={pokemonSpecies.forms_switchable} />,
          ],
          [
            "The chance of this Pokémon being female, in eighths; or -1 for genderless.",
            pokemonSpecies.gender_rate,
          ],
          [
            "The habitat this Pokémon species can be encountered in.",
            Pokedex.formatName(pokemonSpecies.habitat?.name ?? ""), // ??
          ],
          [
            "Whether or not this Pokémon has visual gender differences.",
            <Checkbox checked={pokemonSpecies.has_gender_differences} />,
          ],
          [
            `Initial hatch counter: one must walk Y × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's. Y varies per generation. In Generations II, III, and VII, Egg cycles are 256 steps long. In Generation IV, Egg cycles are 255 steps long. In Pokémon Brilliant Diamond and Shining Pearl, Egg cycles are also 255 steps long, but are shorter on special dates. In Generations V and VI, Egg cycles are 257 steps long. In Pokémon Sword and Shield, and in Pokémon Scarlet and Violet, Egg cycles are 128 steps long.`,
            pokemonSpecies.hatch_counter,
          ],
          [
            "The shape of this Pokémon for Pokédex search.",
            Pokedex.formatName(pokemonSpecies.shape.name),
          ],
        ]
      )}
      {sections(
        [
          "Varieties",
          "A list of the Pokémon that exist within this Pokémon species.",
          table(
            [undefined, "Default"],
            pokemonSpecies.varieties.map((variety) => [
              <Link href={`/pokemon/${variety.pokemon.name}`}>
                {Pokedex.formatName(variety.pokemon.name)}
              </Link>,
              <Checkbox checked={variety.is_default} />,
            ])
          ),
        ],
        [
          "Names",
          undefined,
          table(
            ["Language", undefined],
            pokemonSpecies.names.map((name) => [name.language.name, name.name])
          ),
        ],
        [
          "Egg Groups",
          "A list of egg groups this Pokémon species is a member of.",
          table(
            ["Name"],
            pokemonSpecies.egg_groups.map((eggGroups) => [
              Pokedex.formatName(eggGroups.name),
            ])
          ),
        ],
        [
          "Flavor Text Entries",
          "A list of flavor text entries for this Pokémon species.",
          table(
            ["Language", "Version", undefined],
            pokemonSpecies.flavor_text_entries.map((flavorText) => [
              flavorText.language.name,
              Pokedex.formatName(flavorText.version.name), // ??
              flavorText.flavor_text,
            ])
          ),
        ],
        [
          "Form Descriptions",
          "Descriptions of different forms Pokémon take on within the Pokémon species.",
          table(
            ["Language", undefined],
            pokemonSpecies.form_descriptions.map((description) => [
              description.language.name,
              description.description,
            ])
          ),
        ],
        [
          "Genera",
          "The genus of this Pokémon species listed in multiple languages.",
          table(
            ["Language", undefined],
            pokemonSpecies.genera.map((genus) => [
              genus.language.name,
              genus.genus,
            ])
          ),
        ],
        [
          "Pal Park Encounters",
          "A list of encounters that can be had with this Pokémon species in pal park.",
          table(
            ["Area", "Base Score", "Rate"],
            pokemonSpecies.pal_park_encounters.map((palParkEncounter) => [
              Pokedex.formatName(palParkEncounter.area.name),
              palParkEncounter.base_score,
              palParkEncounter.rate,
            ])
          ),
        ],
        [
          "Pokedex Numbers",
          "A list of Pokedexes and the indexes reserved within them for this Pokémon species.",
          table(
            [undefined, "Pokedex"],
            pokemonSpecies.pokedex_numbers.map((pokedexNumber) => [
              pokedexNumber.entry_number,
              Pokedex.formatName(pokedexNumber.pokedex.name),
            ])
          ),
        ]
      )}
    </>
  );
});
