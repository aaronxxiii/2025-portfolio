import React from "react";
import GitHubCalendar from "react-github-calendar";

function GithubCalendar() {
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

export default GithubCalendar;
