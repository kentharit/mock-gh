import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import all_data from "../mocked-data/mockedJson";

var data = all_data["data"];
var searchData = all_data["search_data"];

/**
 * Interface to specify the props taken in by REPL input. 
 * Includes a history which is a list of lists, and a setter function for it.
 * Also includes mode which is a string a sets the mode of the program. 
 */
interface REPLInputProps {
  history: [string, string[][] | string, string][];
  setHistory: Dispatch<SetStateAction<[string, string | string[][], string][]>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

/**
 * REPL input class’s main role is to manage all the inputs that are passed through
 * the text box. We will initially count how many times the submit button is pressed.
 * Then we will allow the user to input mode in the textbox. When mode is initially
 * called, it will be in a brief mode, and if the user types in mode again, it will
 * go to verbose state. There are also other functionalities like view command, and
 * the success message will be returned when the file is in the correct CSV format.
 * Finally, the last command we have is search where we will use “JSON.stringfy”
 * method to find the value the user hopes to search and will look for it inside
 * the loaded CSV file. All the errors are caught as we will be looking for cases
 * that have no file found, inputting wrong value for search results, calling
 * search before loading, or passing through random message inside the tool bar.
 * @param props
 * @returns
 */
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // Manages the current amount of times the button is clicked
  const [count, setCount] = useState<number>(0);

  const [loadedFilepath, setloadedFilepath] = useState<string>("");

  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

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
      } else {
        output = "Wrong number of arguments for mode command";
      }
    } else if (command == "load_file") {
      if (splitted.length == 2) {
        var filepath = splitted[1];
        if (filepath in data) {
          output = "File successfully loaded";
          console.log(filepath);
          setloadedFilepath(filepath);
          setHasLoaded(true);
        } else {
          output = "File not found in directory";
        }
      } else {
        output = "Wrong number of arguments for load command";
      }
    } else if (command == "view") {
      if (hasLoaded) {
        if (splitted.length == 1) {
          output =
            loadedFilepath in data
              ? data[loadedFilepath]
              : "File not found in directory";
        } else {
          output = "Wrong number of arguments for view command";
        }
      } else {
        output = "Cannot call view before load";
      }
    } else if (command == "search") {
      if (hasLoaded) {
        if (splitted.length == 3) {
          var column = splitted[1];
          var value = splitted[2];
          var key = [column, value];

          if (loadedFilepath in searchData) {
            var filepath_commands = searchData[loadedFilepath];
            output =
              JSON.stringify(key) in filepath_commands
                ? filepath_commands[JSON.stringify(key)]
                : "Command does not exist in mocked search data";
          } else {
            output = "File not found in directory";
          }
        } else {
          output = "Wrong number of arguments for search command";
        }
      } else {
        output = "Cannot call search before load";
      }
    } else {
      output = "Not a valid command";
    }

    if (typeof output == "undefined") {
      output = "Not a valid command";
    }

    props.setHistory([...props.history, [commandString, output, props.mode]]);

    setCount(count + 1);

    setCommandString("");
  }
  /**
   * The REPL input component makes use of the ControlledInput component along with a button.
   */
  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
