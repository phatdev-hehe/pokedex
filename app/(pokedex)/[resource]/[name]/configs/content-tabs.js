import { table } from "@/components";
import { Link } from "@/components/link";
import { titleCase } from "@/utils/title-case";

import { Avatar, unnamedLink } from "./components";
import languageLink from "./components/language-link";

const RAW_CONTENT = Symbol();

const tab =
  (name, render) =>
  (context, as = name) => {
    const content = render({ context });

    return as === RAW_CONTENT ? content : { [as]: content };
  };

export default {
  descriptions: tab("descriptions", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        context.description,
        languageLink(context.language),
      ],
      thead: [undefined, "language"],
    })
  ),
  get effectChanges() {
    return tab("effect_changes", ({ context }) =>
      table.pagination(context, {
        renderRows: ({ context }) => [
          <Link href={`/version-group/${context.version_group.name}`}>
            {titleCase(context.version_group.name)}
          </Link>,
          this.effectEntries(context.effect_entries, RAW_CONTENT),
        ],
        thead: ["version_group", "effect_entries"],
      })
    );
  },
  effectEntries: tab("effect_entries", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        context.short_effect ? (
          <span title={context.effect}>{context.short_effect}</span>
        ) : (
          context.effect
        ),
        languageLink(context.language),
      ],
      thead: [undefined, "language"],
    })
  ),
  encounter: {
    versionDetails: tab("version_details", ({ context }) =>
      table.pagination(context, {
        renderRows: ({ context }) => [
          <Link href={`/version/${context.version.name}`}>
            {titleCase(context.version.name)}
          </Link>,
          context.max_chance,
          table.pagination(context.encounter_details, {
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
            thead: [
              "method",
              "chance",
              "min_level",
              "max_level",
              "condition_values",
            ],
          }),
        ],
        thead: [undefined, "max_chance", "encounter_details"],
      })
    ),
  },
  flavorTextEntries: tab("flavor_text_entries", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => {
        const version = context.version?.name;
        const versionGroup = context.version_group?.name;

        return [
          context.flavor_text ?? context.text,
          <Link href={`/version/${version}`}>{titleCase(version)}</Link>,
          <Link href={`/version-group/${versionGroup}`}>
            {titleCase(versionGroup)}
          </Link>,
          languageLink(context.language),
        ];
      },
      thead: [undefined, "version", "version_group", "language"],
    })
  ),
  gameIndices: tab("game_indices", ({ context }) =>
    table.pagination(context, {
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
      thead: [undefined, "generation", "version"],
    })
  ),
  machines: tab("machines", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        unnamedLink(context.machine.url),
        <Link href={`/version-group/${context.version_group.name}`}>
          {titleCase(context.version_group.name)}
        </Link>,
      ],
      thead: [undefined, "version_group"],
    })
  ),
  names: tab("names", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        context.name,
        languageLink(context.language),
      ],
      thead: [undefined, "language"],
    })
  ),
  RAW_CONTENT,
  sprites: tab("sprites", ({ context }) =>
    table.pagination.fromObject(context, {
      renderKey: titleCase,
      renderValue: (src) => <Avatar src={src} />,
    })
  ),
  types: tab("types", ({ context }) =>
    table.pagination(context, {
      renderRows: ({ context }) => [
        <Link href={`/type/${context.type.name}`}>
          {titleCase(context.type.name)}
        </Link>,
        context.slot,
      ],
      thead: [undefined, "slot"],
    })
  ),
};
