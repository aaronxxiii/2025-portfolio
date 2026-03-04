/**
 * Netlify Background Function — auto-triggered on every form submission.
 * Commits a markdown file to the repo via the GitHub Contents API so each
 * testimonial becomes a source-controlled file picked up by Gatsby at build.
 */

const { GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME } = process.env;

/** Escape a value for safe inclusion in YAML frontmatter. */
function escapeYaml(value) {
  if (typeof value !== "string") return '""';
  // If the value contains characters that could break YAML, wrap in double quotes
  // and escape internal double quotes and backslashes.
  if (/[\n\r:#{}\[\],&*?|>!'"%@`]/.test(value) || value.trim() !== value) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

/** Turn a name into a URL-friendly slug. */
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function handler(event) {
  const payload = JSON.parse(event.body);

  // Only act on the testimonials form.
  if (payload.form_name !== "testimonials") {
    return { statusCode: 200, body: "Ignored — not a testimonials submission." };
  }

  if (!GITHUB_TOKEN || !GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    console.error("Missing required GITHUB_* environment variables.");
    return { statusCode: 500, body: "Server misconfiguration." };
  }

  const { name, role, company, testimonial, photo } = payload.data;

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
  const uniqueSuffix = now.getTime().toString(36); // short unique id
  const slug = slugify(name || "anonymous");
  const fileName = `${dateStr}-${slug}-${uniqueSuffix}.md`;
  const filePath = `src/markdowns/testimonials/${fileName}`;

  // Build photo URL — Netlify stores uploads on its CDN and provides the URL.
  const photoUrl = photo || "";

  const content = `---
templateKey: testimonial
name: ${escapeYaml(name)}
role: ${escapeYaml(role)}
company: ${escapeYaml(company)}
date: ${dateStr}
photo: ${escapeYaml(photoUrl)}
approved: false
---

${testimonial}
`;

  // Base64-encode the file content for the GitHub API.
  const contentBase64 = Buffer.from(content).toString("base64");

  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`;

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `feat(testimonial): add testimonial from ${name || "anonymous"}`,
      content: contentBase64,
      branch: "main",
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`GitHub API error (${response.status}):`, errorBody);
    return { statusCode: 502, body: "Failed to commit testimonial." };
  }

  console.log(`Committed ${filePath} successfully.`);
  return { statusCode: 200, body: "Testimonial committed." };
}
