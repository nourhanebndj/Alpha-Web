import { useTranslation } from "react-i18next";
import Head from "./Head";
import { PROJECTS } from "../data/content";

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section id="realisations">
      <div className="wrap">
        <Head title={t("projects.title")} text={t("projects.text")} />

        <div className="work">
          {t("projects.list", { returnObjects: true }).map((p, i) => (
            <article className="pj rv" key={p.title}>
              <div className="th">
                <img className="project-image" src={PROJECTS[i].image} alt={p.alt} width="1200" height="600" loading="lazy" />
              </div>

              <small>{p.kind}</small>
              <h3>
                <bdi>{p.title}</bdi>
              </h3>
              <p>{p.text}</p>
              <a className="project-link" href={PROJECTS[i].url} target="_blank" rel="noopener noreferrer">
                {t("projects.visit")}
                <span aria-hidden="true"> ↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
