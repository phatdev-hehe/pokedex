import { noop } from "es-toolkit";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import Balancer from "react-wrap-balancer";

import { getOgUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

import api from "./api";
import defineDetailPage from "./define-detail-page";

const date = new Date();

export const Pokedex = Object.assign(
  ({
    canonical,
    children,
    descriptions,
    favicon,
    ogUrl,
    renderTitle = noop,
    title,
  }) => {
    if (canonical) {
      ogUrl ??= getOgUrl({ title });

      return (
        <>
          <title>{title}</title>
          {favicon && <link href={favicon} rel="icon" />}
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
  }
);
