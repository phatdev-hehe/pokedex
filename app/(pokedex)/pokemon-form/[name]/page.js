import { Checkbox, highlighter, table } from "@/(shared)/components";
import { Link } from "@/(shared)/components/link";
import { Pokedex } from "@/(shared)/pokedex-promise-v2";
import { titleCase } from "@/(shared)/utils/title-case";

const Page = await Pokedex.createDetailPage("pokemon-form", {
  limitStaticParams: 100,
  getAvatar: ({ context }) => {
    /** @type PokemonForm */
    const pokemonForm = context.data;

    return pokemonForm.sprites.front_default;
  },
  get getFavicon() {
    return this.getAvatar;
  },
});

export const { generateMetadata, generateStaticParams } = Page;

export default Page(({ context }) => {
  /** @type PokemonForm */
  const pokemonForm = context.data;

  return (
    <>
      {table(undefined, [
        ["Id", pokemonForm.id],
        [
          highlighter("The Pokémon that can take on this form.", "Pokémon"),
          <Link href={`/pokemon/${pokemonForm.pokemon.name}`}>
            {titleCase(pokemonForm.pokemon.name)}
          </Link>,
        ],
        [
          highlighter(
            "The version group this Pokémon form was introduced in.",
            "version group"
          ),
          titleCase(pokemonForm.version_group.name),
        ],
        [
          "The order in which forms should be sorted within all forms. Multiple forms may have equal order, in which case they should fall back on sorting by name.",
          pokemonForm.order,
        ],
        [
          highlighter("The name of this form.", "name"),
          titleCase(pokemonForm.form_name),
        ],
        [
          highlighter(
            `The order in which forms should be sorted within a species' forms.`,
            "order"
          ),
          pokemonForm.form_order,
        ],
        [
          highlighter(
            "True for exactly one form used as the default for each Pokémon.",
            "default"
          ),
          <Checkbox checked={pokemonForm.is_default} />,
        ],
        [
          "Whether or not this form can only happen during battle.",
          <Checkbox checked={pokemonForm.is_battle_only} />,
        ],
        [
          highlighter(
            "Whether or not this form requires mega evolution.",
            "mega"
          ),
          <Checkbox checked={pokemonForm.is_mega} />,
        ],
      ])}
      {Page.tabs(
        Page.tabs.sprites(pokemonForm.sprites),
        Page.tabs.names(pokemonForm.names),
        Page.tabs.types(pokemonForm.types),
        Page.tabs.names(pokemonForm.form_names, "form_names")
      )}
    </>
  );
});
