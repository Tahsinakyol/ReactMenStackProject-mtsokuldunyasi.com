import { useState } from "react";
import { postAllNews } from "../../globalFunctions/globalAPI";
import { useNavigate } from "react-router-dom";
import "./adminnews.css";
import { message } from "antd";
const CreateNews = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    img: null,
    detail: "",
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
    data.append("detail", formData.detail);

    try {
      const response = await postAllNews(data);
      console.log("News created successfully:", response);
      // Optionally, reset the form
      setFormData({
        name: "",
        img: null,
        detail: "",
      });
      setPreviewImage(null);
      message.success("Yükle İşlemi Başarılı");
      navigate(`/admin/news`);
    } catch (err) {
      console.error("Error creating news:", err);
    }
  };

  return (
    <div>
      <h2 className="adminHeader">HABER/DUYURU EKLE</h2>
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
                  src="../../../../public/images/notImage.webp"
                  alt="Placeholder"
                />
              )}
            </label>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <div className="col-6">
              <label htmlFor="name">Haber/Duyuru Başlığı:</label>
              <input
                className="input_uploading"
                type="text"
                id="name"
                name="name"
                placeholder="Konu Başlığını Yazınız"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="detail">İçerik:</label>
              <textarea
                className="uploadingArea"
                id="detail"
                name="detail"
                placeholder="Açıklama Detay Yazınız"
                value={formData.detail}
                onChange={handleInputChange}
              />
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

export default CreateNews;
