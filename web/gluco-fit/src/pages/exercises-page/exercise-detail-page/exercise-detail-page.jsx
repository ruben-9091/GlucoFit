import PageLayout from "../../../components/layout/page-layout/page-layout";
import { ExerciseDetail } from "../../../components/exercises"; 
import exerciseVideo from "../../../assets/exercise-video.mp4";

function ExerciseDetailPage(){
    return  (
    <PageLayout
      jumbotron={{
        video: exerciseVideo,
      }}
    >
      <ExerciseDetail />
    </PageLayout>
  )
}

export default ExerciseDetailPage; 