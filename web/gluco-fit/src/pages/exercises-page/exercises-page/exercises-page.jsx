import videoRecipes from "../../../assets/video-recipes2.mp4";
import { AllExercisesController } from "../../../components/exercises";

import PageLayout from "../../../components/layout/page-layout/page-layout";

export function ExercisesPage() {
  return (
    <PageLayout
      jumbotron={{
        video: videoRecipes,
      }}
    >
      <AllExercisesController />
    </PageLayout>
  );
}

export default ExercisesPage;
