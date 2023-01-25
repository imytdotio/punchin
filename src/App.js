import logo from "./logo.svg";
import "./App.css";
import { Auth } from "./Components/Auth";
import { Account } from "./Components/Account";
import { H1 } from "./Components/Components";

function App() {
  return (
    <div className="App">
      <H1>Punchin</H1>
      <Auth />
      {/* <Account /> */}
    </div>
  );
}

export default App;
