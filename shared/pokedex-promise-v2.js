import { DescriptionList, table, tabs } from "@/shared/components";
import { titleCase, uniqBy } from "@/shared/utils";
import { getLanguageName } from "@/shared/utils/get-language-name";
import delay from "delay";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import isPlainObject from "is-plain-obj";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";
import { cache, Fragment } from "react";
import "server-only";

const pokeAPI = new PokeAPI();

const LastUpdate = () => {
  const date = new Date();

  return (
    <span>
      Last updated on{" "}
      <time
        style={{ color: "var(--color-fd-foreground)" }}
        dateTime={date.toString()}
      >
        {date.toLocaleDateString()}
      </time>
    </span>
  );
};

export const Pokedex = {
  api: [
    "getAbilitiesList",
    "getAbilityByName",
    "getItemByName",
    "getItemsList",
    "getMoveByName",
    "getMovesList",
    "getPokedexByName",
    "getPokedexList",
    "getPokemonByName",
    "getPokemonsList",
    "getPokemonSpeciesByName",
    "getPokemonSpeciesList",
    "getResource",
    "getStatByName",
    "getStatsList",
    "getTypeByName",
    "getTypesList",
  ].reduce((a, b) => {
    a[b] = cache(async (...args) => {
      if (process.env.NODE_ENV === "production") await delay(3000);

      try {
        const data = await pokeAPI[b](...args);

        if (
          isPlainObject(data) &&
          ["count", "next", "previous", "results"].every((key) => key in data)
        ) {
          const [result] = data.results;

          if (
            isPlainObject(result) &&
            ["name", "url"].every((key) => key in result)
          ) {
            data.results = uniqBy(data.results, (item) => item.name);
            data.count = data.results.length;
          }
        }

        return data;
      } catch {
        notFound();
      }
    });

    return a;
  }, {}),
  Image: ({ style, ...props }) => (
    <img alt=" " style={{ maxWidth: 100, ...style }} {...props} />
  ),
  createPage: async ({
    getList,
    getData,
    titleSuffix,
    getAvatar = () => {},
  }) => {
    const names = (await Pokedex.api[getList]()).results.map(
      ({ name }) => name
    );

    const createTitle = (title) => {
      title = titleCase(title);

      return titleSuffix ? `${title} (${titleCase(titleSuffix)})` : title;
    };

    return {
      tabs: Object.assign(
        (...data) =>
          tabs(
            data.map(([item]) => item),
            data.map(([, description, content], key) => (
              <Fragment key={key}>
                {description && (
                  <DescriptionList>{description}</DescriptionList>
                )}
                {content}
              </Fragment>
            ))
          ),
        {
          effectChanges: (effect_changes, description) => [
            "effect_changes",
            description,
            table(
              ["version_group", "effect_entries"],
              effect_changes.map((effectChange) => [
                titleCase(effectChange.version_group.name),
                table(
                  [undefined, "language"],
                  effectChange.effect_entries.map((effect) => [
                    effect.effect,
                    getLanguageName(effect.language.name),
                  ])
                ),
              ])
            ),
          ],
          effectEntries: (effect_entries, description) => [
            "effect_entries",
            description,
            table(
              [undefined, "language"],
              effect_entries.map((verboseEffect) => [
                <div title={verboseEffect.effect}>
                  {verboseEffect.short_effect}
                </div>,
                getLanguageName(verboseEffect.language.name),
              ])
            ),
          ],
          flavorTextEntries: (flavor_text_entries, description) => [
            "flavor_text_entries",
            description,
            table(
              [undefined, "language", "version", "version_group"],
              flavor_text_entries.map((flavorText) => [
                flavorText.flavor_text,
                getLanguageName(flavorText.language.name),

                // ??
                titleCase(flavorText.version?.name),
                titleCase(flavorText.version_group?.name),
              ])
            ),
          ],
          sprites: (sprites, description) => [
            "sprites",
            description,
            table.fromObject(undefined, sprites, titleCase, (src) => (
              <Pokedex.Image src={src} />
            )),
          ],
          names: (names, description) => [
            "names",
            description,
            table(
              [undefined, "language"],
              names.map((name) => [
                name.name,
                getLanguageName(name.language.name),
              ])
            ),
          ],
        }
      ),
      Root: Fragment,
      generateStaticParams: () => names.map((name) => ({ name })),
      generateMetadata: async ({ params }) => {
        const { name } = await params;

        return { title: createTitle(name) };
      },
      withData:
        (render) =>
        async ({ params }) => {
          const { name } = await params;

          if (!names.includes(name)) notFound();

          const context = {
            data: await Pokedex.api[getData](name),
            names,
          };

          return (
            <>
              <Pokedex.Image
                style={{
                  alignSelf: "center",
                  position: "fixed",
                }}
                src={getAvatar(context)}
              />
              <div
                style={{
                  "--sticky-offset": "1rem",
                  "--letter-spacing": "-.09ch",

                  position: "relative",
                  top: "11rem",
                }}
              >
                <div
                  style={{
                    position: "sticky",
                    top: "var(--sticky-offset)",
                  }}
                >
                  <DocsTitle style={{ letterSpacing: "var(--letter-spacing)" }}>
                    {createTitle(name)}
                  </DocsTitle>
                  <DocsDescription
                    style={{
                      letterSpacing: "var(--letter-spacing)",
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "medium",
                    }}
                  >
                    <span>
                      {names.findIndex((value) => value === name) + 1}
                      {" / "}
                      {names.length}
                    </span>
                    <LastUpdate />
                  </DocsDescription>
                </div>
                <DocsBody
                  style={{
                    backgroundColor: "var(--color-fd-background)",
                    position: "relative",
                    paddingBottom: "1rem",
                  }}
                >
                  {await render(context)}
                </DocsBody>
              </div>
            </>
          );
        },
    };
  },
};
