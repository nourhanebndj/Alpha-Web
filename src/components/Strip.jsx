
import { TECHS } from "../data/content";

export default function Strip() {
  return (
    <div className="strip">
      <div className="strip-track">
        {[0, 1].map((group) => (
          <div
            className="strip-group"
            key={group}
            aria-hidden={group === 1 ? "true" : undefined}
          >
            {TECHS.map(({ name, icon: Logo }) => (
              <span className="strip-item" key={name} title={name}>
                <Logo aria-hidden="true" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
