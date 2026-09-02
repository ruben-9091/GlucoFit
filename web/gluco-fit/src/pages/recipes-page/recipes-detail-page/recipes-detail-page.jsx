import PageLayout from "../../../components/layout/page-layout/page-layout";
import { RecipeDetail } from "../../../components/recipes/index";
import videoRecipes from "../../../assets/video-recipes2.mp4";

function RecipesDetailPage(){
    return  (
    <PageLayout
      jumbotron={{
        video: videoRecipes,
      }}
    >
      <RecipeDetail />
    </PageLayout>
  )
}

export default RecipesDetailPage; 


