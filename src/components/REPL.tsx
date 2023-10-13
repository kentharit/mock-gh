import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * In REPL, we are trying to add some kind of shared state that holds all the commands submitted.
 * This class is also where our REPLHistory and REPLInput goes.
 */

export default function REPL() {
  const [history, setHistory] = useState<
    [string, string[][] | string, string][]
  >([]);
  const [mode, setMode] = useState<string>("brief");

  return (
    <div className="repl">
      <REPLHistory history={history} />
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
}
