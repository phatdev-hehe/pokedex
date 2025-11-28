import { table, tabs } from "@/(shared)/components";
import { Link } from "@/(shared)/components/link";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";
import Avatar from "./avatar";

const defineTab =
  (title, fn) =>
  (context, as = title) =>
    [as, fn({ context })];

export default Object.assign(
  (...values) =>
    tabs(
      values.map(([value]) => value),
      values.map(([, value]) => value)
    ),
  {
    gameIndices: defineTab("game_indices", ({ context }) =>
      table.pagination(context, {
        thead: [undefined, "generation", "version"],
        renderFirstItem: ({ context }) => context.game_index,
        renderItems: ({ context }) => {
          const generation = context.generation?.name;

          return [
            <Link href={`/generation/${generation}`}>
              {titleCase(generation)}
            </Link>,
            titleCase(context.version?.name),
          ];
        },
        showIndex: false,
      })
    ),
    effectChanges: defineTab("effect_changes", ({ context }) =>
      table.pagination(context, {
        thead: ["version_group", "effect_entries"],
        renderFirstItem: ({ context }) => titleCase(context.version_group.name),
        renderItems: ({ context }) => [
          table.pagination(context.effect_entries, {
            thead: [undefined, "language"],
            renderFirstItem: ({ context }) => context.effect,
            renderItems: ({ context }) => [
              <Pokedex.LanguageLink code={context.language.name} />,
            ],
          }),
        ],
      })
    ),
    effectEntries: defineTab("effect_entries", ({ context }) =>
      table.pagination(context, {
        thead: [undefined, "language"],
        renderFirstItem: ({ context }) => (
          <span title={context.effect}>{context.short_effect}</span>
        ),
        renderItems: ({ context }) => [
          <Pokedex.LanguageLink code={context.language.name} />,
        ],
      })
    ),
    flavorTextEntries: defineTab("flavor_text_entries", ({ context }) =>
      table.pagination(context, {
        thead: [undefined, "language", "version", "version_group"],
        renderFirstItem: ({ context }) => context.flavor_text ?? context.text,
        renderItems: ({ context }) => [
          <Pokedex.LanguageLink code={context.language.name} />,

          // ??
          titleCase(context.version?.name),
          titleCase(context.version_group?.name),
        ],
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
        renderFirstItem: ({ context }) => context.name,
        renderItems: ({ context }) => [
          <Pokedex.LanguageLink code={context.language.name} />,
        ],
      })
    ),
    types: defineTab("types", ({ context }) =>
      table.pagination(context, {
        thead: [undefined, "slot"],
        renderFirstItem: ({ context }) => (
          <Link href={`/type/${context.type.name}`}>
            {titleCase(context.type.name)}
          </Link>
        ),
        renderItems: ({ context }) => [context.slot],
      })
    ),
    descriptions: defineTab("descriptions", ({ context }) =>
      table.pagination(context, {
        thead: [undefined, "language"],
        renderFirstItem: ({ context }) => context.description,
        renderItems: ({ context }) => [
          <Pokedex.LanguageLink code={context.language.name} />,
        ],
      })
    ),
    moves: defineTab("moves", ({ context }) =>
      table.pagination(context, {
        renderFirstItem: ({ context }) => (
          <Link href={`/move/${context.name}`}>{titleCase(context.name)}</Link>
        ),
      })
    ),
    pokemonSpecies: defineTab("pokemon_species", ({ context }) =>
      table.pagination(context, {
        renderFirstItem: ({ context }) => (
          <Link href={`/pokemon-species/${context.name}`}>
            {titleCase(context.name)}
          </Link>
        ),
      })
    ),
    versionGroups: defineTab("version_groups", ({ context }) =>
      table.pagination(context, {
        renderFirstItem: ({ context }) => titleCase(context.name),
      })
    ),
  }
);
