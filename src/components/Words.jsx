import { Fragment } from "react";

// Découpe un texte en mots (masqués par overflow) pour l'animation d'apparition.
export default function Words({ text }) {
  const words = text.split(" ");
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className="w">
        <span className="wi">{w}</span>
      </span>
      {i < words.length - 1 && " "}
    </Fragment>
  ));
}
