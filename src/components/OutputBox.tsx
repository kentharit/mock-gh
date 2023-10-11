import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * Input boxes contain state, and we hope React to constantly manage that state. 
The output box displays differently based on what mode the user hopes to be part of.
In the “brief” output, it will just display the result of running the command. 
In the verbose mode, it will display both the command text and the result of 
running the command.  
 */
interface OutputBoxProps {
  command: string;
  data: string[][] | string;
  mode: string;
}

export function OutputBox({ command, data, mode }: OutputBoxProps) {
  if (mode === "brief") {
    if (Array.isArray(data)) {
      return (
        <div className="bordered-div">
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
        <div className="bordered-div">
          <p> {data} </p>
        </div>
      );
    }
  } else {
    if (Array.isArray(data)) {
      return (
        <div className="bordered-div">
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
        <div className="bordered-div">
          <p> Command: {command} </p>
          <p> Output: {data} </p>
        </div>
      );
    }
  }
}
