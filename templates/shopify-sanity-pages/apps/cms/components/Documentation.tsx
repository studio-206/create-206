import * as React from "react";

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "48px 32px 96px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    color: "#101112",
    lineHeight: 1.6,
  },
  badge: {
    display: "inline-block",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "#6b7280",
    border: "1px solid #e5e7eb",
    borderRadius: 4,
    padding: "2px 8px",
    marginBottom: 24,
  },
  h1: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.2,
    margin: "0 0 12px",
  },
  lead: {
    fontSize: 16,
    color: "#4b5563",
    margin: "0 0 48px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #e5e7eb",
    margin: "40px 0",
  },
  section: {
    marginBottom: 48,
  },
  h2: {
    fontSize: 20,
    fontWeight: 700,
    margin: "0 0 4px",
  },
  sectionTag: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    marginBottom: 12,
    display: "block",
  },
  p: {
    margin: "0 0 12px",
    color: "#374151",
    fontSize: 15,
  },
  fieldList: {
    listStyle: "none",
    padding: 0,
    margin: "16px 0 0",
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
  },
  fieldItem: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    padding: "10px 14px",
    fontSize: 14,
  },
  fieldName: {
    fontWeight: 600,
    color: "#101112",
    marginRight: 8,
  },
  fieldDesc: {
    color: "#6b7280",
  },
  tip: {
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: 6,
    padding: "12px 16px",
    fontSize: 14,
    color: "#1e40af",
    margin: "16px 0 0",
  },
  warning: {
    background: "#fffbeb",
    border: "1px solid #fde68a",
    borderRadius: 6,
    padding: "12px 16px",
    fontSize: 14,
    color: "#92400e",
    margin: "16px 0 0",
  },
};

type Field = { name: string; desc: string };

function FieldList({ fields }: { fields: Field[] }) {
  return (
    <ul style={styles.fieldList}>
      {fields.map((f) => (
        <li key={f.name} style={styles.fieldItem}>
          <span style={styles.fieldName}>{f.name}</span>
          <span style={styles.fieldDesc}>{f.desc}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({
  tag,
  title,
  children,
}: {
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={styles.section}>
      <span style={styles.sectionTag}>{tag}</span>
      <h2 style={styles.h2}>{title}</h2>
      {children}
    </section>
  );
}

export function Documentation() {
  return (
    <div style={styles.page}>
      <span style={styles.badge}>Read-only</span>
      <h1 style={styles.h1}>CMS Documentation</h1>
      <p style={styles.lead}>
        A reference guide for editors. Use the sidebar to navigate between sections of the Studio.
        This page is read-only.
      </p>

      <hr style={styles.divider} />

      {/* ── PAGES ─────────────────────────────────────────────── */}
      <Section tag="Pages" title="Singleton Pages">
        <p style={styles.p}>
          Singleton pages are one-off documents — there is exactly one of each. You cannot create or
          delete them. Changes are saved as drafts and must be published to go live.
        </p>

        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "20px 0 8px" }}>Homepage</h3>
        <p style={styles.p}>
          The main landing page. Built from a list of page components added in order.
        </p>
        <FieldList
          fields={[
            { name: "Title", desc: "Internal title (not visible on site)." },
            {
              name: "Components",
              desc: "Page sections added in order. Drag to reorder.",
            },
            { name: "SEO", desc: "Meta title, description, and open graph image." },
          ]}
        />

        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "20px 0 8px" }}>Why Us</h3>
        <p style={styles.p}>The 'Why Us' section page. Same component-based structure.</p>

        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "20px 0 8px" }}>About</h3>
        <p style={styles.p}>
          The About page. Contains editorial content, stats, facts, the team grid, and vacancies.
        </p>

        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "20px 0 8px" }}>Contact</h3>
        <p style={styles.p}>Contact page content including office addresses.</p>

        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "20px 0 8px" }}>
          Privacy Policy: LinkedIn Leadgen
        </h3>
        <p style={styles.p}>Standalone privacy policy page for LinkedIn lead generation forms.</p>
      </Section>

      <hr style={styles.divider} />

      {/* ── CASE STUDIES ──────────────────────────────────────── */}
      <Section tag="Case Studies" title="Case Studies">
        <p style={styles.p}>
          Case studies are individual project entries. Each has three tabs:{" "}
          <strong>Presentational</strong>, <strong>Editorial</strong>, and <strong>SEO</strong>.
        </p>

        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "16px 0 8px" }}>Presentational tab</h3>
        <FieldList
          fields={[
            {
              name: "Active",
              desc: "Toggle to show/hide the case study on the site.",
            },
            {
              name: "Coming Soon",
              desc: "Shows the project as a placeholder without a detail page.",
            },
            {
              name: "Website Link",
              desc: "Only visible when 'Coming Soon' is on. Links to the live project.",
            },
            {
              name: "Featured Image",
              desc: "Thumbnail shown in project grids and lists.",
            },
            { name: "Title", desc: "Project name displayed on cards." },
            { name: "Subtitle", desc: "Short tagline under the title." },
          ]}
        />

        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "16px 0 8px" }}>Editorial tab</h3>
        <FieldList
          fields={[
            {
              name: "Slug",
              desc: "URL path for the case study (auto-generated from title, must be unique).",
            },
            { name: "Date", desc: "Display date, e.g. 'March 2022'." },
            {
              name: "Description",
              desc: "Short summary shown in listings.",
            },
            {
              name: "Tags",
              desc: "Categorisation tags. Only existing tags can be selected.",
            },
            {
              name: "Filter Tags",
              desc: "Tags used by the filter on the Case Study list page.",
            },
            {
              name: "Components",
              desc: "The body of the case study, built from page components.",
            },
          ]}
        />

        <div style={styles.tip}>
          <strong>Tip:</strong> Set <em>Active</em> to false to hide a case study without deleting
          it. Use <em>Coming Soon</em> to tease upcoming work.
        </div>

        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "20px 0 8px" }}>Case Study Tags</h3>
        <p style={styles.p}>
          Short labels (e.g. "Branding", "Web") used to categorise case studies in listings.
        </p>

        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "20px 0 8px" }}>
          Case Study Filter Tags
        </h3>
        <p style={styles.p}>
          Tags used by the interactive filter on the Case Study list page. Independent from Case
          Study Tags.
        </p>
      </Section>

      <hr style={styles.divider} />

      {/* ── NAVIGATION ────────────────────────────────────────── */}
      <Section tag="Navigation" title="Navigation Menu">
        <p style={styles.p}>
          The site navigation is a singleton. Manage the top-level menu links here. Each item can
          point to an internal page or an external URL.
        </p>
        <FieldList
          fields={[
            { name: "Label", desc: "Text displayed in the navigation bar." },
            {
              name: "Link",
              desc: "Internal page reference or external URL.",
            },
          ]}
        />
        <div style={styles.warning}>
          <strong>Note:</strong> After publishing changes to the Navigation Menu, allow a few
          minutes for the site to rebuild and reflect updates.
        </div>
      </Section>

      <hr style={styles.divider} />

      {/* ── CLIENTS ───────────────────────────────────────────── */}
      <Section tag="Clients" title="Clients">
        <p style={styles.p}>
          The Clients collection manages logos or entries shown in the clients section of the site.
          Add or remove clients here.
        </p>
      </Section>

      <hr style={styles.divider} />

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <Section tag="Footer" title="Footer">
        <p style={styles.p}>
          The Footer is a singleton. Manage footer links, social links, and address information
          here.
        </p>
        <FieldList
          fields={[
            {
              name: "Link Items",
              desc: "Footer navigation links — label and URL for each.",
            },
          ]}
        />
      </Section>

      <hr style={styles.divider} />

      {/* ── PUBLISHING ────────────────────────────────────────── */}
      <Section tag="General" title="Drafts & Publishing">
        <p style={styles.p}>
          All changes in Sanity are saved as <strong>drafts</strong> automatically. A draft is not
          visible on the live site until you click <strong>Publish</strong>.
        </p>
        <p style={styles.p}>
          You can discard unsaved changes using the <strong>Discard changes</strong> option in the
          document menu (three-dot icon top right).
        </p>
        <div style={styles.tip}>
          <strong>Tip:</strong> Use the <em>Preview</em> button (if enabled) to review your changes
          before publishing.
        </div>
      </Section>
    </div>
  );
}
