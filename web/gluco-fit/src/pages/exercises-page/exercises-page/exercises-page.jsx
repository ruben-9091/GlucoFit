import exerciseVideo from "../../../assets/exercise-video.mp4";
import { AllExercisesController } from "../../../components/exercises";

import PageLayout from "../../../components/layout/page-layout/page-layout";

export function ExercisesPage() {
  return (
    <PageLayout
      jumbotron={{
        video: exerciseVideo,
      }}
    >
      <AllExercisesController />
    </PageLayout>
  );
}

export default ExercisesPage;
