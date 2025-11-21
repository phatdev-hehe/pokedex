import { createSearchAPI } from "fumadocs-core/search/server";
import indexes from "./indexes.json";

export const { GET } = createSearchAPI("simple", { indexes });
