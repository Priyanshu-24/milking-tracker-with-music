import { BrowserRouter, Route, Routes } from "react-router-dom";

import History from "./components/History";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" exact element={<History />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
