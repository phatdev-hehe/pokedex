import { Pokedex } from "@/shared/pokedex-promise-v2";

export default await Pokedex.createListPage({
  path: "move",
  getList: "getMovesList",
});
