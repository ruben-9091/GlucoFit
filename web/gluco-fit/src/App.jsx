import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/ui";
import { GlucosePage, GlucoseRegister, HomePage } from "./pages";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/glucose" element={<GlucosePage/>} />
        <Route path="/registro" element={<GlucoseRegister/>} />
      </Routes>
    </>
  );
}

export default App;
