import { noop } from "es-toolkit";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import Balancer from "react-wrap-balancer";

import { getOpengraphUrl } from "@/utils";
import { titleCase } from "@/utils/title-case";

const Meta = ({ date, title }) => {
  const imageUrl = getOpengraphUrl({ title });

  return (
    <>
      <meta content={date.toISOString()} property="article:modified_time" />
      <meta content={imageUrl} property="og:image" />
      <meta content={title} property="og:title" />
      <meta content="article" property="og:type" />

      <meta content="summary_large_image" property="twitter:card" />
      <meta content={imageUrl} property="twitter:image" />
      <meta content={title} property="twitter:title" />
    </>
  );
};

export default ({ children, descriptions = [], renderTitle = noop, title }) => {
  const date = new Date();

  return (
    <>
      <Meta date={date} title={title} />
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
                <time dateTime={date.toISOString()} title={date.toISOString()}>
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
};
