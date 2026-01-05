import { NextResponse } from "next/server";

import { feed } from "@/lib/pokedex-promise-v2/feed";

export const GET = () => NextResponse.json(JSON.parse(feed.json1()));
