import "../styles/main.css";
import { OutputBox } from "./OutputBox";

/**
 * Interface to specify the props taken in by REPLHistory.
 * Includes a history which is a list of lists
 */
interface REPLHistoryProps {
  history: [string, string[][] | string, string][];
}

/**
 * The REPL history component maps each entry in the history array to an OutputBox
 * which is used to display the command and data based on the mode at each call.
 */
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map((historyTuple, index) => (
        <OutputBox
          command={historyTuple[0]}
          data={historyTuple[1]}
          mode={historyTuple[2]}
        />
      ))}
    </div>
  );
}
