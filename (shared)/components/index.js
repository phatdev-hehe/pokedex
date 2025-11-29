import { chunk, noop } from "@/(shared)/utils";
import { titleCase } from "@/(shared)/utils/title-case";
import { kebabCase } from "change-case";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import isPlainObject from "is-plain-obj";
import Image1 from "next/image";
import { Children, useId } from "react";
import Highlighter from "react-highlight-words";
import removeAccents from "remove-accents";
import romanize from "romanize";

export { default as Link } from "fumadocs-core/link";

export const highlighter = (textToHighlight, ...searchWords) => (
  <Highlighter
    caseSensitive
    highlightTag="code"
    textToHighlight={textToHighlight}
    searchWords={searchWords}
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
                <th key={key}>{titleCase(value)}</th>
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
      (
        items,
        { thead, renderFirstItem = noop, renderItems = noop, showIndex = true }
      ) => {
        if (items && items.length) {
          const chunkSize = 100;

          return tabs(
            ...chunk(items, chunkSize).map((items, index1) => [
              `page ${romanize(index1 + 1)}`,
              table(
                thead,
                items.map((item, index2) => {
                  const context = { context: item };

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
                      {renderFirstItem(context)}
                    </span>,
                    ...(renderItems(context) ?? []),
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
              renderFirstItem: ({ context }) => renderKey(context[0]),
              renderItems: ({ context }) => [
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

export const tabs = (...tabs) => (
  <Tabs updateAnchor items={tabs.map((tab) => titleCase(tab[0]))}>
    {tabs.map((tab) => {
      const id = kebabCase(removeAccents(tab[0]));

      return (
        <Tab
          style={{ overflow: "auto" }}
          id={id}
          value={titleCase(tab[0])}
          key={id}
        >
          {tab[1] ?? <Callout title="No Content" />}
        </Tab>
      );
    })}
  </Tabs>
);

export const ul = (...values) => (
  <ul>
    {values.map((value, index) => (
      <li key={index}>{value}</li>
    ))}
  </ul>
);

export const Audio = (props) => <audio controls {...props} />;

export const Checkbox = ({ checked, children }) => {
  const id = useId();

  return (
    <div
      style={{
        display: "inline-flex",
        gap: "1ch",
      }}
    >
      <input
        id={id}
        disabled={!checked}
        readOnly
        type="checkbox"
        checked={checked}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
};

export const Image = (props) => {
  const id = useId();

  return <Image1 alt={id} {...props} />;
};

export const DescriptionList = ({ term, children }) => (
  <dl>
    <dt>{titleCase(term)}</dt>
    <dd>
      {Children.map(children, (children) => (
        <blockquote style={{ fontWeight: "initial", fontStyle: "initial" }}>
          {children}
        </blockquote>
      ))}
    </dd>
  </dl>
);
