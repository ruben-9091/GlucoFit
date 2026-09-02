import videoRecipes from "../../../assets/video-recipes2.mp4";

import PageLayout from "../../../components/layout/page-layout/page-layout";
import { AllRecipesController } from "../../../components/recipes";

export function RecipesPage() {
  return (
    <PageLayout
      jumbotron={{
        video: videoRecipes,
      }}
    >
      <AllRecipesController />
    </PageLayout>
  );
}

export default RecipesPage;
