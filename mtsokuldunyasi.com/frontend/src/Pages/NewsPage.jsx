import { useState, useEffect } from "react";
import { getAllNews } from "./globalFunctions/globalAPI";
import NewsCard from "../components/Layout/NewsContent/NewsCard";
import Slider from "../components/Layout/Slider/Slider";
import Brand from "../components/Layout/BrandLine/Brand";
import "../components/Layout/NewsContent/NewsContent.css";
import { PiEmpty } from "react-icons/pi";
const NewsPage = () => {
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
    <>
      <Slider type={2} header="ANASAYFA / HABERLER" />
      <div
        style={{
          width: "100%",
          minHeight: "80vh",
          paddingTop: 25,
          paddingBottom: 25,
        }}
      >
        <div className="container">
          <div className="header_newsContent">
            <h1>BİZDEN HABERLER, DUYURULAR VE BİLGİLER</h1>
          </div>
          <div className="row">
            {api.length != "" ? (
              <>
                {api.map((item, index) => (
                  <div
                    key={index}
                    className="col-xs-12 col-sm-12 col-md-6 col-lg-3"
                  >
                    <NewsCard
                      imageSrc={item.img}
                      date={truncateDate(item.updatedAt, 10)}
                      title={item.name}
                      intro={item.detail}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 15,
                  }}
                >
                  <PiEmpty size={62} />
                  <span style={{ fontSize: "2rem" }}>
                    Henüz Paylaşılan Bir Duyuru Yok !
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Brand />
    </>
  );
};

export default NewsPage;
