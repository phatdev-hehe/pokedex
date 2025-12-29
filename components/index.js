import { kebabCase } from "change-case";
import { chunk, flow, isPlainObject, noop } from "es-toolkit";
import { Callout } from "fumadocs-ui/components/callout";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Fragment } from "react";
import removeAccents from "remove-accents";
import romanize from "romanize";

import { PrerenderInView } from "@/components/in-view";
import { titleCase } from "@/utils/title-case";

const toId = flow(removeAccents, kebabCase);

export const table = Object.assign(
  (thead = [], tbody = [], tfoot) => {
    if (thead.length || tbody.length)
      return (
        <PrerenderInView>
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
        </PrerenderInView>
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
      <PrerenderInView>
        <Tabs
          items={Object.keys(tabs).map(titleCase)}
          style={{
            backgroundColor: "unset",
            border: "unset",
          }}
          updateAnchor
        >
          {Object.entries(tabs).map((tab) => {
            const id = toId(tab[0]);

            return (
              <Tab
                id={id}
                key={id}
                style={{
                  backgroundColor: "unset",
                  overflow: "auto",
                  paddingInline: "unset",
                }}
                value={titleCase(tab[0])}
              >
                <PrerenderInView>{tab[1] ?? noContent()}</PrerenderInView>
              </Tab>
            );
          })}
        </Tabs>
      </PrerenderInView>
    );
};

export const list = Object.assign(
  (...items) => (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  ),
  {
    inline: (...items) =>
      items.map((item, index) => {
        const penultimateIndex = items.length - 2;

        return (
          <Fragment key={index}>
            {item}
            {index < penultimateIndex && ", "}
            {index === penultimateIndex && " and "}
          </Fragment>
        );
      }),
  }
);

export const noContent = () => <Callout title="No Content" />;
