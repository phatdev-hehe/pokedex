import { DescriptionList, table, tabs } from "@/shared/components";
import { getLanguageName } from "@/shared/get-language-name";
import { titleCase } from "@/shared/utils";
import delay from "delay";
import { notFound } from "next/navigation";
import PokeAPI from "pokedex-promise-v2";
import { cache, Fragment } from "react";
import "server-only";

const pokeAPI = new PokeAPI();

export const Pokedex = {
  api: [
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
        return await pokeAPI[b](...args);
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                padding: "2rem",
              }}
            >
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

                  position: "relative",
                  top: "11rem",
                }}
              >
                <div
                  style={{
                    position: "sticky",
                    top: "var(--sticky-offset)",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "1rem",
                  }}
                >
                  <h1 style={{ letterSpacing: "-.09ch" }}>
                    {createTitle(name)}
                  </h1>
                  <small style={{ color: "var(--color-fd-muted-foreground)" }}>
                    <span style={{ color: "var(--color-fd-foreground)" }}>
                      {names.findIndex((value) => value === name) + 1}
                    </span>
                    {" / "}
                    {names.length}
                  </small>
                </div>
                <div
                  style={{
                    backgroundColor: "var(--color-fd-background)",
                    position: "relative",
                  }}
                >
                  {await render(context)}
                </div>
              </div>
            </div>
          );
        },
    };
  },
};
