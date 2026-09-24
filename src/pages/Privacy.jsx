import React from 'react'
import SEO from '../components/SEO.jsx'

export default function Privacy() {
  return (
    <div
      className="container"
      style={{ maxWidth: 720, lineHeight: 1.7 }}
    >
      <SEO
        title="Privacy Policy — Markdown AI Tools"
        description="Read the Markdown AI Tools privacy policy and learn how browser-based conversions, cookies and advertising are handled."
      />

      <h1 className="h1">Privacy Policy</h1>

      <p
        className="small mono muted"
        style={{ marginTop: 8 }}
      >
        Last updated: May 13, 2026
      </p>

      <div
        style={{ marginTop: 24, display: 'grid', gap: 16 }}
        className="muted"
      >
        <p>
          Markdown AI Tools is designed so that table conversions happen
          directly in your browser. The content you paste into the conversion
          tools is not intentionally stored on our servers.
        </p>

        <h2 style={{ fontWeight: 700, color: 'var(--ink)' }}>
          Cookies & Ads
        </h2>

        <p>
          The site may use cookies or similar technologies for advertising,
          analytics and basic site functionality. Third-party advertising
          providers may use their own technologies according to their
          applicable policies and settings.
        </p>

        <h2 style={{ fontWeight: 700, color: 'var(--ink)' }}>
          Data
        </h2>

        <p>
          No account is required to use the conversion tools. Do not paste
          confidential or sensitive information into any online service unless
          you are comfortable doing so.
        </p>

        <h2 style={{ fontWeight: 700, color: 'var(--ink)' }}>
          Contact
        </h2>

        <p>
          For privacy questions or requests, please use the contact information
          provided by the site owner.
        </p>
      </div>
    </div>
  )
}
