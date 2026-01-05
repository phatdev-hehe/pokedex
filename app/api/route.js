import { NextResponse } from "next/server";

import { Pokedex } from "@/lib/pokedex-promise-v2";

export const dynamic = "force-dynamic";
export const GET = () => NextResponse.json(Pokedex.api.routes);
