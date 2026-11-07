import { useTranslation } from "react-i18next";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
  FaLocationDot,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const CONTACT = {
  email: "contact@alphaweb.dz",
  whatsapp: "https://wa.me/213658934340",
  instagram: "https://www.instagram.com/alpha_web23/",
  facebook: "https://www.facebook.com/profile.php?id=100093267014202",
  tiktok: "https://www.tiktok.com/@alpha.web66?_r=1&_t=ZS-99KC8sF69jA&fbclid=IwY2xjawVKACJleHRuA2FlbQIxMABwZG9mBWJyaWQRMW1oQzNnTWViSXN5TVY1SnJzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeJxiP8MtWvtJKzZXBP2PiY7E6iV9jnk7QazPpk1n2utKbb3hLoy_E2RpUwCE_aem_81JBamDXPYttstvQdYTgsg",
};

export default function Contact() {
  const { t, i18n } = useTranslation();
  return (
    <section id="contact" className="contact-section">
      <div className="wrap">
        <div className="contact-heading rv">
          <span className="eyebrow">{t("contact.eyebrow")}</span>
          <h2>{t("contact.title")}</h2>
          <p>
            {t("contact.text")}
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info rv">
            <div className="contact-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-text">
                <strong>{t("contact.email")}</strong>
                <a href={`mailto:${CONTACT.email}`}>
                  <bdi>{CONTACT.email}</bdi>
                </a>
              </div>
              <a
                className="contact-arrow"
                href={`mailto:${CONTACT.email}`}
                aria-label={t("contact.emailAria")}
              >
                <FaArrowUpRightFromSquare />
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaWhatsapp />
              </div>
              <div className="contact-text">
                <strong>{t("contact.whatsapp")}</strong>
                <small>{t("contact.whatsappNote")}</small>
              </div>
              <a
                className="contact-arrow"
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("contact.whatsappAria")}
              >
                <FaArrowUpRightFromSquare />
              </a>
            </div>

            <div className="contact-card social-card">
              <div className="contact-icon">
                <FaLocationDot />
              </div>
              <div className="contact-text">
                <strong>{t("contact.find")}</strong>
                <small>{t("contact.findNote")}</small>
                <div className="social-links">
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={CONTACT.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <FaTiktok />
                  </a>
                </div>
              </div>
            </div>

            <a
              className="map-link"
              href="https://www.google.com/maps/search/?api=1&query=Annaba%2C+Algeria"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("contact.mapLink")} <FaArrowUpRightFromSquare />
            </a>
          </div>

          <div className="contact-map rv">
            <iframe
              title={t("contact.mapTitle")}
              src={`https://maps.google.com/maps?q=Annaba%2C%20Algeria&t=&z=13&ie=UTF8&iwloc=&output=embed&hl=${i18n.language}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
