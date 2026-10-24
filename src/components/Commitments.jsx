import Head from "./Head";
import Icon from "./Icon";
import { COMMITMENTS } from "../data/content";

export default function Commitments() {
  return (
    <section className="soft why" id="engagements">
      <div className="wrap pg">
        <div className="l">
          <Head title="Un partenaire qui s’engage à vos côtés" text="Nous travaillons comme une extension de votre équipe, du premier échange jusqu’après la livraison." />
          <a className="btn" href="#contact">
            Parler de votre projet
          </a>
        </div>
        <div className="cms">
          {COMMITMENTS.map((c) => (
            <article className="cm rv" key={c.title}>
              <Icon name={c.icon} pop />
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
