import { GlucoseForm } from "../../components/glucose/index";
import PageLayout from "../../components/layout/page-layout/page-layout";
import registerMobile from "../../assets/registro-image.png";
import { Link } from "react-router-dom";
import homePageIcon from "../../assets/homepage-icon2.png";

function GlucoseRegister() {
  return (
    <PageLayout>
      <div className="container py-4">
        <h1 className="text-center">
          <img
            src={registerMobile}
            alt="registro-mobile"
            style={{
              maxWidth: "600px",
              height: "auto",
            }}
          />
        </h1>
        

        {/* Formulario para crear nuevo registro */}
        <GlucoseForm />
        <Link to="/" className="d-block mx-auto text-center m-4">
          <img
            src={homePageIcon}
            alt="homepage-icon"
            style={{
              maxWidth: "135px",
              height: "auto",
            }}
          />
        </Link>
      </div>
    </PageLayout>
  );
}

export default GlucoseRegister;
