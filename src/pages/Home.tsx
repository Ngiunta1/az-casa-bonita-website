import MainWrapper from "../components/MainWrapper";
import Tagline from "../components/Tagline";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import LiftAnimation from "../components/LiftAnimation";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 content-center" />
      <div className="flex justify-between items-end p-8">
        <LiftAnimation delay={600}>
          <Tagline tagline="The Next Level of Clean for Your Home" />
        </LiftAnimation>
        <LiftAnimation delay={600}>
          <Button
            text="Book Now"
            backgroundColor="primary"
            icon="src\assets\icons\go-arrow.png"
            onClick={() => navigate("/contact")}
          />
        </LiftAnimation>
      </div>
    </div>
  );
};

export default Home;
