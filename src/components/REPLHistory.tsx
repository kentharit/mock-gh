import "../styles/main.css";
import { OutputBox } from "./OutputBox";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED
  history: [string, string[][] | string][];
  mode: string;
}
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {/* CHANGED */}
      {props.history.map((historyTuple, index) => (
        <OutputBox
          command={historyTuple[0]}
          data={historyTuple[1]}
          mode={props.mode}
        />
      ))}
    </div>
  );
}
