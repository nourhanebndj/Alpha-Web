import { CONTACT } from "../data/content";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fg">
          <div>
            <a className="logo" style={{ color: "#fff" }} href="#top">
              <img className="lg" src="/logo.png" alt="" width="45" height="36" />
              <span>
                ALPHA <i>WEB</i>
              </span>
            </a>
            <p>Sites web, applications mobiles et logiciels ERP : des solutions adaptées à vos besoins.</p>
          </div>
          <div>
            <h4>Services</h4>
            <a href="#services">Sites web</a>
            <a href="#services">Applications mobiles</a>
            <a href="#services">Logiciels ERP</a>
          </div>
          <div>
            <h4>Agence</h4>
            <a href="#realisations">Réalisations</a>
            <a href="#methode">Méthode</a>
            <a href="#avis">Avis clients</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <p>{CONTACT.phone}</p>
          </div>
        </div>
        <div className="copy">© 2026 Alpha Web. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
