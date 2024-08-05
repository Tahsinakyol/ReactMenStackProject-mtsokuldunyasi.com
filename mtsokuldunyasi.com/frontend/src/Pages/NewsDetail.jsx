import { useLocation } from "react-router-dom";
import Slider from "../components/Layout/Slider/Slider";
import "../components/Layout/NewsContent/NewsContent.css";
const NewsDetail = () => {
  const location = useLocation();
  const { imageSrc, date, title, intro } = location.state || {};

  return (
    <div>
      <Slider type={2} header="ANASAYFA / HABERLER / HABER DETAY" />
      <div className="container">
        <div className="detail_NewsPage">
          {imageSrc && (
            <img className="imagesDetail" src={imageSrc} alt="News Image" />
          )}

          {title && <h1 className="headerNewsDetail_page">{title}</h1>}
          {intro && <span className="detail_page_span">{intro}</span>}
          {date && <div className="date_inDetail">{date}</div>}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
