import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

const TestimonialFormPage: React.FC<PageProps> = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const params = new URLSearchParams(window.location.search);
    const featured = params.get("featured") === "1";

    const payload = {
      name: formData.get("name"),
      role: formData.get("role"),
      company: formData.get("company"),
      testimonial: formData.get("testimonial"),
      photo: formData.get("photo"),
      featured,
    };

    try {
      const response = await fetch("/.netlify/functions/submit-testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-0 md:p-8">
      <div className="max-w-5xl mx-auto border border-border bg-card shadow-2xl overflow-hidden rounded-none md:rounded-xl">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dot-red)' }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dot-yellow)' }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--dot-green)' }} />
          <span className="ml-4 text-muted-foreground text-sm">~/ testimonials</span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {submitted ? (
            <div className="text-center py-12">
              <p className="text-primary text-lg mb-2">$ testimonial --submitted</p>
              <p className="text-green-400 text-sm mt-4">
                Thank you! Your testimonial has been received.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-4 py-2 text-sm rounded bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-pointer"
              >
                Submit another
              </button>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground text-sm mb-6">
                <span className="text-primary">$</span> I'd appreciate a few words about our time working together.
              </p>

              <form
                onSubmit={handleSubmit}
                autoComplete="one-time-code"
              >
                <div className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm text-muted-foreground mb-1">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="one-time-code"
                      className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm text-muted-foreground mb-1">
                      Role / Title <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      required
                      autoComplete="one-time-code"
                      className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Senior Developer"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm text-muted-foreground mb-1">
                      Company <span className="text-muted-foreground/50">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="one-time-code"
                      className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label htmlFor="testimonial" className="block text-sm text-muted-foreground mb-1">
                      Testimonial <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="testimonial"
                      name="testimonial"
                      required
                      rows={5}
                      autoComplete="one-time-code"
                      className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-vertical"
                      placeholder="Working with Aaron was..."
                    />
                  </div>

                  <div>
                    <label htmlFor="photo" className="block text-sm text-muted-foreground mb-1">
                      Profile Photo URL <span className="text-muted-foreground/50">(optional)</span>
                    </label>
                    <input
                      type="url"
                      id="photo"
                      name="photo"
                      autoComplete="one-time-code"
                      className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>

                  {error && (
                    <p className="text-destructive text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-4 w-full py-2.5 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit Testimonial"}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialFormPage;

export const Head: HeadFC = () => (
  <>
    <title>Submit a Testimonial | Aaron Jay Malabanan</title>
    <meta
      name="description"
      content="Share your experience working with Aaron Jay Malabanan. Submit a testimonial about our collaboration."
    />
    <meta name="robots" content="noindex, nofollow" />
  </>
);
