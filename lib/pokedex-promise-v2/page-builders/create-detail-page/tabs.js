import { Link, table } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";
import Avatar from "./avatar";

const defineTab =
  (trigger, render) =>
  (context, as = trigger) =>
    [as, render({ context })];

export default {
  gameIndices: defineTab("game_indices", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "generation", "version"],
      renderRows: ({ context }) => {
        const generation = context.generation?.name;
        const version = context.version?.name;

        return [
          context.game_index,
          <Link href={`/generation/${generation}`}>
            {titleCase(generation)}
          </Link>,
          <Link href={`/version/${version}`}>{titleCase(version)}</Link>,
        ];
      },
      showIndex: false,
    })
  ),
  effectChanges: defineTab("effect_changes", ({ context }) =>
    table.pagination(context, {
      thead: ["version_group", "effect_entries"],
      renderRows: ({ context }) => [
        <Link href={`/version-group/${context.version_group.name}`}>
          {titleCase(context.version_group.name)}
        </Link>,
        table.pagination(context.effect_entries, {
          thead: [undefined, "language"],
          renderRows: ({ context }) => [
            context.effect,
            <Pokedex.LanguageLink language={context.language} />,
          ],
        }),
      ],
    })
  ),
  effectEntries: defineTab("effect_entries", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "language"],
      renderRows: ({ context }) => [
        <span title={context.effect}>{context.short_effect}</span>,
        <Pokedex.LanguageLink language={context.language} />,
      ],
    })
  ),
  flavorTextEntries: defineTab("flavor_text_entries", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "language", "version", "version_group"],
      renderRows: ({ context }) => {
        const version = context.version?.name;
        const versionGroup = context.version_group?.name;

        return [
          context.flavor_text ?? context.text,
          <Pokedex.LanguageLink language={context.language} />,
          <Link href={`/version/${version}`}>{titleCase(version)}</Link>,
          <Link href={`/version-group/${versionGroup}`}>
            {titleCase(versionGroup)}
          </Link>,
        ];
      },
    })
  ),
  sprites: defineTab("sprites", ({ context }) =>
    table.pagination.fromObject(context, {
      renderKey: titleCase,
      renderValue: (src) => <Avatar src={src} />,
    })
  ),
  names: defineTab("names", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "language"],
      renderRows: ({ context }) => [
        context.name,
        <Pokedex.LanguageLink language={context.language} />,
      ],
    })
  ),
  types: defineTab("types", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "slot"],
      renderRows: ({ context }) => [
        <Link href={`/type/${context.type.name}`}>
          {titleCase(context.type.name)}
        </Link>,
        context.slot,
      ],
    })
  ),
  descriptions: defineTab("descriptions", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "language"],
      renderRows: ({ context }) => [
        context.description,
        <Pokedex.LanguageLink language={context.language} />,
      ],
    })
  ),
  moves: defineTab("moves", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        <Link href={`/move/${context.name}`}>{titleCase(context.name)}</Link>,
      ],
    })
  ),
  pokemonSpecies: defineTab("pokemon_species", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        <Link href={`/pokemon-species/${context.name}`}>
          {titleCase(context.name)}
        </Link>,
      ],
    })
  ),
  versionGroups: defineTab("version_groups", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        <Link href={`/version-group/${context.name}`}>
          {titleCase(context.name)}
        </Link>,
      ],
    })
  ),
  items: defineTab("items", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        <Link href={`/item/${context.name}`}>{titleCase(context.name)}</Link>,
      ],
    })
  ),
  versionDetails: defineTab("version_details", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "max_chance", "encounter_details"],
      renderRows: ({ context }) => [
        <Link href={`/version/${context.version.name}`}>
          {titleCase(context.version.name)}
        </Link>,
        context.max_chance,
        table.pagination(context.encounter_details, {
          thead: [
            undefined,
            "chance",
            "min_level",
            "max_level",
            "condition_values",
          ],
          renderRows: ({ context }) => [
            <Link href={`/encounter-method/${context.method.name}`}>
              {titleCase(context.method.name)}
            </Link>,
            context.chance,
            context.min_level,
            context.max_level,
            table.pagination(context.condition_values, {
              renderRows: ({ context }) => [
                <Link href={`/encounter-condition-value/${context.name}`}>
                  {titleCase(context.name)}
                </Link>,
              ],
            }),
          ],
        }),
      ],
    })
  ),
  pokedexes: defineTab("pokedexes", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        <Link href={`/pokedex/${context.name}`}>
          {titleCase(context.name)}
        </Link>,
      ],
    })
  ),
};
