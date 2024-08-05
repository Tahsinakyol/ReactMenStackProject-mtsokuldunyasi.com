import { Link } from "react-router-dom";
import NewsCard from "./NewsCard";
import { getAllNews } from "../../../Pages/globalFunctions/globalAPI";
import { useState, useEffect } from "react";
import "./NewsContent.css";

const NewsContent = () => {
  const [api, setApi] = useState([]);

  const _getAllNews = async () => {
    const response = await getAllNews();
    // Verileri en son güncelleme tarihine göre sırala
    response.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setApi(response);
  };

  useEffect(() => {
    _getAllNews();
  }, []);
  // Tarih için dönüşüm işlevi
  const truncateDate = (dateString, maxLength) => {
    return dateString.length > maxLength
      ? dateString.substring(0, maxLength)
      : dateString;
  };
  return (
    <div className="NewsContent_outher">
      <div className="container">
        <div className="header_newsContent">
          <h1>BİZDEN HABERLER, DUYURULAR VE BİLGİLER</h1>
          <Link to={"/NewsPage"} className="clickNewsAll">
            TÜMÜNÜ GÖR
          </Link>
        </div>
        <div className="row">
          {api.slice(0, 4).map((item, index) => (
            <div key={index} className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
              <NewsCard
                imageSrc={item.img}
                date={truncateDate(item.updatedAt, 10)}
                title={item.name}
                intro={item.detail}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
