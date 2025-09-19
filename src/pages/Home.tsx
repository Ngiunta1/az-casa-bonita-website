import MainWrapper from "../components/MainWrapper";
import Tagline from "../components/Tagline";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import LiftAnimation from "../components/LiftAnimation";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full justify-around lg:justify-end">
      <div className="flex flex-col h-full justify-evenly items-center lg:justify-between lg:flex-row lg:items-end lg:p-8">
        <div className="w-xs sm:w-md lg:w-lg xl:w-2xl 2xl:w-4xl">
          <LiftAnimation delay={300}>
            <Tagline tagline="The Next Level of Clean for Your Home" />
          </LiftAnimation>
        </div>
        <LiftAnimation delay={300}>
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
