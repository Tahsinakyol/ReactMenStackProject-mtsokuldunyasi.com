import { useState, useEffect } from "react";
import { getHomePage, putHomePage } from "../globalFunctions/globalAPI";
import { message } from "antd";
import "./admin.css";
const AdminIndex = () => {
  const [header, setHeader] = useState("");
  const [secondHeader, setSecondHeader] = useState("");
  const [secondDetail, setSecondDetail] = useState("");
  const [secondBottom, setSecondBottom] = useState("");
  const _getHomePage = async () => {
    try {
      const response = await getHomePage();
      setHeader(response[0].header);
      setSecondHeader(response[0].secondHeader);
      setSecondDetail(response[0].secondDetail);
      setSecondBottom(response[0].secondBottom);
    } catch (error) {
      console.error("Error fetching home page data:", error);
    }
  };

  const _putHomePage = async () => {
    try {
      await putHomePage({
        header,
        secondHeader,
        secondDetail,
        secondBottom,
      });
    } catch (error) {
      console.error("Error updating home page data:", error);
    }
  };

  useEffect(() => {
    _getHomePage();
  }, []);

  const handleHeaderChange = (event) => {
    setHeader(event.target.value);
  };

  const handleSecondHeaderChange = (event) => {
    setSecondHeader(event.target.value);
  };

  const handleSecondDetailChange = (event) => {
    setSecondDetail(event.target.value);
  };

  const handleSecondBottomChange = (event) => {
    setSecondBottom(event.target.value);
  };

  const handleSave = async () => {
    if (header && secondHeader && secondDetail && secondBottom) {
      await _putHomePage();
      message.success("Güncelleme İşlemi Başarılı");
    } else {
      message.error("Tüm Alanlar Zorunludur !");
    }
  };

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <label className="label_admin">Video Text</label>
        <input
          className="input_admin"
          value={header}
          onChange={handleHeaderChange}
          placeholder="Header"
          required
        />
        <label className="label_admin">Ana Sayfa Mavi Alan Başlık</label>
        <input
          className="input_admin"
          value={secondHeader}
          onChange={handleSecondHeaderChange}
          placeholder="Second Header"
          required
        />
        <label className="label_admin">Ana Sayfa Mavi Alan İçerik</label>
        <input
          className="input_admin"
          value={secondBottom}
          onChange={handleSecondBottomChange}
          placeholder="Second Bottom"
          required
        />
      </div>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <label className="label_admin">Ana Sayfa Mavi Alan Kayar Yazı</label>
        <textarea
          className="admin_area"
          value={secondDetail}
          onChange={handleSecondDetailChange}
          placeholder="Second Detail"
          required
        />
      </div>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
        <button className="admin_button" onClick={handleSave}>
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default AdminIndex;
