import convert from "convert";
import { compact } from "es-toolkit";
import Highlighter from "react-highlight-words";

import { LazyImage } from "@/components/lazy-image";
import { Link } from "@/components/link";

export const audio = (src) => <audio controls src={src} />;

export const highlighter = (textToHighlight, ...searchWords) => (
  <Highlighter
    caseSensitive
    highlightStyle={{
      backgroundColor: "var(--color-fd-accent)",
      color: "var(--color-fd-accent-foreground)",
      letterSpacing: "-0.05ch",
    }}
    highlightTag="code"
    searchWords={searchWords}
    textToHighlight={textToHighlight}
  />
);

export const unnamedLink = (href) => {
  if (href) {
    const [a, b] = compact(new URL(href).pathname.split("/")).slice(-2);

    href = `/${a}/${a}-${b}`;

    return <Link href={href}>{href}</Link>;
  }
};

export const Avatar = ({ style, ...props }) => (
  <LazyImage
    style={{ maxWidth: "calc(var(--text-base) * 6)", ...style }}
    {...props}
  />
);

export const unit = (quantity, from, to = "best") => (
  <span title={`${quantity} ${from}`}>
    {convert(quantity, from).to(to).toString(1)}
  </span>
);

export const descriptionList = (term, ...descriptions) => (
  <dl>
    <dt>{term}</dt>
    <dd>
      {descriptions.map((description, index) => (
        <blockquote
          key={index}
          style={{
            fontStyle: "unset",
            fontWeight: "unset",
          }}
        >
          {description}
        </blockquote>
      ))}
    </dd>
  </dl>
);
