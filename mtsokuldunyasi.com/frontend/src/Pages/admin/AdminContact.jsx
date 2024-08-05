import "./admin.css";
import { useState, useEffect } from "react";
import { getContact, putContact } from "../globalFunctions/globalAPI";
import { message } from "antd";

const AdminContact = () => {
  const [, setApi] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    phone: "",
    mail: "",
    adress: "",
    instagram: "",
    facebook: "",
    twitter: "",
    googlemap: "",
    footerDetail: "",
  });

  const _getContact = async () => {
    try {
      let response = await getContact();
      setApi(response);
      if (response.length > 0) {
        setFormData({
          id: response[0]._id,
          phone: response[0].phone,
          mail: response[0].mail,
          adress: response[0].adress,
          instagram: response[0].instagram,
          facebook: response[0].facebook,
          twitter: response[0].twitter,
          googlemap: response[0].googlemap,
          footerDetail: response[0].footerDetail,
        });
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await putContact(formData);
      message.success("Güncelleme İşlemi Başarılı");
      _getContact();
    } catch (error) {
      console.error("Error updating contact:", error);
      message.error("Güncelleme İşlemi Başarısız");
    }
  };

  useEffect(() => {
    _getContact();
  }, []);

  return (
    <div className="admin-contact-container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <label className="label_admin">Telefon Numarası</label>
          <input
            className="input_admin"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <label className="label_admin">E-posta Adresi</label>
          <input
            className="input_admin"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
          />
          <label className="label_admin">Google Map(Harita Linki)</label>
          <textarea
            className="admin_area"
            name="googlemap"
            value={formData.googlemap}
            onChange={handleChange}
          />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <label className="label_admin">Adres</label>
          <textarea
            className="admin_area"
            name="adress"
            value={formData.adress}
            onChange={handleChange}
          />
          <label className="label_admin">Footer Açıklama</label>
          <textarea
            className="admin_area"
            name="footerDetail"
            value={formData.footerDetail}
            onChange={handleChange}
          />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
          <label className="label_admin">
            İnstagram Linki(www.instagram.com/
            <span style={{ color: "red" }}>bu alanı Yazınız</span>)
          </label>
          <input
            className="input_admin"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
          <label className="label_admin">
            Facebook Linki(www.facebook.com/
            <span style={{ color: "red" }}>bu alanı Yazınız</span>)
          </label>
          <input
            className="input_admin"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
          <label className="label_admin">
            Twitter Linki(www.twitter.com/
            <span style={{ color: "red" }}>bu alanı Yazınız</span>)
          </label>
          <input
            className="input_admin"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
          />
        </div>

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <button className="admin_button" onClick={handleSubmit}>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
