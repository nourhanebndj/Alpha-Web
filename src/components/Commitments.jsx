import { useTranslation } from "react-i18next";
import Head from "./Head";
import Icon from "./Icon";
import { COMMITMENT_ICONS } from "../data/content";

export default function Commitments() {
  const { t } = useTranslation();
  return (
    <section className="soft why" id="engagements">
      <div className="wrap pg">
        <div className="l">
          <Head title={t("commitments.title")} text={t("commitments.text")} />
          <a className="btn" href="#contact">
            {t("commitments.cta")}
          </a>
        </div>
        <div className="cms">
          {t("commitments.list", { returnObjects: true }).map((c, i) => (
            <article className="cm rv" key={c.title}>
              <Icon name={COMMITMENT_ICONS[i]} pop />
              <div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
