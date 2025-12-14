import { noop } from "es-toolkit";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import Balancer from "react-wrap-balancer";

import { Link, table } from "@/components";
import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

import api from "./api";
import createDetailPage from "./create-detail-page";

export const Pokedex = Object.assign(
  ({ children, descriptions = [], ogUrl, renderTitle = noop, title }) => {
    ogUrl ??= getOgUrl({ title });

    const date = new Date();

    return (
      <>
        <meta content="article" property="og:type" />
        <meta content="summary_large_image" property="twitter:card" />
        <meta content={date.toISOString()} property="article:modified_time" />
        <meta content={ogUrl} property="og:image" />
        <meta content={ogUrl} property="twitter:image" />
        <meta content={title} property="og:title" />
        <meta content={title} property="twitter:title" />
        <div
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              "--letter-spacing": "-.09ch",

              position: "sticky",
            }}
          >
            <DocsTitle
              style={{
                letterSpacing: "var(--letter-spacing)",
              }}
            >
              <Balancer>{renderTitle() ?? title}</Balancer>
            </DocsTitle>
            <DocsDescription
              style={{
                display: "flex",
                fontSize: "var(--text-sm)",
                gap: "calc(var(--spacing) * 3)",
                letterSpacing: "var(--letter-spacing)",
                overflowX: "auto",
              }}
            >
              {[
                ...descriptions,
                [
                  "at",
                  <time
                    dateTime={date.toISOString()}
                    title={date.toISOString()}
                  >
                    {date.toLocaleDateString()}
                  </time>,
                ],
              ].map((description, index) => (
                <span key={index}>
                  {titleCase(description[0])}
                  <span
                    style={{
                      color: "var(--color-fd-foreground)",
                      display: "block",
                      textWrap: "nowrap",
                    }}
                  >
                    {description[1]}
                  </span>
                </span>
              ))}
            </DocsDescription>
          </div>
          <DocsBody>{children}</DocsBody>
        </div>
      </>
    );
  },
  {
    api,
    createDetailPage,
    createListPage: async (routeName) => {
      const title = `${titleCase(`list of ${routeName}`)}(s)`;

      const names = (
        await Pokedex.api(routeName, "rootEndpoint")()
      ).results.map((item) => item.name);

      return Object.assign(
        () => (
          <Pokedex
            descriptions={[["count", names.length]]}
            ogUrl={getOgUrl({ title, topic: names.length })}
            title={title}
          >
            {table.pagination(names, {
              renderRows: ({ context }) => [
                <Link href={`/${routeName}/${context}`}>
                  {titleCase(context)}
                </Link>,
              ],
            })}
          </Pokedex>
        ),
        {
          generateMetadata: () => ({ title }),
        }
      );
    },
  }
);
