import { experience } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index="03" eyebrow="Experience" title="Where I've been building." />
      <ol className="relative ml-2 border-l border-line pl-8 sm:ml-4 sm:pl-12">
        {experience.map((job, i) => (
          <li key={job.company} className="relative pb-12 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-bg sm:-left-[53px]"
            >
              {i === 0 && <span className="absolute inset-0 animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />}
            </span>
            <Reveal>
              <div className="rounded-xl border border-line bg-surface/60 p-6 transition hover:border-line-strong">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight">{job.role}</h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-faint">
                    {job.period}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                </div>
                <p className="mt-1 text-accent">{job.company}</p>
                <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-muted">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                      {p}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
