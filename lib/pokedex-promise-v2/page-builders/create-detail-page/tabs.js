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
      renderFirstRow: ({ context }) => context.game_index,
      renderRows: ({ context }) => {
        const generation = context.generation?.name;
        const version = context.version?.name;

        return [
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
      renderFirstRow: ({ context }) => (
        <Link href={`/version-group/${context.version_group.name}`}>
          {titleCase(context.version_group.name)}
        </Link>
      ),
      renderRows: ({ context }) => [
        table.pagination(context.effect_entries, {
          thead: [undefined, "language"],
          renderFirstRow: ({ context }) => context.effect,
          renderRows: ({ context }) => [
            <Pokedex.LanguageLink code={context.language.name} />,
          ],
        }),
      ],
    })
  ),
  effectEntries: defineTab("effect_entries", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "language"],
      renderFirstRow: ({ context }) => (
        <span title={context.effect}>{context.short_effect}</span>
      ),
      renderRows: ({ context }) => [
        <Pokedex.LanguageLink code={context.language.name} />,
      ],
    })
  ),
  flavorTextEntries: defineTab("flavor_text_entries", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "language", "version", "version_group"],
      renderFirstRow: ({ context }) => context.flavor_text ?? context.text,
      renderRows: ({ context }) => {
        const version = context.version?.name;
        const versionGroup = context.version_group?.name;

        return [
          <Pokedex.LanguageLink code={context.language.name} />,
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
      renderFirstRow: ({ context }) => context.name,
      renderRows: ({ context }) => [
        <Pokedex.LanguageLink code={context.language.name} />,
      ],
    })
  ),
  types: defineTab("types", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "slot"],
      renderFirstRow: ({ context }) => (
        <Link href={`/type/${context.type.name}`}>
          {titleCase(context.type.name)}
        </Link>
      ),
      renderRows: ({ context }) => [context.slot],
    })
  ),
  descriptions: defineTab("descriptions", ({ context }) =>
    table.pagination(context, {
      thead: [undefined, "language"],
      renderFirstRow: ({ context }) => context.description,
      renderRows: ({ context }) => [
        <Pokedex.LanguageLink code={context.language.name} />,
      ],
    })
  ),
  moves: defineTab("moves", ({ context }) =>
    table.pagination(context, {
      renderFirstRow: ({ context }) => (
        <Link href={`/move/${context.name}`}>{titleCase(context.name)}</Link>
      ),
    })
  ),
  pokemonSpecies: defineTab("pokemon_species", ({ context }) =>
    table.pagination(context, {
      renderFirstRow: ({ context }) => (
        <Link href={`/pokemon-species/${context.name}`}>
          {titleCase(context.name)}
        </Link>
      ),
    })
  ),
  versionGroups: defineTab("version_groups", ({ context }) =>
    table.pagination(context, {
      renderFirstRow: ({ context }) => (
        <Link href={`/version-group/${context.name}`}>
          {titleCase(context.name)}
        </Link>
      ),
    })
  ),
};
