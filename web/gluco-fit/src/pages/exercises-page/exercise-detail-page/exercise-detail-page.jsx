import PageLayout from "../../../components/layout/page-layout/page-layout";
import { ExerciseDetail } from "../../../components/exercises"; 
import videoRecipes from "../../../assets/video-recipes2.mp4";

function ExerciseDetailPage(){
    return  (
    <PageLayout
      jumbotron={{
        video: videoRecipes,
      }}
    >
      <ExerciseDetail />
    </PageLayout>
  )
}

export default ExerciseDetailPage; 