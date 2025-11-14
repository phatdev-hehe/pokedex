import { DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";

const LastUpdate = () => {
  const date = new Date();

  return (
    <span>
      Last updated on{" "}
      <time
        style={{ color: "var(--color-fd-foreground)" }}
        dateTime={date.toISOString()}
      >
        {date.toLocaleDateString()}
      </time>
    </span>
  );
};

export default ({ top, title, description, children }) => {
  return (
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
          {title}
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
          <LastUpdate />
        </DocsDescription>
      </div>
      <DocsBody>{children}</DocsBody>
    </div>
  );
};
