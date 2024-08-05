import AboutDetail from "../components/Layout/About/AboutDetail";
import Slider from "../components/Layout/Slider/Slider";
import { Social } from "../components/Layout/Socail/Social";

const About = () => {
  return (
    <>
      <Slider type={2} header="ANASAYFA / HAKKIMIZDA" />
      <AboutDetail />
      <Social />
    </>
  );
};

export default About;
