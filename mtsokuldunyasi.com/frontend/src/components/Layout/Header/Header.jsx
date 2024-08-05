import { useEffect, useState } from "react";
import "./Header.css";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { getContact } from "../../../Pages/globalFunctions/globalAPI";
import { FaTimes } from "react-icons/fa";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
    <header className={`header_main ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <div className="header_inner">
          <Link to={"/"}>
            <img
              className="logo_header"
              src={
                isScrolled
                  ? "../../public/images/mts_logo_black.png"
                  : "../../public/images/mts_logo_white.png"
              }
              alt="Logo Yüklenemedi"
            />
          </Link>
          <div className="itemHeader_right">
            <Link to={"/"} className="link_menu_item">
              Anasayfa
            </Link>
            <Link to="/About" className="link_menu_item">
              HAKKIMIZDA
            </Link>
            {/* <Link to={"/Product"} className="link_menu_item">
              ÜRÜNLERİMİZ
            </Link> */}
            <Link to={"/NewsPage"} className="link_menu_item">
              HABERLER
            </Link>
            <Link to={"/Contact"} className="link_menu_item">
              İLETİŞİM
            </Link>
            <a
              target="_blank"
              href={`https://www.instagram.com/${contacted[0]?.instagram}`}
              className="social_headerButtons"
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${contacted[0]?.facebook}`}
              className="social_headerButtons"
            >
              <FaFacebookF />
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${contacted[0]?.twitter}`}
              className="social_headerButtons"
            >
              <BsTwitterX />
            </a>
          </div>
          <button
            className="mobileMenuButtons"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <HiMiniBars3BottomRight size={22} />
          </button>
        </div>
      </div>
      {/* mobile Menu Start */}
      <div
        className="mobileMenu_outher"
        style={{ top: mobileMenu ? "0" : "-100%" }}
      >
        <div className="mobilMenuTopsLine">
          <img
            className="logo_header"
            src="../../../../public/images/mts_logo_black.png"
            alt="Logo Yüklenemedi"
          />
          <button
            style={{ borderColor: "#dadada" }}
            className="mobileMenuButtons"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <FaTimes size={18} style={{ color: "#333" }} />
          </button>
        </div>
        <Link
          to={"/"}
          className="mobile_menuLink"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          Anasayfa
        </Link>
        <Link
          to="/About"
          className="mobile_menuLink"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          HAKKIMIZDA
        </Link>

        <Link
          to={"/NewsPage"}
          className="mobile_menuLink"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          HABERLER
        </Link>
        <Link
          to={"/Contact"}
          className="mobile_menuLink"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          İLETİŞİM
        </Link>
        <div className="inner_socialHeader_mobileMenu">Bizi Takip Edin !</div>
        <div className="socialTopMenuItems">
          <a
            target="_blank"
            href={`https://www.instagram.com/${contacted[0]?.instagram}`}
            className="social_mobileHrefButtons"
          >
            <FaInstagram />
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/${contacted[0]?.facebook}`}
            className="social_mobileHrefButtons"
          >
            <FaFacebookF />
          </a>
          <a
            target="_blank"
            href={`https://www.twitter.com/${contacted[0]?.twitter}`}
            className="social_mobileHrefButtons"
          >
            <BsTwitterX />
          </a>
        </div>
      </div>
      {/* mobile Menu End */}
    </header>
  );
};

export default Header;
