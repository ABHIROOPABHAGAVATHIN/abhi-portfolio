import { Award, GraduationCap, ScrollText } from "lucide-react";
import { achievements, certifications, education } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

const card = "rounded-xl border border-line bg-surface/60 p-5 transition hover:border-line-strong";

export function Credentials() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading
        index="05"
        eyebrow="Education & recognition"
        title="Foundations and credentials."
      />
      <div className="grid gap-10 lg:grid-cols-3">
        <Reveal>
          <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-faint">
            <GraduationCap size={14} aria-hidden="true" /> Education
          </h3>
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e.school} className={card}>
                <p className="font-mono text-xs text-accent">{e.period}</p>
                <p className="mt-2 font-medium">{e.degree}</p>
                <p className="text-sm text-muted">{e.school}</p>
                <p className="mt-3 text-sm text-fg">{e.score}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-faint">
            <ScrollText size={14} aria-hidden="true" /> Certifications
          </h3>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.title} className={card}>
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-muted">{c.issuer}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.16}>
          <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-faint">
            <Award size={14} aria-hidden="true" /> Publication & activity
          </h3>
          <ul className="space-y-3">
            {achievements.map((a) => (
              <li key={a.title} className={card}>
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-muted">{a.org}</p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted">{a.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
