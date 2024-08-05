import "./AboutDetail.css";
import { FaLocationPin } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import {
  getAbout,
  getAllAboutList,
  getContact,
} from "../../../Pages/globalFunctions/globalAPI";
const AboutDetail = () => {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const _getAbout = async () => {
    try {
      let response = await getAbout();
      setApi(response);
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      console.error(err);
      setError(err); // Set error state if API call fails
      setLoading(false); // Set loading to false if there is an error
    }
  };
  const [point, setPoint] = useState([]);
  const _getAllAboutList = async () => {
    try {
      let response = await getAllAboutList();
      setPoint(response);
    } catch (err) {
      console.error(err);
      setError(err); // Set error state if API call fails
    }
  };
  const [contacted, setContacted] = useState([]);

  const _getContact = async () => {
    const response = await getContact();
    // Verileri en son güncelleme tarihine göre sırala
    response.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setContacted(response);
  };
  useEffect(() => {
    _getAbout();
    _getAllAboutList();
    _getContact();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render loading state
  }

  if (error) {
    return <div>Error loading data</div>; // Render error state
  }
  return (
    <section className="about_outher">
      <div className="container">
        <div className="inner_about">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
              <img className="image_left" src={api[0]?.img} />
              <div className="leftTopText">{api[0]?.secondHeader}</div>
              <div className="header_about_cotact">Bize Ulaşın</div>
              <div className="social_rows">
                <FaLocationPin />
                {contacted[0]?.adress}
              </div>

              <div className="social_rows">
                <FaPhone />
                {contacted[0]?.phone}
              </div>
              <div className="social_rows">
                <IoMailSharp />
                {contacted[0]?.mail}
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
              <div className="rightGenerate">
                <h1>{api[0]?.header}</h1>
                <span>{api[0]?.detail}</span>
              </div>
              {point.map((item, index) => (
                <div className="rightGenerate" key={index}>
                  <h1 style={{ fontSize: "1.3rem" }}>
                    {index + 1} - {item.name}
                  </h1>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDetail;
