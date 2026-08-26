import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/ui";
import { GlucosePage, HomePage } from "./pages";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/glucose" element={<GlucosePage/>} />
      </Routes>
    </>
  );
}

export default App;
