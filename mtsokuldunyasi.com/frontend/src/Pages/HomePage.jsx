import { useState, useEffect } from "react";
import Slider from "../components/Layout/Slider/Slider";
import { SliderSecond } from "../components/Layout/sliderSecond/SliderSecond";
import { ImageContent } from "../components/Layout/ImageContent/ImageContent";
import { Social } from "../components/Layout/Socail/Social";
import NewsContent from "../components/Layout/NewsContent/NewsContent";
import Brand from "../components/Layout/BrandLine/Brand";
import { getHomePage } from "./globalFunctions/globalAPI";

const HomePage = () => {
  const [api, setApi] = useState();

  const _getHomePage = async () => {
    const response = await getHomePage();
    setApi(response[0].header);
  };

  useEffect(() => {
    _getHomePage();
  }, []);
  return (
    <>
      <Slider header={api} />
      <SliderSecond />
      <ImageContent />
      <Social />
      <NewsContent />
      <Brand />
    </>
  );
};

export default HomePage;
