import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Components/Login";
import { Punchin } from "./Components/Punchin";
import { H1 } from "./Components/Components";

function App() {
  return (
    <div className="App">
      <H1>Punchin</H1>
      <Login />
      <Punchin />
    </div>
  );
}

export default App;