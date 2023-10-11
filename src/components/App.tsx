import "../styles/App.css";
import REPL from "./REPL";

/**
 * This is the highest-level component and will represent the entire front-end.
 */
function App() {
  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
      </p>
      <REPL />
    </div>
  );
}

export default App;
