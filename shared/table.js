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
