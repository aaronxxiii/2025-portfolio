import React, { useEffect, useState } from "react";

export default function GithubCalendar() {
  const [GitHubCalendar, setGitHubCalendar] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import("react-github-calendar")
      .then((mod) => {
        if (!mounted) return;
        setGitHubCalendar(() => mod.default ?? mod);
      })
      .catch(() => {
        setGitHubCalendar(() => null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!GitHubCalendar) return null;

  const greenTheme = {
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-lg text-primary">GitHub Contributions</h2>
      <GitHubCalendar
        username="aarondotdev"
        fontSize={12}
        blockSize={10}
        blockMargin={4}
        colorScheme="dark"
        theme={greenTheme}
      />
    </div>
  );
}
