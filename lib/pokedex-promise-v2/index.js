import { noop } from "es-toolkit";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import Balancer from "react-wrap-balancer";

import { Checkbox, list, table } from "@/components";
import { Link } from "@/components/link";
import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

import api from "./api";
import defineDetailPage from "./define-detail-page";

const date = new Date();

export const Pokedex = Object.assign(
  ({ canonical, children, descriptions, ogUrl, renderTitle = noop, title }) => {
    if (canonical) {
      ogUrl ??= getOgUrl({ title });

      return (
        <>
          <title>{title}</title>
          <link
            href={`${process.env.NEXT_PUBLIC_SITE_URL}${canonical}`}
            rel="canonical"
          />
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
                {Object.entries({
                  ...descriptions,
                  at: (
                    <time
                      dateTime={date.toISOString()}
                      title={date.toISOString()}
                    >
                      {date.toLocaleDateString()}
                    </time>
                  ),
                }).map((description, index) => (
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
    }
  },
  {
    api,
    date,
    defineDetailPage,
    defineListPage: async (routeName) => {
      const title = `${titleCase(`list of ${routeName}`)}(s)`;
      const items = await api(routeName, "rootEndpoint")();
      const names = items.results.map((item) => item.name);

      return () => (
        <Pokedex
          canonical={`/${routeName}`}
          descriptions={{
            count: items.count,
            unnamed: <Checkbox checked={items.isUnnamed} />,
            // eslint-disable-next-line perfectionist/sort-objects
            links: list.inline(
              <Link href={`/random/${routeName}`}>Random</Link>
            ),
          }}
          ogUrl={getOgUrl({ title, topic: items.count })}
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
      );
    },
  }
);
