import api from "./api";
import LanguageLink from "./language-link";
import Layout from "./layout";
import pageBuilders from "./page-builders";

export const Pokedex = Object.assign(Layout, {
  api,
  LanguageLink,
  ...pageBuilders,
});
