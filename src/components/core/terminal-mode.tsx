import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

interface TerminalModeProps {
  onExit: () => void;
}

const TerminalMode: React.FC<TerminalModeProps> = ({ onExit }) => {
  const data = useStaticQuery(graphql`
    query TerminalModeQuery {
      markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
        frontmatter {
          about {
            name
            title
            body
          }
          overview {
            body
          }
          skills {
            category
            items {
              skill_name
            }
          }
          experiences {
            date
            title
            body
            company {
              name
            }
            stacks {
              stack_name
            }
            contributions {
              contribution
            }
          }
          projects {
            title
            body
            link
            hidden
            featured
          }
          testimonials {
            featured
            name
            role
            company
            date
            body
            approved
          }
          socials {
            title
            link
          }
        }
      }
    }
  `);

  const fm = data.markdownRemark.frontmatter;

  const welcomeMessage: HistoryEntry = {
    command: "",
    output: (
      <div>
        <p className="text-primary font-bold">Welcome to aaron.dev terminal</p>
        <p className="text-muted-foreground">
          Type <span className="text-primary">/help</span> for available
          commands.
        </p>
      </div>
    ),
  };

  const [history, setHistory] = React.useState<HistoryEntry[]>([
    welcomeMessage,
  ]);
  const [input, setInput] = React.useState("");
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  React.useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const processCommand = (cmd: string): React.ReactNode => {
    const trimmed = cmd.trim().toLowerCase();

    switch (trimmed) {
      case "/help":
        return (
          <div className="space-y-1">
            <p className="text-primary font-bold mb-2">Available commands:</p>
            {[
              ["/about", "Who I am"],
              ["/skills", "Technical skills by category"],
              ["/experiences", "Work history"],
              ["/projects", "Things I've built"],
              ["/testimonials", "What people say"],
              ["/socials", "Where to find me"],
              ["/clear", "Clear terminal"],
              ["/exit", "Return to portfolio"],
            ].map(([c, d]) => (
              <p key={c}>
                <span className="text-primary min-w-36 inline-block">{c}</span>
                <span className="text-muted-foreground">— {d}</span>
              </p>
            ))}
          </div>
        );

      case "/about":
        return (
          <div className="space-y-2">
            <p className="text-primary font-bold">{fm.about.name}</p>
            <p className="text-secondary">{fm.about.title}</p>
            <p className="text-foreground whitespace-pre-line">
              {fm.overview.body}
            </p>
          </div>
        );

      case "/skills":
        return (
          <div className="space-y-3">
            {fm.skills.map(
              (
                group: { category: string; items: { skill_name: string }[] },
                i: number
              ) => (
                <div key={i}>
                  <p className="text-primary font-bold">{group.category}</p>
                  <p className="text-foreground">
                    {group.items.map((s) => s.skill_name).join(", ")}
                  </p>
                </div>
              )
            )}
          </div>
        );

      case "/experiences":
        return (
          <div className="space-y-4">
            {fm.experiences.map(
              (
                exp: {
                  title: string;
                  company: { name: string };
                  date: string;
                  body: string;
                  contributions?: { contribution: string }[];
                },
                i: number
              ) => (
                <div key={i} className="border-l-2 border-primary/30 pl-3">
                  <p className="text-primary font-bold">{exp.title}</p>
                  <p className="text-secondary">{exp.company.name}</p>
                  <p className="text-muted-foreground text-sm">{exp.date}</p>
                  <p className="text-foreground mt-1">{exp.body}</p>
                  {exp.contributions && exp.contributions.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.contributions.map((c, j) => (
                        <li key={j} className="text-foreground text-sm">
                          <span className="text-primary">›</span>{" "}
                          {c.contribution}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            )}
          </div>
        );

      case "/projects":
        return (
          <div className="space-y-3">
            {fm.projects
              .filter((p: { hidden?: boolean; featured?: boolean }) => !p.hidden && p.featured)
              .map(
                (
                  proj: {
                    title: string;
                    body: string;
                    link?: string;
                  },
                  i: number
                ) => (
                  <div key={i}>
                    <p>
                      {proj.link ? (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-bold underline"
                        >
                          {proj.title}
                        </a>
                      ) : (
                        <span className="text-primary font-bold">
                          {proj.title}
                        </span>
                      )}
                    </p>
                    <p className="text-foreground">{proj.body}</p>
                  </div>
                )
              )}
          </div>
        );

      case "/testimonials": {
        const approved = fm.testimonials?.filter(
          (t: { approved: boolean; featured?: boolean }) =>
            t.approved && t.featured
        );
        if (!approved?.length) {
          return (
            <p className="text-muted-foreground">No testimonials yet.</p>
          );
        }
        return (
          <div className="space-y-4">
            {approved.map(
              (
                t: {
                  name: string;
                  role: string;
                  company: string;
                  date: string;
                  body: string;
                },
                i: number
              ) => (
                <div key={i} className="border-l-2 border-primary/30 pl-3">
                  <p className="text-primary font-bold">{t.name}</p>
                  <p className="text-secondary">
                    {t.role}{t.company ? ` — ${t.company}` : ""}
                  </p>
                  <details className="mt-1 group">
                    <summary className="text-muted-foreground text-sm cursor-pointer list-none flex items-center gap-1 hover:text-foreground transition-colors">
                      <span className="text-primary">$</span> cat testimonial.txt
                      <span className="text-muted-foreground text-xs ml-1 group-open:rotate-90 transition-transform">&#9654;</span>
                    </summary>
                    <p className="text-foreground mt-1 ml-2">{t.body}</p>
                  </details>
                </div>
              )
            )}
          </div>
        );
      }

      case "/socials":
        return (
          <div className="space-y-1">
            {fm.socials.map(
              (s: { title: string; link: string }, i: number) => (
                <p key={i}>
                  <span className="text-primary font-bold">{s.title}</span>
                  <span className="text-muted-foreground"> — </span>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline"
                  >
                    {s.link}
                  </a>
                </p>
              )
            )}
          </div>
        );

      case "/clear":
        return null;

      case "/exit":
        return null;

      default:
        return (
          <p className="text-destructive">
            Command not found. Type{" "}
            <span className="text-primary">/help</span> for available commands.
          </p>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const trimmed = input.trim().toLowerCase();

    if (trimmed === "/clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (trimmed === "/exit") {
      onExit();
      return;
    }

    const output = processCommand(input);
    setHistory((prev) => [...prev, { command: input.trim(), output }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] md:h-[70vh]">
      <div className="flex-1 overflow-y-auto p-6 md:p-10 terminal-scroll">
        <div className="space-y-2 font-mono text-sm">
          {history.map((entry, i) => (
            <div key={i}>
              {entry.command && (
                <p className="text-primary">
                  <span className="text-muted-foreground">$ </span>
                  {entry.command}
                </p>
              )}
              {entry.output && <div className="mt-1 ml-2">{entry.output}</div>}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="border-t border-border px-6 md:px-10 py-3 flex items-center gap-2 font-mono text-sm cursor-text"
      >
        <span className="text-muted-foreground select-none">$</span>
        <span className="text-foreground">{input}</span><span className="w-[0.4em] h-[1.2em] bg-primary animate-blink inline-block align-middle -ml-2" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="absolute opacity-0 pointer-events-none"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default TerminalMode;
