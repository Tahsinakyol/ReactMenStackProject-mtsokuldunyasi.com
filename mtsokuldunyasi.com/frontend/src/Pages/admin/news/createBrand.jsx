import { useState } from "react";
import { postAllBrand } from "../../globalFunctions/globalAPI";
import { useNavigate } from "react-router-dom";
import "./adminnews.css";
import { message } from "antd";

const CreateBrand = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    img: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, img: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("img", formData.img);

    try {
      const response = await postAllBrand(data);
      console.log("Brand created successfully:", response);
      setFormData({
        name: "",
        img: null,
      });
      setPreviewImage(null);
      message.success("Yükleme İşlemi Başarılı");
      navigate(`/admin/brand`);
    } catch (err) {
      console.error("Error creating brand:", err.response?.data || err.message);
      message.error("Yükleme İşleminde Hata Oluştu");
    }
  };

  return (
    <div>
      <h2 className="adminHeader">MARKA EKLE</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <label htmlFor="img" className="inner_imageAdmin">
              <input
                style={{ display: "none" }}
                type="file"
                id="img"
                name="img"
                onChange={handleFileChange}
              />
              {previewImage ? (
                <img
                  className="imageInnderNot"
                  src={previewImage}
                  alt="Preview"
                />
              ) : (
                <img
                  className="imageInnderNot"
                  src="/images/notImage.webp"
                  alt="Placeholder"
                />
              )}
            </label>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <div className="col-6">
              <label htmlFor="name">Marka Adı:</label>
              <input
                className="input_uploading"
                type="text"
                id="name"
                name="name"
                placeholder="Marka adını yazınız"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <button className="buttonSubmitting" type="submit">
                Ekle
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateBrand;
