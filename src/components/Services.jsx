import { useTranslation } from "react-i18next";
import Head from "./Head";
import Icon from "./Icon";
import { SERVICE_ICONS } from "../data/content";

export default function Services() {
  const { t } = useTranslation();
  return (
    <section id="services">
      <div className="wrap">
        <Head title={t("services.title")} text={t("services.text")} />
        <div className="grid3">
          {t("services.list", { returnObjects: true }).map((s, i) => (
            <article className="card rv" key={s.title}>
              <Icon name={SERVICE_ICONS[i]} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
