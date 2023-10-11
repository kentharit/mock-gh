import "../styles/main.css";
import { OutputBox } from "./OutputBox";

interface REPLHistoryProps {
  history: [string, string[][] | string, string][];
  mode: string;
}
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
