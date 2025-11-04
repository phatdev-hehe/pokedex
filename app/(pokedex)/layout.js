import logoSrc from "@/logo.gif";
import { Image } from "@/shared/components";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

const createDocsLayoutTree = async ([getList, path]) => {
  const data = await Pokedex[getList]();

  return {
    name: `${data.count} ${path}`,
    type: "folder",
    children: data.results.map(({ name }) => ({
      name: Pokedex.formatName(name),
      url: `/${path}/${name}`,
    })),
  };
};

const DocsLayoutTree1 = await createDocsLayoutTree([
  "getPokemonsList",
  "pokemon",
]);

const DocsLayoutTree2 = await Promise.all(
  [
    ["getBerriesList", "bery"],
    ["getGendersList", "gender"],
    ["getItemsList", "item"],
    ["getMovesList", "move"],
    ["getStatsList", "stat"],
    ["getTypesList", "type"],
    ["getNaturesList", "nature"],
  ].map(createDocsLayoutTree)
);

export default ({ children }) => (
  <DocsLayout
    nav={{
      title: <Image width={50} src={logoSrc} />,
    }}
    githubUrl="https://github.com/phatdev-hehe/pokedex"
    tree={{
      children: [
        ...DocsLayoutTree1.children,
        { type: "separator", name: "NOT_AVAILABLE" },
        ...DocsLayoutTree2,
      ],
    }}
  >
    <div
      className="prose" // https://fumadocs.dev/docs/ui/theme#typography
      style={{ width: "100%", padding: "2rem" }}
    >
      {children}
    </div>
  </DocsLayout>
);
