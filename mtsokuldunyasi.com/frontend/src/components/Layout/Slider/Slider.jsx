import "./slider.css";
import PropTypes from "prop-types";
const Slider = ({ type = 1, header }) => {
  return (
    <div className={type == 1 ? "slider_outher" : "slider_outher_sup"}>
      <video
        className="slider_video"
        src="../public/images/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      ></video>
      <div className="slider_inner">
        <div className="container">
          <div className="slider_detail">
            {type == 1 ? (
              <>
                <h1>MTS OKUL DÜNYASI®</h1>
                <p>{header}</p>
              </>
            ) : (
              <>
                <div className="typeSecondHeader">MTS OKUL DÜNYASI®</div>
                <div className="secondHeader">{header}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slider;
Slider.propTypes = {
  type: PropTypes.number,
  header: PropTypes.string,
};
