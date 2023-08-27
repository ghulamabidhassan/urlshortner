import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Params from "./Params";
import Shared from "./Shared";
import Home from "./Home";
import Stats from "./Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shared />}>
          <Route index element={<Home />} />
          <Route path="stats" element={<Stats />} />
        </Route>
        <Route path="/r/:id" element={<Params />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
