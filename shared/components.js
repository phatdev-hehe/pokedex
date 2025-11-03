import Image1 from "next/image";
import { Children, useId } from "react";

export const table = (thead, tbody, tfoot) => (
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

export const Audio = (props) => <audio controls {...props} />;

export const Checkbox = ({ checked }) => (
  <input disabled={!checked} readOnly type="checkbox" checked={checked} />
);

export const Image = (props) => {
  const id = useId();

  return <Image1 loading="eager" alt={id} {...props} />;
};

export const DescriptionList = ({ term, children }) => (
  <dl>
    <dt>{term}</dt>
    <blockquote style={{ fontWeight: "initial" }}>
      {Children.map(children, (children) => (
        <dd>{children}</dd>
      ))}
    </blockquote>
  </dl>
);
