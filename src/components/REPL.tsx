import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";

/**
 * In REPL, we are trying to add some kind of shared state that holds all the commands submitted. 
 * This class is also where our REPL history goes. 
 */

export default function REPL() {
  const [history, setHistory] = useState<
    [string, string[][] | string, string][]
  >([]);
  const [mode, setMode] = useState<string>("brief");
  const [hasHeader, setHasHeader] = useState<boolean>(true);

  return (
    <div className="repl">
      <REPLHistory history={history} mode={mode} />
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
