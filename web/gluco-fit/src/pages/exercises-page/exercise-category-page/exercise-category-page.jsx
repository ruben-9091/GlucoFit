import PageLayout from "../../../components/layout/page-layout/page-layout";
import exerciseVideo from "../../../assets/exercise-video.mp4";
import { ExerciseCategoryList } from "../../../components/exercises";

function ExerciseCategoryPage() {
  return (
    <PageLayout
      jumbotron={{
        video: exerciseVideo,
      }}
    >
      <ExerciseCategoryList />
    </PageLayout>
  );
}

export default ExerciseCategoryPage;
