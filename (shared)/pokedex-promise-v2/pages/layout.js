import { Link } from "@/(shared)/components";
import { noop } from "@/(shared)/utils";
import { titleCase } from "@/(shared)/utils/title-case";
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
  description,
  children,
  nextHref,
  previousHref,
  nextTitle,
  previousTitle,
  renderTitle = noop,
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
            {description}
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
            <span
              style={{
                display: "flex",
                gap: ".5ch",
                alignSelf: "end",
              }}
            >
              {previousHref && (
                <Link title={titleCase(previousTitle)} href={previousHref}>
                  Previous
                </Link>
              )}
              {nextHref && (
                <Link title={titleCase(nextTitle)} href={nextHref}>
                  Next
                </Link>
              )}
            </span>
          </DocsDescription>
        </div>
        <DocsBody>{children}</DocsBody>
      </div>
    </>
  );
};
