import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getById, putById } from "../../globalFunctions/globalAPI";
import { message } from "antd";
import "./adminnews.css";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    img: null,
    detail: "",
    originalImg: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  const fetchNews = async (id) => {
    try {
      const news = await getById(id);
      setFormData({
        name: news.name,
        img: null,
        detail: news.detail,
        originalImg: news.img,
      });

      setPreviewImage(news.img ? news.img : null); // Assuming news.img is a complete URL
    } catch (err) {
      console.error("Failed to fetch news by ID:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchNews(id);
    }
  }, [id]);

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
    data.append("detail", formData.detail);

    if (formData.img) {
      data.append("img", formData.img);
    } else {
      data.append("img", formData.originalImg);
    }

    try {
      const response = await putById(id, data);
      console.log("News updated successfully:", response);
      message.success("Güncelleme İşlemi Başarılı");
      navigate(`/admin/news`);
    } catch (err) {
      console.error("Error updating news:", err);
      message.error("Güncelleme İşlemi Başarısız");
    }
  };

  return (
    <div>
      <h2 className="adminHeader">HABER/DUYURU DÜZENLE</h2>
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
                  src={formData.originalImg}
                  alt="Existing"
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
                required
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
                required
              />
              <button className="buttonSubmitting" type="submit">
                Güncelle
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditNews;
