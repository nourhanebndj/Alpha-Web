import { useState } from "react";
import { CONTACT, PROJECT_TYPES } from "../data/content";

export default function Contact() {
  const [status, setStatus] = useState("");

  // Ouvre la messagerie du visiteur avec la demande pré-remplie
  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Nom : ${f.get("n")}\nEmail : ${f.get("e")}\nProjet : ${f.get("t")}\n\n${f.get("m")}`;
    window.location.href =
      `mailto:${CONTACT.email}?subject=` +
      encodeURIComponent("Demande de devis – " + f.get("t")) +
      "&body=" +
      encodeURIComponent(body);
    setStatus("Merci ! Votre messagerie s’ouvre pour envoyer la demande.");
  };

  return (
    <section id="contact" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="cta-band f rv">
          <div>
            <h2>Prêt à lancer votre prochain projet ?</h2>
            <p>Décrivez-nous votre idée. Nous vous répondons sous 24 h avec un audit et un devis gratuits.</p>
          </div>
          <form className="fm" onSubmit={onSubmit}>
            <input name="n" placeholder="Votre nom" aria-label="Votre nom" required />
            <input name="e" type="email" placeholder="Votre email" aria-label="Votre email" required />
            <select name="t" aria-label="Type de projet">
              {PROJECT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <textarea name="m" placeholder="Parlez-nous de votre projet" aria-label="Votre message" required />
            <button className="btn gold" type="submit">
              Envoyer ma demande
            </button>
            <p id="ok" role="status">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
