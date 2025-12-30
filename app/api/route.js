import { NextResponse } from "next/server";

import { Pokedex } from "@/lib/pokedex-promise-v2";

export const revalidate = 0;

export const GET = () => NextResponse.json(Pokedex.api.routeNames);
