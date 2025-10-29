import MainWrapper from "../components/MainWrapper";
import Tagline from "../components/Tagline";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { Animate } from "../components/Animate";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center justify-around lg:justify-end"
      style={{
        backgroundImage: "url(src/assets/images/clean-living-room.png)",
      }}
    >
      <div className="flex flex-col h-full justify-evenly items-center lg:justify-between lg:flex-row lg:items-end lg:p-20">
        <Animate mount={{ variant: "fadeUp" }} hover={{ variant: "lift" }}>
          <div className="w-xs sm:w-md lg:w-lg xl:w-2xl 2xl:w-4xl cursor-pointer">
            <Tagline
              className="text-white text-center lg:text-left"
              tagline="The Next Level of Clean for Your Home"
              onClick={() => navigate("/about")}
            />
          </div>
        </Animate>
        <Animate mount={{ variant: "fadeUp" }} hover={{ variant: "lift" }}>
          <Button
            text="Book Now"
            backgroundColor="primary"
            icon="src\assets\icons\go-arrow.png"
            onClick={() => navigate("/contact")}
            data-animate="lift"
          />
        </Animate>
      </div>
    </div>
  );
};

export default Home;
