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

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-semibold text-lg">GitHub Contributions</h2>
      <GitHubCalendar
        username="aarondotdev"
        fontSize={12}
        blockSize={10}
        blockMargin={4}
      />
    </div>
  );
}
