/**
 * Netlify Function (v2) — receives testimonial form data as JSON,
 * appends it to the testimonials list in home/index.md, and commits
 * the updated file via the GitHub Contents API.
 */

const { GITHUB_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME } = process.env;

const FILE_PATH = "src/markdowns/home/index.md";

/** Escape a value for safe inclusion in YAML frontmatter. */
function escapeYaml(value) {
  if (typeof value !== "string") return '""';
  if (/[\n\r:#{}\[\],&*?|>!'"%@`]/.test(value) || value.trim() !== value) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

/** Build a YAML list entry for a testimonial. */
function buildTestimonialYaml({ name, role, company, testimonial, photo, date }) {
  return [
    `  - name: ${escapeYaml(name)}`,
    `    role: ${escapeYaml(role)}`,
    `    company: ${escapeYaml(company)}`,
    `    date: ${date}`,
    `    photo: ${escapeYaml(photo || "")}`,
    `    approved: false`,
    `    body: ${escapeYaml(testimonial)}`,
  ].join("\n");
}

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed.", { status: 405 });
  }

  if (!GITHUB_TOKEN || !GITHUB_REPO_OWNER || !GITHUB_REPO_NAME) {
    console.error("Missing required GITHUB_* environment variables.");
    return new Response("Server misconfiguration.", { status: 500 });
  }

  let data;
  try {
    data = await request.json();
  } catch {
    return new Response("Invalid JSON.", { status: 400 });
  }

  const { name, role, company, testimonial, photo } = data;

  if (!name || !role || !company || !testimonial) {
    return new Response("Missing required fields.", { status: 400 });
  }

  const apiBase = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  // 1. Fetch current file content and SHA
  const getRes = await fetch(`${apiBase}/contents/${FILE_PATH}?ref=main`, { headers });
  if (!getRes.ok) {
    console.error("Failed to fetch index.md:", await getRes.text());
    return new Response("Failed to read file.", { status: 502 });
  }

  const fileData = await getRes.json();
  const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");
  const { sha } = fileData;

  // 2. Insert new testimonial entry after the `testimonials:` line
  const dateStr = new Date().toISOString().slice(0, 10);
  const entry = buildTestimonialYaml({ name, role, company, testimonial, photo, date: dateStr });

  let updatedContent;
  const testimonialsIdx = currentContent.indexOf("\ntestimonials:\n");

  if (testimonialsIdx !== -1) {
    // Insert right after "testimonials:\n"
    const insertPos = testimonialsIdx + "\ntestimonials:\n".length;
    updatedContent =
      currentContent.slice(0, insertPos) +
      entry + "\n" +
      currentContent.slice(insertPos);
  } else {
    // No testimonials key yet — insert before "footer:"
    const footerIdx = currentContent.indexOf("\nfooter:");
    if (footerIdx === -1) {
      return new Response("Could not find insertion point in index.md.", { status: 500 });
    }
    updatedContent =
      currentContent.slice(0, footerIdx) +
      "\ntestimonials:\n" + entry + "\n" +
      currentContent.slice(footerIdx);
  }

  // 3. Commit the updated file
  const putRes = await fetch(`${apiBase}/contents/${FILE_PATH}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: `feat(testimonial): add testimonial from ${name}`,
      content: Buffer.from(updatedContent).toString("base64"),
      sha,
      branch: "main",
    }),
  });

  if (!putRes.ok) {
    const errorBody = await putRes.text();
    console.error(`GitHub API error (${putRes.status}):`, errorBody);
    return new Response("Failed to save testimonial.", { status: 502 });
  }

  console.log(`Testimonial from ${name} committed successfully.`);
  return new Response("Testimonial saved.", { status: 200 });
}
