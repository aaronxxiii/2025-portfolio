/**
 * Netlify Function — receives testimonial form data as JSON, validates it,
 * and commits a markdown file to the repo via the GitHub Contents API.
 */

const { GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME } = process.env;

/** Escape a value for safe inclusion in YAML frontmatter. */
function escapeYaml(value) {
  if (typeof value !== "string") return '""';
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
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed." };
  }

  if (!GITHUB_TOKEN || !GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    console.error("Missing required GITHUB_* environment variables.");
    return { statusCode: 500, body: "Server misconfiguration." };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: "Invalid JSON." };
  }

  const { name, role, company, testimonial, photo } = data;

  if (!name || !role || !company || !testimonial) {
    return { statusCode: 400, body: "Missing required fields." };
  }

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const uniqueSuffix = now.getTime().toString(36);
  const slug = slugify(name);
  const fileName = `${dateStr}-${slug}-${uniqueSuffix}.md`;
  const filePath = `src/markdowns/testimonials/${fileName}`;

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
      message: `feat(testimonial): add testimonial from ${name}`,
      content: contentBase64,
      branch: "main",
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`GitHub API error (${response.status}):`, errorBody);
    return { statusCode: 502, body: "Failed to save testimonial." };
  }

  console.log(`Committed ${filePath} successfully.`);
  return { statusCode: 200, body: "Testimonial saved." };
}
