import "./sliderSecond.css";
import { getHomePage } from "../../../Pages/globalFunctions/globalAPI";
import { useState, useEffect } from "react";
export const SliderSecond = () => {
  const [secondHeader, setSecondHeader] = useState();
  const [secondDetail, setSecondDetail] = useState();
  const [secondBottom, setSecondBottom] = useState();

  const _getHomePage = async () => {
    const response = await getHomePage();
    setSecondHeader(response[0].secondHeader);
    setSecondDetail(response[0].secondDetail);
    setSecondBottom(response[0].secondBottom);
  };

  useEffect(() => {
    _getHomePage();
  }, []);
  return (
    <div className="homepage_line_contents_outer ">
      <div className="dots-1 dots"></div>
      <div className="dots-2 dots"></div>
      <div className="dots-3 dots"></div>
      <div className="container">
        <div className="homepage_line_contents_inner">
          <h1>{secondHeader}</h1>
          <span>{secondDetail}</span>
        </div>
      </div>
      <div className="slider_box_outher">
        <div className="homepage_line_slider_box">{secondBottom}</div>
      </div>
    </div>
  );
};
