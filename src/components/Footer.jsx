import { useTranslation } from "react-i18next";
import { CONTACT } from "../data/content";

export default function Footer() {
  const { t } = useTranslation();
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
            <p>{t("hero.text")}</p>
          </div>
          <div>
            <h4>{t("footer.services")}</h4>
            <a href="#services">{t("footer.webSites")}</a>
            <a href="#services">{t("footer.mobileApps")}</a>
            <a href="#services">{t("footer.erp")}</a>
          </div>
          <div>
            <h4>{t("footer.agency")}</h4>
            <a href="#realisations">{t("nav.projects")}</a>
            <a href="#methode">{t("nav.method")}</a>
            <a href="#avis">{t("nav.reviews")}</a>
          </div>
          <div>
            <h4>{t("footer.contact")}</h4>
            <a href={`mailto:${CONTACT.email}`}>
              <bdi>{CONTACT.email}</bdi>
            </a>
            <p>
              <span dir="ltr">{CONTACT.phone}</span>
            </p>
          </div>
        </div>
        <div className="copy">© 2026 Alpha Web. {t("footer.rights")}</div>
      </div>
    </footer>
  );
}
