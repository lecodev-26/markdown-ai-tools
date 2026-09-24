import React from 'react'
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot.jsx'
import SEO from '../components/SEO.jsx'

const tools = [
  {
    slug: '/text-to-table',
    name: 'Text to Markdown Table',
    desc: 'Turn messy notes, emails, AI output and structured text into clean Markdown tables.',
    tag: 'Most Popular'
  },
  {
    slug: '/csv-to-table',
    name: 'CSV to Markdown Table',
    desc: 'Convert CSV using commas, semicolons, tabs or pipes, including quoted fields.',
    tag: 'CSV'
  },
  {
    slug: '/list-to-table',
    name: 'List to Markdown Table',
    desc: 'Turn bullet lists, numbered lists and one-item-per-line data into a Markdown table.',
    tag: 'Lists'
  },
  {
    slug: '/table-to-csv',
    name: 'Markdown Table to CSV',
    desc: 'Convert Markdown tables into CSV for Excel, Google Sheets and other spreadsheet tools.',
    tag: 'Reverse'
  },
  {
    slug: '/cleaner',
    name: 'Markdown Table Cleaner',
    desc: 'Repair broken Markdown tables with inconsistent columns, spacing and separator rows.',
    tag: 'Cleaner'
  }
]

export default function Home() {
  return (
    <div className="container">
      <SEO
        title="Markdown AI Tools — Free Markdown Table Converters"
        description="Convert text, CSV, lists and Markdown tables with fast browser-based tools. Create clean Markdown tables for AI, GitHub, Notion and documentation. No signup."
      />

      <section style={{ padding: '40px 0 24px', maxWidth: 780 }}>
        <span className="badge">Free • No Signup • Privacy-First</span>

        <h1 className="h1" style={{ margin: '20px 0 16px' }}>
          Convert text and data into clean Markdown tables.
        </h1>

        <p style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--ink-soft)' }}>
          Simple browser-based tools for converting text, CSV, lists and Markdown
          tables for AI workflows, GitHub, Notion, documentation and spreadsheets.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <Link to="/text-to-table" className="btn">
            Start Converting →
          </Link>

          <Link to="/csv-to-table" className="btn btn-ghost">
            Convert CSV
          </Link>
        </div>
      </section>

      <AdSlot />

      <section style={{ marginTop: 32 }}>
        <h2 className="h2" style={{ marginBottom: 16 }}>
          Markdown Table Tools
        </h2>

        <div className="grid grid-3">
          {tools.map(tool => (
            <Link
              key={tool.slug}
              to={tool.slug}
              className="card"
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                transition: 'transform .15s'
              }}
            >
              <span className="badge" style={{ alignSelf: 'flex-start' }}>
                {tool.tag}
              </span>

              <div
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  fontFamily: 'var(--font-display)'
                }}
              >
                {tool.name}
              </div>

              <div
                className="small muted"
                style={{ lineHeight: 1.5 }}
              >
                {tool.desc}
              </div>

              <div
                className="small mono"
                style={{
                  marginTop: 'auto',
                  paddingTop: 12,
                  fontWeight: 600
                }}
              >
                Open tool →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section
        style={{ marginTop: 56, maxWidth: 720 }}
        className="card"
      >
        <div style={{ padding: 24 }}>
          <h2 className="h2" style={{ fontSize: 24 }}>
            Why use Markdown AI Tools?
          </h2>

          <p
            className="muted"
            style={{ marginTop: 12, lineHeight: 1.6 }}
          >
            Markdown tables are useful for AI prompts, GitHub README files,
            technical documentation and note-taking apps. These tools help turn
            messy source data into consistent Markdown without requiring an
            account or uploading the content to a server.
          </p>

          <ul
            className="small mono"
            style={{
              marginTop: 16,
              display: 'grid',
              gap: 8,
              paddingLeft: 18,
              listStyle: 'disc'
            }}
          >
            <li>Conversions run directly in your browser</li>
            <li>Supports text, CSV, lists and Markdown tables</li>
            <li>Copy or download converted results</li>
            <li>No account required</li>
            <li>Designed for AI, GitHub, Notion and documentation workflows</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
