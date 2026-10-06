import { skills } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index="04" eyebrow="Tech stack" title="Tools I build with." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={(i % 4) * 0.05}>
            <div className="h-full rounded-xl border border-line bg-surface/60 p-5 transition hover:border-line-strong">
              <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-bg px-2.5 py-1 text-[13px] text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
