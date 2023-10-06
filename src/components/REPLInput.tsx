import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

var filepaths = {}

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  // CHANGED
  history: [string, string[][] | string][];
  setHistory: Dispatch<SetStateAction<[string, string | string[][]][]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Manages the current amount of times the button is clicked
  const [count, setCount] = useState<number>(0);

  const [loadedFilepath, setloadedFilepath] = useState<string>("");

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    var splitted = commandString.split(" ");
    var command = splitted[0];
    var output;

    if (command == "mode") {
      if (splitted.length == 1) {
        props.mode === "brief"
          ? props.setMode("verbose")
          : props.setMode("brief");
        output = "Successfully changed mode";
      }
      else {
        output = "Wrong number of arguments for mode";
      }
    } else if (command == "load_file") {
      if (splitted.length == 2) {
        var filepath = splitted[1]
        if (filepath in filepaths) {

        } 
      }
    } else if (command == "view") {
      output = [
        ["1123123", "2123123123123"],
        ["3123", "4123213213"],
      ];
    } else if (command == "search") {
    } else {
      output = "Not a valid command";
    }

    if (typeof output == "undefined") {
      output = "Not a valid command";
    }

    props.setHistory([...props.history, [command, output]]);

    setCount(count + 1);

    setCommandString("");
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
      <table className="center-table">
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
        <tr>
          <td>Data 1, Row 1</td>
          <td>Data 2, Row 1</td>
        </tr>
        <tr>
          <td>Data 1, Row 2</td>
          <td>Data 2, Row 2</td>
        </tr>
      </table>
    </div>
  );
}
