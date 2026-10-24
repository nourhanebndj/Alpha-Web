
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
  return (
    <section id="contact" className="contact-section">
      <div className="wrap">
        <div className="contact-heading">
          <span className="eyebrow">CONTACT</span>
          <h2>Parlons de votre projet</h2>
          <p>
            Une idée, un site web ou une application à développer ?
            Contactez-nous directement.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-text">
                <strong>E-mail</strong>
                <a href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </div>
              <a
                className="contact-arrow"
                href={`mailto:${CONTACT.email}`}
                aria-label="Envoyer un e-mail"
              >
                <FaArrowUpRightFromSquare />
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <FaWhatsapp />
              </div>
              <div className="contact-text">
                <strong>WhatsApp</strong>
                <small>Écrivez-nous directement</small>
              </div>
              <a
                className="contact-arrow"
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contacter sur WhatsApp"
              >
                <FaArrowUpRightFromSquare />
              </a>
            </div>

            <div className="contact-card social-card">
              <div className="contact-icon">
                <FaLocationDot />
              </div>
              <div className="contact-text">
                <strong>Retrouvez-nous</strong>
                <small>Annaba, Algérie · Réseaux sociaux</small>
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
              Voir notre localisation <FaArrowUpRightFromSquare />
            </a>
          </div>

          <div className="contact-map">
            <iframe
              title="Localisation Alpha Web à Annaba"
              src="https://maps.google.com/maps?q=Annaba%2C%20Algeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
