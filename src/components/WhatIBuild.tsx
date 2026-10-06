import { whatIBuild } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function WhatIBuild() {
  return (
    <section id="build" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index="07" eyebrow="What I build" title="Where my work tends to land." />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {whatIBuild.map((w, i) => (
          <Reveal key={w.number} delay={i * 0.06}>
            <div className="h-full bg-bg p-7 transition hover:bg-surface sm:p-9">
              <p className="font-mono text-xs text-accent">{w.number}</p>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{w.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{w.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
