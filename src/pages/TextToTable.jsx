import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import { rowsToMarkdown, textToRows } from '../utils/parsers.js'

export default function TextToTable() {
  const convert = useCallback((input) => {
    if (!input.trim()) {
      return ''
    }

    const rows = textToRows(input)

    return rowsToMarkdown(rows)
  }, [])

  return (
    <ToolLayout
      badge="Text → Markdown"
      title="Text to Markdown Table Converter"
      description="Turn messy notes, lists, key-value data and structured text into a clean Markdown table."
      seoTitle="Text to Markdown Table Converter — Free Online Tool"
      seoDescription="Convert plain text, notes, key-value data and structured text into clean Markdown tables directly in your browser. Free, fast and no signup."
    >
      <Converter
        inputLabel="Messy text"
        outputLabel="Markdown table"
        placeholder={`Project: Markdown AI Tools
Location: Barcelona
Status: In development
Features: CSV, Markdown, Text conversion

Or paste structured data:

Name,Age,City
Manuel,28,Barcelona
Marta,26,Madrid`}
        convertFn={convert}
      />

      <article
        className="card"
        style={{
          maxWidth: 760,
          margin: '32px auto 0'
        }}
      >
        <div style={{ padding: 24, lineHeight: 1.7 }}>
          <h2 className="h2" style={{ fontSize: 28 }}>
            Convert plain text into Markdown tables
          </h2>

          <p className="muted" style={{ marginTop: 12 }}>
            This tool turns common text formats into Markdown tables that you
            can paste into GitHub, documentation, Notion, AI prompts and other
            Markdown-compatible editors.
          </p>

          <h3
            style={{
              marginTop: 24,
              fontWeight: 700,
              color: 'var(--ink)'
            }}
          >
            What can you paste?
          </h3>

          <ul
            className="muted"
            style={{
              marginTop: 10,
              paddingLeft: 20,
              display: 'grid',
              gap: 6
            }}
          >
            <li>Key-value text such as <code>Name: John</code></li>
            <li>Bullet or numbered lists</li>
            <li>Comma-separated structured data</li>
            <li>Tab-separated data</li>
            <li>Pipe-separated data</li>
            <li>One item per line</li>
          </ul>

          <h3
            style={{
              marginTop: 24,
              fontWeight: 700,
              color: 'var(--ink)'
            }}
          >
            Example workflow
          </h3>

          <p className="muted" style={{ marginTop: 10 }}>
            Paste the text you already have, review the generated table, then
            use <strong>Copy</strong> or <strong>Download</strong> to reuse it
            in your project.
          </p>

          <p className="muted" style={{ marginTop: 10 }}>
            Everything is processed in your browser. The text you paste is not
            intentionally uploaded to a conversion server.
          </p>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--line)'
            }}
          >
            <strong>Need another format?</strong>

            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                marginTop: 12
              }}
            >
              <Link to="/csv-to-table" className="btn btn-ghost">
                CSV → Markdown
              </Link>

              <Link to="/list-to-table" className="btn btn-ghost">
                List → Markdown
              </Link>

              <Link to="/cleaner" className="btn btn-ghost">
                Clean Markdown
              </Link>
            </div>
          </div>
        </div>
      </article>
    </ToolLayout>
  )
}
