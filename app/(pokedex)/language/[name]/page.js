import { Checkbox, highlighter, table, tabs } from "@/components";
import { Pokedex } from "@/lib/pokedex-promise-v2";

const Page = await Pokedex.defineDetailPage("language");

export const { generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type Language */
  const language = context.data;

  return (
    <>
      {table(undefined, [
        [
          "Whether or not the games are published in this language.",
          <Checkbox checked={language.official} />,
        ],
        [
          highlighter(
            "iso3166. The two-letter code of the language. Note that it is not unique.",
            "iso3166"
          ),
          language.iso3166,
        ],
        [
          highlighter(
            "iso639. The two-letter code of the country where this language is spoken. Note that it is not unique.",
            "iso639"
          ),
          language.iso639,
        ],
      ])}
      {tabs(Page.tabs.names(language.names))}
    </>
  );
});
