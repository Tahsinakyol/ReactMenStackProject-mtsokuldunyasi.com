import "./NotFound.css";
import Slider from "../components/Layout/Slider/Slider";
const None = () => {
  return (
    <>
      <Slider type={2} header="ANASAYFA / SAYFA BULUNAMADI" />
      <div className="notFount_outher">
        <h1>404</h1>
        <span>Sayfa Bulunamadı</span>
      </div>
    </>
  );
};

export default None;
