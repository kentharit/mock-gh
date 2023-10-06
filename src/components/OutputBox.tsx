import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

// Remember that parameter names don't necessarily need to overlap;
// I could use different variable names in the actual function.
interface OutputBoxProps {
  command: string;
  data: string[][] | string;
  mode: string;
}

// Input boxes contain state. We want to make sure React is managing that state,
//   so we have a special component that wraps the input box.
export function OutputBox({ command, data, mode }: OutputBoxProps) {
  //   return mode === "brief" ? <p> {command} </p> : <p> no command </p>;
  if (mode === "brief") {
    if (Array.isArray(data)) {
      // Check if data is a list of list of strings (string[][])
      // If so, generate an HTML table
      return (
        <table>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      return <p> {data} </p>;
    }
  } else {
    if (Array.isArray(data)) {
      return (
        <div>
          <p> Command: {command} </p>
          <p> Output: </p>
          <table>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <p> Command: {command} </p>
          <p> Output: {data} </p>
        </div>
      );
    }
  }
}
