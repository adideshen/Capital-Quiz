// @ts-nocheck
import "./App.css";
import { Board } from "./Board";

const data = [
  {country: "Israel" , capital: "Jerusalem"},
  {country: "France", capital: "Paris"},
  {country: "England", capital: "London"},
  {country: "Italy", capital: "Rome"},
  {country: "Spain", capital: "Madrid"},
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board data={data}></Board>
      </header>
    </div>
  );
}

export default App;
