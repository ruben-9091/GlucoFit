import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/ui";
import { HomePage } from "./pages";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
