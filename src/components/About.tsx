import { about } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index="01" eyebrow="About" title="Systems first, then the interface on top." />
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="divide-y divide-line rounded-xl border border-line bg-surface/60">
            {about.facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-6 px-5 py-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-faint">{f.label}</dt>
                <dd className="text-right text-sm text-fg">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
