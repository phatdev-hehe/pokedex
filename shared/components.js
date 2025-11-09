import { titleCase } from "@/shared/utils";
import { kebabCase } from "change-case";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import isPlainObject from "is-plain-obj";
import Image1 from "next/image";
import { Children, useId } from "react";
import removeAccents from "remove-accents";

export const table = Object.assign(
  (thead = [], tbody = thead, tfoot) => {
    if (thead.length || tbody.length)
      return (
        <table>
          <thead>
            <tr>
              {thead.map((value, key) => (
                <th key={key}>{value}</th>
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
    fromObject: (
      thead, // ??
      tbody,
      formatKey = JSON.stringify,
      formatValue = JSON.stringify
    ) => {
      if (isPlainObject(tbody))
        return table(
          thead,
          Object.entries(tbody).map(([key, value], index) => [
            formatKey(key),
            table.fromObject(thead, value, formatKey, formatValue),
          ])
        );

      return formatValue(tbody);
    },
  }
);

export const tabs = (items, tabs) => (
  <Tabs updateAnchor items={items.map(titleCase)}>
    {tabs.map((tab, index) => {
      const item = items[index];
      const id = kebabCase(removeAccents(item));

      return (
        <Tab id={id} value={titleCase(item)} key={id}>
          {tab}
        </Tab>
      );
    })}
  </Tabs>
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

  return <Image1 loading="eager" alt={id} {...props} />;
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
