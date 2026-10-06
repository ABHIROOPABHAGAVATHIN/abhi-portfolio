"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { personal, social } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icons";

const term = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: `${personal.name}` },
  { kind: "cmd", text: "cat role.txt" },
  { kind: "out", text: `${personal.title} · CSE '27` },
  { kind: "cmd", text: "cat stack.txt" },
  { kind: "out", text: "Java · Spring Boot · RabbitMQ · Redis" },
  { kind: "out", text: "PostgreSQL · Drools · Groq · Ollama" },
  { kind: "cmd", text: "git log --current" },
  { kind: "out", text: "Averqon · Backend Developer Intern" },
  { kind: "out", text: "FinVigil Central · in progress" },
] as const;

function Terminal() {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent/10 blur-3xl"
      />
      <div className="overflow-hidden rounded-xl border border-line-strong bg-surface/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-xs text-faint">abhiroopa@portfolio ~ zsh</span>
        </div>
        <div className="space-y-1.5 p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
          {term.map((line, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.28, duration: 0.25 }}
              className={line.kind === "cmd" ? "pt-2 text-fg" : "text-muted"}
            >
              {line.kind === "cmd" && <span className="mr-2 text-accent">$</span>}
              {line.text}
            </motion.div>
          ))}
          <div className="pt-2 text-fg">
            <span className="mr-2 text-accent">$</span>
            <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const socials = [
    { href: social.github, label: "GitHub", Icon: GithubIcon, external: true },
    { href: social.linkedin, label: "LinkedIn", Icon: LinkedinIcon, external: true },
    { href: `mailto:${personal.email}`, label: "Email", Icon: Mail, external: false },
  ];

  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 sm:pt-36">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="drift absolute -top-40 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]"
      />
      <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:pb-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {personal.discipline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]"
          >
            {personal.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {personal.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
          >
            <p className="mt-5 flex items-center gap-2 text-sm text-faint">
              <MapPin size={14} aria-hidden="true" /> {personal.location}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition hover:-translate-y-0.5 hover:bg-white"
              >
                View my work
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={personal.resumeFile}
                download={personal.resumeDownloadName}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface px-6 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent/60"
              >
                <Download size={16} aria-hidden="true" /> Download Resume
              </a>
            </div>

            <ul className="mt-8 flex items-center gap-2">
              {socials.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:-translate-y-0.5 hover:border-line-strong hover:text-fg"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
