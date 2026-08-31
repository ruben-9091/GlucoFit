import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/ui";
import { GlucosePage, GlucoseRegister, HomePage, LoginPage, RegisterPage } from "./pages";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/glucose" element={<GlucosePage/>} />
        <Route path="/glucose/registro" element={<GlucoseRegister/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        
      </Routes>
    </>
  );
}

export default App;
