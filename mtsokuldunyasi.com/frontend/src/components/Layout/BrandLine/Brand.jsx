import { useState, useEffect } from "react";
import "./Brand.css";
import Slider from "react-slick";
import { getAllBrand } from "../../../Pages/globalFunctions/globalAPI";

const Brand = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerMode: true,
          centerPadding: "0px",
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  const [api, setApi] = useState([]);

  const _getAllBrand = async () => {
    const response = await getAllBrand();
    setApi(response);
  };

  useEffect(() => {
    _getAllBrand();
  }, []);

  return (
    <div className="brand_outher">
      <div className="container">
        <div className="header_brand">İş Ortaklarımız</div>
        <div className="slider-container">
          <Slider {...settings}>
            {api.map((item, index) => (
              <div className="slider_Item" key={index}>
                <img className="sliderImages" src={item.img} alt={item.name} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Brand;
