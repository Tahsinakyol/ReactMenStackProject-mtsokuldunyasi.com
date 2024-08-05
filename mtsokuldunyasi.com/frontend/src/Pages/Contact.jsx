import Slider from "../components/Layout/Slider/Slider";
import "../components/Layout/Contact/Contact.css";
import { useState, useEffect } from "react";
import { getContact } from "./globalFunctions/globalAPI";
const Contact = () => {
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
      <Slider type={2} header="ANASAYFA / İLETİŞİM" />
      <div className="contact_outher">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7">
              <div className="left_contact_outher">
                <h1 className="contactHeader">
                  İLETİŞİMDE SINIRLARI KALDIRIYORUZ!
                </h1>
                <span className="cotact_details">
                  SORULARINIZ, GERİ BİLDİRİMLERİNİZ VEYA İŞ BİRLİĞİ TALEPLERİNİZ
                  İÇİN BİZE ULAŞIN
                </span>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="Form_outher">
                      <span>ADINIZ</span>
                      <input placeholder="Adınızı Yazınız" />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="Form_outher">
                      <span>SOYADINIZ</span>
                      <input placeholder="Soyadınızı Yazınız" />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="Form_outher">
                      <span>E-POSTA ADRESİNİZ</span>
                      <input placeholder="E Posta Adresinizi Yazınız" />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="Form_outher">
                      <span>TELEFON NUMARASI</span>
                      <input placeholder="telefon Numaranızı Yazınız" />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="Form_outher">
                      <span>MESAJINIZ</span>
                      <textarea placeholder="Mesajınızı Yazınız"></textarea>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="Form_outher">
                      <button
                        className="buttonSubmit"
                        type="submit"
                        onClick={() =>
                          alert(
                            "Form Alanı Aktif Değildir ! Lütfen Normal Mail Gönderiniz"
                          )
                        }
                      >
                        MESAJI GÖNDER
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5">
              <iframe
                src={contacted[0]?.googlemap}
                width="100%"
                height="800"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
