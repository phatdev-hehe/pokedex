import { randomItem } from "@/shared/1loc.com";
import { Pokedex } from "@/shared/pokedex-promise-v2";
import { redirect } from "next/navigation";

export default async () => {
  redirect(
    `/pokemon/${randomItem(
      (await Pokedex.getPokemonsList()).results.map((pokemon) => pokemon.name)
    )}`
  );
};
