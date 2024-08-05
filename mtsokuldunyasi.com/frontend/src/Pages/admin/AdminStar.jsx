import "./admin.css";
import { useState, useEffect } from "react";
import { getStars, putStars } from "../globalFunctions/globalAPI";
import { message } from "antd";
const AdminStar = () => {
  const [, setApi] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    header: "",
    secondHeader: "",
    detail: "",
    img: "",
  });

  const _getStars = async () => {
    let response = await getStars();
    setApi(response);
    if (response.length > 0) {
      setFormData({
        id: response[0]._id,
        header: response[0].header,
        secondHeader: response[0].secondHeader,
        detail: response[0].detail,
        img: response[0].img,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("header", formData.header);
    formDataToSend.append("secondHeader", formData.secondHeader);
    formDataToSend.append("detail", formData.detail);
    if (formData.img instanceof File) {
      formDataToSend.append("img", formData.img);
    } else {
      formDataToSend.append("img", formData.img);
    }

    try {
      await putStars(formDataToSend);
      message.success("Güncelleme İşlemi Başarılı");
      _getStars();
    } catch (error) {
      console.error("Error updating star:", error);
      message.error("Güncelleme İşlemi Başarısız");
    }
  };

  useEffect(() => {
    _getStars();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <label className="label_admin">Sol Resim</label>
          {formData.img && (
            <img
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                marginBottom: 15,
              }}
              src={
                formData.img instanceof File
                  ? URL.createObjectURL(formData.img)
                  : formData.img
              }
              alt="resim görüntülenemiyor"
            />
          )}
          <input
            type="file"
            style={{ marginBottom: 15 }}
            onChange={handleImageChange}
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <label className="label_admin">Üst Başlık</label>
          <input
            className="input_admin"
            name="header"
            value={formData.header}
            onChange={handleChange}
          />
          <label className="label_admin">Alt Başlık</label>
          <input
            className="input_admin"
            name="secondHeader"
            value={formData.secondHeader}
            onChange={handleChange}
          />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <label className="label_admin">Açıklama</label>
          <textarea
            className="admin_area"
            name="detail"
            value={formData.detail}
            onChange={handleChange}
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <button className="admin_button" onClick={handleSubmit}>
            Kaydet
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminStar;
