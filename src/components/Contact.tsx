"use client";

import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { personal, social } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Reveal } from "./Reveal";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full rounded-lg border border-line bg-bg px-4 py-3 text-[15px] text-fg placeholder:text-faint transition focus:border-accent/70 focus:outline-none focus:ring-2 focus:ring-accent/20";

/**
 * There is no backend: a valid submission opens the visitor's email client with the
 * message prefilled (mailto). To send server-side later, replace `onSubmit` with a
 * fetch to an API route and keep keys in .env.local (see .env.example).
 */
export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please write at least a short message (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length) return;

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const err = (id: keyof Errors) =>
    errors[id] ? (
      <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-red-300">
        {errors[id]}
      </p>
    ) : null;

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-10 -z-10 mx-auto h-72 max-w-2xl rounded-full bg-accent/10 blur-[110px]" />
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">08 — Contact</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Let&apos;s build something dependable.</h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            I&apos;m open to backend and software engineering opportunities. The fastest way to reach me is email.
          </p>
          <ul className="mt-8 space-y-3">
            <li>
              <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-3 text-fg link-underline">
                <Mail size={18} aria-hidden="true" /> {personal.email}
              </a>
            </li>
            <li>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-fg link-underline">
                <LinkedinIcon className="h-[18px] w-[18px]" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-fg link-underline">
                <GithubIcon className="h-[18px] w-[18px]" /> GitHub
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-line bg-surface/70 p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm text-muted">Name</label>
              <input id="name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
              {err("name")}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm text-muted">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
              {err("email")}
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm text-muted">Message</label>
              <textarea id="message" name="message" rows={5} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
              {err("message")}
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-sm font-medium text-bg transition hover:-translate-y-0.5 hover:bg-white"
            >
              Send via email <Send size={15} aria-hidden="true" />
            </button>
            <p className="text-xs text-faint" role="status">
              {sent
                ? "Your email app should have opened with the message ready to send. If not, write to me directly at the address on the left."
                : "This opens your email app with the message prefilled. Nothing is stored on this site."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
