interface Skill { name: string; years: number }

interface Props {
  skills: Skill[];
  yearsLabel: string;
  otherSkills: string[];
  techStackLabel: string;
  techStackSub: string;
}

const MAX = 5;

export function RightStack({ skills, yearsLabel, otherSkills, techStackLabel, techStackSub }: Props) {
  return (
    <div style={{ padding: "28px 20px" }}>
      <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: "var(--md-on-surface-variant)", marginBottom: 4 }}>
        {techStackLabel}
      </p>
      <p style={{ fontSize: 11, color: "var(--md-outline)", marginBottom: 20, lineHeight: "16px" }}>
        {techStackSub}
      </p>

      {/* Skill bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {skills.map((skill) => (
          <div key={skill.name}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--md-on-surface)" }}>{skill.name}</span>
              <span style={{ fontSize: 11, color: "var(--md-outline)" }}>{skill.years}{yearsLabel[0]}</span>
            </div>
            <div style={{ height: 3, borderRadius: 2, background: "var(--md-outline-variant)" }}>
              <div style={{
                height: 3, borderRadius: 2,
                background: "linear-gradient(90deg,var(--md-primary),var(--md-on-primary-container))",
                width: `${(skill.years / MAX) * 100}%`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--md-outline-variant)", marginBottom: 20 }} />

      {/* Other skills chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {otherSkills.map((s) => (
          <span key={s} style={{
            fontSize: 11, fontWeight: 500, padding: "3px 8px", borderRadius: 6,
            border: "1px solid var(--md-outline-variant)",
            color: "var(--md-on-surface-variant)", whiteSpace: "nowrap",
          }}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
