import Slider from "../components/Layout/Slider/Slider";
import "../components/Layout/Product/Product.css";
const Product = () => {
  return (
    <>
      <Slider type={2} header="ANASAYFA / ÜRÜNLERİMİZ" />
      <div className="container">
        <div className="product_outher">
          <h1>Çok Yakında Hizmetinizde ! </h1>
        </div>
      </div>
    </>
  );
};

export default Product;
