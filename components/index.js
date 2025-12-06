import { chunk, noop } from "@/utils";
import { titleCase } from "@/utils/title-case";
import { kebabCase } from "change-case";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import isPlainObject from "is-plain-obj";
import { useId } from "react";
import Highlighter from "react-highlight-words";
import Balancer from "react-wrap-balancer";
import removeAccents from "remove-accents";
import romanize from "romanize";

export { default as Link } from "fumadocs-core/link";

const formatId = (value) => kebabCase(removeAccents(value));

export const highlighter = (textToHighlight, ...searchWords) => (
  <Highlighter
    highlightStyle={{
      backgroundColor: "var(--color-fd-accent)",
      color: "var(--color-fd-accent-foreground)",
      letterSpacing: "-0.05ch",
    }}
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
      (items, { thead, renderRows = noop, showIndex = true }) => {
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

export const tabs = (...tabs) => (
  <Tabs updateAnchor items={tabs.map((tab) => titleCase(tab[0]))}>
    {tabs.map((tab) => {
      const id = formatId(tab[0]);

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

export const accordions = (...accordions) => (
  <Accordions>
    {accordions.map((accordion) => {
      const id = formatId(accordion[0]);

      return (
        <Accordion key={id} id={id} title={titleCase(accordion[0])}>
          {accordion[1]}
        </Accordion>
      );
    })}
  </Accordions>
);

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

export const descriptionList = (term, ...descriptions) => (
  <dl>
    <dt>{titleCase(term)}</dt>
    <dd>
      {descriptions.map((description, index) => (
        <blockquote
          key={index}
          style={{
            fontWeight: "initial",
            fontStyle: "initial",
          }}
        >
          <Balancer>{description}</Balancer>
        </blockquote>
      ))}
    </dd>
  </dl>
);
