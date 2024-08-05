import "./ImageContent.css";
import { getStars } from "../../../Pages/globalFunctions/globalAPI";
import { useState, useEffect } from "react";

export const ImageContent = () => {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const _getStars = async () => {
    try {
      let response = await getStars();
      setApi(response);
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      console.error(err);
      setError(err); // Set error state if API call fails
      setLoading(false); // Set loading to false if there is an error
    }
  };

  useEffect(() => {
    _getStars();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  if (error) {
    return <div>Error loading data</div>; // Render error state
  }

  return (
    <div className="ImageContent_outher">
      <div className="container">
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8">
          <div className="ImageContent_header">{api[0]?.header}</div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
            <div className="images_top">
              <img
                className="imageContent_inner_Images"
                src={api[0]?.img}
                alt="Resim Görüntülenemiyor"
              />
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-8">
            <div className="right_menu">
              <h1>{api[0]?.secondHeader}</h1>
              <span>{api[0]?.detail}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
