import { Mail } from "lucide-react";
import { personal, social } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./Icons";

export function Footer() {
  const links = [
    { href: social.github, label: "GitHub", Icon: GithubIcon, ext: true },
    { href: social.linkedin, label: "LinkedIn", Icon: LinkedinIcon, ext: true },
    { href: `mailto:${personal.email}`, label: "Email", Icon: Mail, ext: false },
  ];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium">{personal.name}</p>
          <p className="mt-1 text-sm text-faint">{personal.discipline}</p>
        </div>
        <ul className="flex items-center gap-2">
          {links.map(({ href, label, Icon, ext }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition hover:text-fg"
              >
                <Icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-faint">
          © {new Date().getFullYear()} {personal.name}. Designed &amp; built with Next.js, React, TypeScript &amp; Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
