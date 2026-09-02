import PageLayout from "../../../components/layout/page-layout/page-layout";
import { RecipesListCategory } from "../../../components/recipes";
import videoRecipes from "../../../assets/video-recipes2.mp4";

function RecipesCategoryPage() {
  return (
    <PageLayout
      jumbotron={{
        video: videoRecipes,
      }}
    >
      <RecipesListCategory />
    </PageLayout>
  );
}

export default RecipesCategoryPage;
