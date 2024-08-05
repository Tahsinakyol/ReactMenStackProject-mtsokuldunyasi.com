import "./Footer.css";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { getContact } from "../../../Pages/globalFunctions/globalAPI";
import { useState, useEffect } from "react";
const FooterComponent = () => {
  const [contacted, setContacted] = useState([]);

  const _getContact = async () => {
    const response = await getContact();
    // Verileri en son güncelleme tarihine göre sırala
    response.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setContacted(response);
  };

  useEffect(() => {
    _getContact();
  }, []);
  return (
    <>
      <footer className="footer_outher">
        <div className="container">
          <div className="footer_out_inner">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <img
                  className="logoFooter"
                  src="../../../../public/images/mts_logo.png"
                />
                <span className="footer_inner_detail">
                  {contacted[0]?.footerDetail}
                </span>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-2">
                <p className="footer_linkout_header">SİTE HARİTASI</p>
                <Link to={"/"} className="footer_link" href="">
                  ANASAYFA
                </Link>
                <Link to={"/About"} className="footer_link" href="">
                  HAKKIMIZDA
                </Link>
                {/* <Link to={"/Product"} className="footer_link" href="">
                  ÜRÜNLERİMİZ
                </Link> */}
                <Link to={"/NewsPage"} className="footer_link" href="">
                  HABERLER
                </Link>
                <Link to={"/Contact"} className="footer_link" href="">
                  İLETİŞİM
                </Link>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <p className="footer_linkout_header">İLETİŞİM</p>
                <span className="contantSpan">{contacted[0]?.adress}</span>
                <span
                  className="contantSpan"
                  style={{
                    fontWeight: "900",
                    letterSpacing: 1,
                    marginBottom: 15,
                  }}
                >
                  Mts Emlak ve Mts Okul Dünyası
                </span>
                <div className="contactFooterIcons">
                  <IoMailSharp />
                  {contacted[0]?.mail}
                </div>
                <div className="contactFooterIcons">
                  <FaPhone />
                  {contacted[0]?.phone}
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <p className="footer_linkout_header">BİZİ TAKİP ET</p>
                <div className="footerSocialMedia">
                  <a
                    target="_blank"
                    href={`https://www.instagram.com/${contacted[0]?.instagram}`}
                    className="social_footer_item"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    target="_blank"
                    href={`https://www.facebook.com/${contacted[0]?.facebook}`}
                    className="social_footer_item"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    target="_blank"
                    href={`https://www.twitter.com/${contacted[0]?.twitter}`}
                    className="social_footer_item"
                  >
                    <BsTwitterX />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="designAndSoftware">
        <div className="container">
          <div className="endReserved">
            <span>© Mts OkulDunyasi, Copyright 2024 All Rights Reserved.</span>
            <a
              href="https://www.tahsinakyol.com"
              target="_blank"
              className="endCreate_link"
            >
              <FaCode /> Yazılım ve Tasarım{" "}
              <span style={{ fontWeight: 900 }}>Tahsin Akyol</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterComponent;
