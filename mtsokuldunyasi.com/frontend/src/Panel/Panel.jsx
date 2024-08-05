import "./Panel.css";
import Slider from "../components/Layout/Slider/Slider";
import { useState } from "react";
import { message } from "antd";
const Panel = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Giriş Başarılı");
        window.location.href = "/admin/index";
      } else {
        message.error("Bilgileri Kontrol Ediniz");
      }
    } catch (error) {
      message.error("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };
  return (
    <>
      <Slider type={2} header="ANASAYFA / GİRİŞ YAP" />
      <div className="login-container">
        <div className="login-box">
          <img
            style={{
              width: "70%",
              height: "auto",
              objectFit: "contain",
              marginBottom: 15,
            }}
            src="../../public/images/mts_logo_black.png"
          />

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="E Posta Adresi"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Şifre"
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Panel;
