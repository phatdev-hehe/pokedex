import { kebabCase } from "change-case";
import convert from "convert";
import { chunk, flow, identity, isPlainObject, noop } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { isValidElement, useId } from "react";
import Highlighter from "react-highlight-words";
import removeAccents from "remove-accents";
import romanize from "romanize";

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
        <table>
          <thead>
            <tr>
              {thead.map((value, key) => (
                <th key={key}>
                  {(isValidElement(value) ? identity : titleCase)(value)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbody.map((value, key) => (
              <tr key={key}>
                {value.map((value, key) => (
                  <td key={key}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>{tfoot}</tfoot>
        </table>
      );
  },
  {
    pagination: Object.assign(
      (items, { renderRows = noop, showIndex = true, thead }) => {
        if (items && items.length) {
          const chunkSize = 100;

          return tabs(
            ...chunk(items, chunkSize).map((items, index1) => [
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

export const tabs = (...tabs) => {
  if (tabs.length)
    return (
      <Tabs items={tabs.map((tab) => titleCase(tab[0]))} updateAnchor>
        {tabs.map((tab) => {
          const id = formatId(tab[0]);

          return (
            <Tab
              id={id}
              key={id}
              style={{ overflow: "auto" }}
              value={titleCase(tab[0])}
            >
              {tab[1] ?? noContent()}
            </Tab>
          );
        })}
      </Tabs>
    );
};

export const ul = (...values) => (
  <ul>
    {values.map((value, index) => (
      <li key={index}>{value}</li>
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
