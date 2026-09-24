import React from 'react'
import SEO from '../components/SEO.jsx'

export default function Terms() {
  return (
    <div
      className="container"
      style={{ maxWidth: 720, lineHeight: 1.7 }}
    >
      <SEO
        title="Terms of Service — Markdown AI Tools"
        description="Read the terms of service for using Markdown AI Tools and its browser-based Markdown and CSV conversion tools."
      />

      <h1 className="h1">Terms of Service</h1>

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
          By using Markdown AI Tools, you agree to use the service responsibly.
          The tools are provided as-is and without guarantees that every
          conversion will produce a result suitable for a particular purpose.
        </p>

        <h2 style={{ fontWeight: 700, color: 'var(--ink)' }}>
          Use
        </h2>

        <p>
          You may use the tools for personal or commercial workflows. Do not
          abuse the service, interfere with its operation or attempt to
          circumvent reasonable technical protections.
        </p>

        <h2 style={{ fontWeight: 700, color: 'var(--ink)' }}>
          Your Content
        </h2>

        <p>
          You retain your rights to the text and data you provide to the
          conversion tools. Markdown and CSV output generated from your data
          is provided for your use.
        </p>

        <h2 style={{ fontWeight: 700, color: 'var(--ink)' }}>
          Liability
        </h2>

        <p>
          Conversion results should be reviewed before being used in important
          documents, systems or workflows. Keep backups of important data.
        </p>
      </div>
    </div>
  )
}
