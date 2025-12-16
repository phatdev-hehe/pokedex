import { kebabCase } from "change-case";
import convert from "convert";
import { chunk, flow, isPlainObject, noop } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Fragment, useId } from "react";
import Highlighter from "react-highlight-words";
import removeAccents from "remove-accents";
import romanize from "romanize";

import { InViewClientOnly } from "@/components/in-view";
import { titleCase } from "@/utils/title-case";

export { default as Link } from "fumadocs-core/link";

const formatId = flow(removeAccents, kebabCase);

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

export const table = Object.assign(
  (thead = [], tbody = thead, tfoot) => {
    if (thead.length || tbody.length)
      return (
        <InViewClientOnly>
          <table>
            <thead>
              <tr>
                {thead.map((value, index) => (
                  <th key={index}>{titleCase(value)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tbody.map((value, index) => (
                <tr key={index}>
                  {value.map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>{tfoot}</tfoot>
          </table>
        </InViewClientOnly>
      );
  },
  {
    pagination: Object.assign(
      (items, { renderRows = noop, showIndex = true, thead }) => {
        if (items && items.length) {
          const chunkSize = 100;

          return tabs(
            Object.fromEntries(
              chunk(items, chunkSize).map((items, index1) => [
                `page ${romanize(index1 + 1)}`,
                table(
                  thead,
                  items.map((context, index2) => {
                    const [firstRow, ...rows] = renderRows({ context });

                    return [
                      <span>
                        {showIndex && (
                          <span
                            style={{
                              color: "var(--color-fd-muted-foreground)",
                            }}
                          >
                            {index1 * chunkSize + index2 + 1}
                            {". "}
                          </span>
                        )}
                        {firstRow}
                      </span>,
                      ...rows,
                    ];
                  })
                ),
              ])
            )
          );
        }
      },
      {
        fromObject: (object, { renderKey, renderValue }) => {
          if (isPlainObject(object))
            return table.pagination(Object.entries(object), {
              renderRows: ({ context }) => [
                renderKey(context[0]),
                table.pagination.fromObject(context[1], {
                  renderKey,
                  renderValue,
                }),
              ],
            });

          return renderValue(object);
        },
      }
    ),
  }
);

export const tabs = (tabs = {}) => {
  if (Object.keys(tabs).length)
    return (
      <InViewClientOnly>
        <Tabs items={Object.keys(tabs).map(titleCase)} updateAnchor>
          {Object.entries(tabs).map((tab) => {
            const id = formatId(tab[0]);

            return (
              <Tab
                id={id}
                key={id}
                style={{ overflow: "auto" }}
                value={titleCase(tab[0])}
              >
                <InViewClientOnly>{tab[1] ?? noContent()}</InViewClientOnly>
              </Tab>
            );
          })}
        </Tabs>
      </InViewClientOnly>
    );
};

export const ul = (...items) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

export const audio = (src) => <audio controls src={src} />;

export const Checkbox = ({ checked, children }) => {
  const id = useId();

  return (
    <div
      style={{
        display: "inline-flex",
        gap: "var(--spacing)",
      }}
    >
      <input
        checked={checked}
        disabled={!checked}
        id={id}
        readOnly
        type="checkbox"
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export const unit = (quantity, from, to = "best") => (
  <span title={`${quantity} ${from}`}>
    {convert(quantity, from).to(to).toString(1)}
  </span>
);

export const noContent = () => <Callout title="No Content" />;

export const inlineList = (...items) =>
  items.map((item, index) => (
    <Fragment key={index}>
      {item}
      {index < items.length - 2 && ", "}
      {index === items.length - 2 && " and "}
    </Fragment>
  ));

export const descriptionList = (term, ...descriptions) => (
  <dl>
    <dt>{term}</dt>
    <dd>
      {descriptions.map((description, index) => (
        <blockquote
          key={index}
          style={{
            fontStyle: "initial",
            fontWeight: "initial",
          }}
        >
          {description}
        </blockquote>
      ))}
    </dd>
  </dl>
);
