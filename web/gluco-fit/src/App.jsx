import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/ui";
import { ExerciseCategoryPage, ExerciseDetailPage, ExercisesPage, GlucosePage, GlucoseRegister, HomePage, LoginPage, RecipesCategoryPage, RecipesDetailPage, RecipesPage, RegisterPage } from "./pages";
import PrivateRoute from "./guards/private-route";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/glucose" element={<PrivateRoute><GlucosePage/></PrivateRoute>} />
        <Route path="/glucose/registro" element={<PrivateRoute><GlucoseRegister/></PrivateRoute>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/recipes" element={<PrivateRoute><RecipesPage/></PrivateRoute>}/>
        <Route path="/recipes/:categoria" element={<PrivateRoute><RecipesCategoryPage/></PrivateRoute>}/>
        <Route path="/recipes/:categoria/:id" element={<PrivateRoute><RecipesDetailPage/></PrivateRoute>}/>
        <Route path="/exercises" element={<PrivateRoute><ExercisesPage/></PrivateRoute>}/>
        <Route path="/exercises/:categoria" element={<PrivateRoute><ExerciseCategoryPage/></PrivateRoute>}/>
        <Route path="/exercises/:categoria/:id" element={<PrivateRoute><ExerciseDetailPage/></PrivateRoute>}/>
        
      </Routes>
    </>
  );
}

export default App;
