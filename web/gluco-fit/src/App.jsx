import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/ui";
import { ExerciseCategoryPage, ExerciseDetailPage, ExercisesPage, GlucosePage, GlucoseRegister, HomePage, LoginPage, RecipesCategoryPage, RecipesDetailPage, RecipesPage, RegisterPage } from "./pages";

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
        <Route path="/recipes" element={<RecipesPage/>}/>
        <Route path="/recipes/:categoria" element={<RecipesCategoryPage/>}/>
        <Route path="/recipes/:categoria/:id" element={<RecipesDetailPage/>}/>
        <Route path="/exercises" element={<ExercisesPage/>}/>
        <Route path="/exercises/:categoria" element={<ExerciseCategoryPage/>}/>
        <Route path="/exercises/:categoria/:id" element={<ExerciseDetailPage/>}/>
        
      </Routes>
    </>
  );
}

export default App;
