import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * Interface to specify the props taken in by OutputBox.
 * Includes a command string and data which can either be a list of list or a string.
 * Also includes mode which is a string a sets the mode of the program.
 */
interface OutputBoxProps {
  command: string;
  data: string[][] | string;
  mode: string;
}

/**
 * The output box displays differently based on what mode the user hopes to be part of.
 * In the “brief” output, it will just display the result of running the command.
 * In the verbose mode, it will display both the command text and the result of running the command.
 * @param OutputBoxProps: contains the command, data, and mode corresponding to each command call.
 * @returns div that contains a table and text or only text depending on mode and command.
 */
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
