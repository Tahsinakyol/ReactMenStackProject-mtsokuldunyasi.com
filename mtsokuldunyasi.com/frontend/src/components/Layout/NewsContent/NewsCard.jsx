import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./NewsContent.css";

const NewsCard = ({ imageSrc, date, title, intro }) => {
  return (
    <Link
      to="/NewsDetail"
      state={{ imageSrc, date, title, intro }}
      className="card_News_outher"
    >
      <img className="imageCard" src={imageSrc} alt="Resim Görüntülenemiyor" />
      <div className="dateCard">{date}</div>
      <div className="topHeaderGeneric">
        <div className="single-line">{title}</div>
      </div>
      <div className="introCard">{intro}</div>
    </Link>
  );
};

NewsCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  intro: PropTypes.string.isRequired,
};

export default NewsCard;
