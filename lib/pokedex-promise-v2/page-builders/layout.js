import { noop } from "@/utils";
import { titleCase } from "@/utils/title-case";
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
  children,
  renderTitle = noop,
  descriptions = [],
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
              fontSize: "var(--text-sm)",
              display: "flex",
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
                    display: "block",
                    color: "var(--color-fd-foreground)",
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
