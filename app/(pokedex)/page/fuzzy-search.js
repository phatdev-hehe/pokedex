"use client";

import { useDebounce } from "@uidotdev/usehooks";
import { mapValues } from "es-toolkit";
import Fuse from "fuse.js";
import { Activity, useDeferredValue, useMemo, useState } from "react";

import { table } from "@/components";
import { Link } from "@/components/link";
import { tabs } from "@/components/tabs";
import { useIsClient } from "@/hooks";
import { Pokedex } from "@/lib/pokedex-promise-v2";
import { titleCase } from "@/utils/title-case";

const list = [];

for (const [routeGroup, routes] of Object.entries(Pokedex.api.routeGroups))
  for (const [route, { rootEndpoint }] of Object.entries(routes))
    for (const item of (await Pokedex.api[rootEndpoint]()).results)
      list.push({
        name: item.name,
        route,
        routeGroup,
      });

const fuse = new Fuse(list, {
  keys: [
    {
      name: "name",
      weight: 0.4,
    },
    {
      name: "route",
      weight: 0.3,
    },
    {
      name: "routeGroup",
      weight: 0.3,
    },
  ],
});

const fallback = tabs(
  mapValues(Pokedex.api.routeGroups, (routes) =>
    tabs(
      mapValues(routes, async ({ rootEndpoint }, route) =>
        table.pagination((await Pokedex.api[rootEndpoint]()).results, {
          renderRows: ({ context }) => [
            <Link href={`/${route}/${context.name}`}>
              {titleCase(context.name)}
            </Link>,
          ],
        })
      )
    )
  )
);

export default () => {
  const [state, setState] = useState("");
  const debouncedState = useDebounce(state, 300);
  const deferredState = useDeferredValue(debouncedState);
  const isClient = useIsClient();

  const fuseResult = useMemo(() => {
    if (deferredState) return fuse.search(deferredState);

    return [];
  }, [deferredState]);

  return (
    <>
      <Activity mode={isClient ? "visible" : "hidden"}>
        <div style={{ display: "inline-flex" }}>
          <input
            onChange={(event) => {
              setState(event.target.value);
            }}
            placeholder="Fuzzy Search"
            style={{
              border: "1px solid var(--color-fd-border)",
              borderRadius: "var(--radius-sm)",
              marginInline: "calc(var(--spacing) * 2)",
              paddingInline: "calc(var(--spacing) * 2)",
            }}
            type="search"
            value={state}
          />
          <span
            style={{
              color: "var(--color-fd-muted-foreground)",
              fontSize: "var(--text-sm)",
            }}
          >
            {fuseResult.length} item(s)
          </span>
        </div>
      </Activity>
      <Activity mode={deferredState ? "hidden" : "visible"}>
        {fallback}
      </Activity>
      <Activity mode={deferredState ? "visible" : "hidden"}>
        {tabs(
          mapValues(
            fuseResult.reduce((a, b) => {
              ((a[b.item.routeGroup] ??= {})[b.item.route] ??= []).push(
                b.item.name
              );

              return a;
            }, {}),
            (value) =>
              tabs(
                mapValues(value, (value, route) =>
                  table.pagination(value, {
                    renderRows: ({ context }) => [
                      <Link href={`/${route}/${context}`}>
                        {titleCase(context)}
                      </Link>,
                    ],
                  })
                )
              )
          )
        )}
      </Activity>
    </>
  );
};
