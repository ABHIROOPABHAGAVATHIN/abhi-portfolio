"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./Icons";
import { ProjectVisualPanel } from "./ProjectVisuals";
import { Reveal, SectionHeading } from "./Reveal";

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li key={s} className="rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-xs text-muted">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.github && !p.demo) return null;
  return (
    <div className="flex gap-3">
      {p.github && (
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-fg link-underline">
          <GithubIcon className="h-4 w-4" /> GitHub
        </a>
      )}
      {p.demo && (
        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-fg link-underline">
          <ArrowUpRight size={16} aria-hidden="true" /> Live demo
        </a>
      )}
    </div>
  );
}

function FeaturedProject({ p, flip, onOpen }: { p: Project; flip: boolean; onOpen: (p: Project) => void }) {
  return (
    <Reveal>
      <article className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <button
          type="button"
          onClick={() => onOpen(p)}
          aria-label={`Open ${p.name} case study`}
          className={cn(
            "block rounded-xl text-left transition duration-300 group-hover:[&>div]:border-line-strong group-hover:[&_svg]:scale-[1.02]",
            flip && "lg:order-2",
          )}
        >
          <div className="transition-transform duration-500 group-hover:scale-[1.015]">
            <ProjectVisualPanel kind={p.visual} />
          </div>
        </button>

        <div>
          <p className="flex items-center gap-3 font-mono text-xs text-accent">
            {p.number}
            {p.status && (
              <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                {p.status}
              </span>
            )}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{p.name}</h3>
          <p className="mt-1 text-sm text-faint">{p.subtitle}</p>
          <p className="mt-5 leading-relaxed text-muted">{p.summary}</p>

          <dl className="mt-6 space-y-4 text-[15px]">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Problem</dt>
              <dd className="mt-1 text-muted">{p.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Approach</dt>
              <dd className="mt-1 text-muted">{p.approach}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <Stack items={p.stack} />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => onOpen(p)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 text-sm transition hover:-translate-y-0.5 hover:border-accent/60"
            >
              Case study <ArrowUpRight size={15} aria-hidden="true" />
            </button>
            <Links p={p} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [onClose]);

  const block = (label: string, body: React.ReactNode) => (
    <section>
      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{label}</h4>
      {body}
    </section>
  );

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-line-strong bg-surface p-6 sm:rounded-2xl sm:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent">
              {p.number}
              {p.status ? ` · ${p.status}` : ""}
            </p>
            <h3 id="project-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {p.name}
            </h3>
            <p className="mt-1 text-sm text-faint">{p.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:text-fg"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6">
          <ProjectVisualPanel kind={p.visual} />
        </div>

        <div className="mt-8 space-y-7 text-[15px] leading-relaxed text-muted">
          {block("Overview", <p>{p.summary}</p>)}
          {block("Problem", <p>{p.problem}</p>)}
          {block("Solution", <p>{p.approach}</p>)}
          {block(
            "Architecture",
            <ol className="space-y-2">
              {p.architecture.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="font-mono text-xs leading-6 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>,
          )}
          {block(
            "Features",
            <ul className="space-y-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent/60" />
                  {f}
                </li>
              ))}
            </ul>,
          )}
          {block("Technology stack", <Stack items={p.stack} />)}
          <Links p={p} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading index="02" eyebrow="Featured projects" title="Problems I've built solutions for." />

      <div className="space-y-24 md:space-y-32">
        {featured.map((p, i) => (
          <FeaturedProject key={p.slug} p={p} flip={i % 2 === 1} onOpen={setSelected} />
        ))}
      </div>

      {more.length > 0 && (
        <div className="mt-24">
          <Reveal>
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-faint">More projects</h3>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {more.map((p) => (
              <Reveal key={p.slug}>
                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  className="group block w-full rounded-xl border border-line bg-surface/60 p-6 text-left transition hover:-translate-y-0.5 hover:border-line-strong"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent">{p.number}</span>
                    <ArrowUpRight size={16} aria-hidden="true" className="text-faint transition group-hover:text-fg" />
                  </div>
                  <h4 className="mt-4 text-lg font-semibold tracking-tight">{p.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
                  <div className="mt-5">
                    <Stack items={p.stack} />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selected && <Modal key={selected.slug} p={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
