import { noop } from "@/(shared)/utils";
import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";

const Meta = ({ title, date }) => {
  const image = `https://nextjs.org/api/docs-og?title=${title}`;

  return (
    <>
      <meta property="article:modified_time" content={date.toISOString()} />
      <meta property="og:image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:title" content={title} />
    </>
  );
};

export default ({
  top = 0,
  title,
  description1,
  children,
  renderTitle = noop,
  description2,
}) => {
  const date = new Date();

  return (
    <>
      <Meta title={title} date={date} />
      <div
        style={{
          "--sticky-offset": "1rem",
          "--letter-spacing": "-.09ch",

          position: "relative",
          top: `${top}rem`,
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "var(--sticky-offset)",
          }}
        >
          <DocsTitle style={{ letterSpacing: "var(--letter-spacing)" }}>
            {renderTitle() ?? title}
          </DocsTitle>
          <DocsDescription
            style={{
              letterSpacing: "var(--letter-spacing)",
              display: "flex",
              flexDirection: "column",
              fontSize: "medium",
            }}
          >
            {description1}
            <span>
              Last updated on{" "}
              <time
                style={{ color: "var(--color-fd-foreground)" }}
                dateTime={date.toISOString()}
                title={date.toISOString()}
              >
                {date.toLocaleDateString()}
              </time>
            </span>
            {description2}
          </DocsDescription>
        </div>
        <DocsBody>{children}</DocsBody>
      </div>
    </>
  );
};
