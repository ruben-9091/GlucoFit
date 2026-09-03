import PageLayout from "../../../components/layout/page-layout/page-layout";
import videoRecipes from "../../../assets/video-recipes2.mp4";
import { ExerciseCategoryList } from "../../../components/exercises";

function ExerciseCategoryPage() {
  return (
    <PageLayout
      jumbotron={{
        video: videoRecipes,
      }}
    >
      <ExerciseCategoryList />
    </PageLayout>
  );
}

export default ExerciseCategoryPage;
