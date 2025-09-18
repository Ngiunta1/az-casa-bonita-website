import MainWrapper from "../components/MainWrapper";
import Tagline from "../components/Tagline";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 content-center" />
      <Tagline tagline="The Next Level of Clean for Your Home" />
      <Button
        text="Book Now"
        backgroundColor="primary"
        icon="src\assets\icons\go-arrow.png"
      />
    </div>
  );
};

export default Home;
