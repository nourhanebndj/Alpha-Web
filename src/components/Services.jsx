import Head from "./Head";
import Icon from "./Icon";
import { SERVICES } from "../data/content";

export default function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <Head title="Tout ce qu’il faut pour réussir en ligne" text="Une seule équipe pour concevoir, développer et promouvoir votre produit digital." />
        <div className="grid3">
          {SERVICES.map((s) => (
            <article className="card rv" key={s.title}>
              <Icon name={s.icon} />
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
