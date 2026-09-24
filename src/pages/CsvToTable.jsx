import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { parseCSV, rowsToMarkdown } from '../utils/parsers.js'

export default function CsvToTable() {
  const convert = useCallback((input) => {
    if (!input.trim()) {
      return ''
    }

    const rows = parseCSV(input)

    return rowsToMarkdown(rows)
  }, [])

  return (
    <ToolLayout
      badge="CSV → Markdown"
      title="CSV to Markdown Table Converter"
      description="Paste CSV with commas, semicolons, tabs or pipes. The converter handles quoted fields and multiline values."
      seoTitle="CSV to Markdown Table Converter — Free Online Tool"
      seoDescription="Convert CSV to Markdown tables online. Supports commas, semicolons, tabs, pipes, quoted fields and multiline values. Runs locally in your browser."
    >
      <Converter
        inputLabel="CSV input"
        outputLabel="Markdown output"
        placeholder={`name,age,city
Manuel,28,Barcelona
Marta,26,Madrid
"Doe, John",31,"New York, NY"`}
        convertFn={convert}
      />

      <AdSlot />

      <article
        className="card"
        style={{
          maxWidth: 760,
          margin: '32px auto 0'
        }}
      >
        <div style={{ padding: 24, lineHeight: 1.7 }}>
          <h2 className="h2" style={{ fontSize: 28 }}>
            Convert CSV into a Markdown table
          </h2>

          <p className="muted" style={{ marginTop: 12 }}>
            CSV is convenient for spreadsheets and exported data, while
            Markdown tables are useful for GitHub, documentation, AI prompts
            and note-taking. This converter bridges those two formats without
            requiring an account.
          </p>

          <h3
            style={{
              marginTop: 24,
              fontWeight: 700,
              color: 'var(--ink)'
            }}
          >
            Supported CSV formats
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
            <li>Comma-separated values</li>
            <li>Semicolon-separated values</li>
            <li>Tab-separated values</li>
            <li>Pipe-separated values</li>
            <li>Quoted fields containing commas</li>
            <li>Quoted fields containing line breaks</li>
            <li>Escaped double quotes</li>
          </ul>

          <h3
            style={{
              marginTop: 24,
              fontWeight: 700,
              color: 'var(--ink)'
            }}
          >
            Example
          </h3>

          <p className="muted" style={{ marginTop: 10 }}>
            You can paste an export from a spreadsheet or another application,
            review the generated Markdown, and copy it directly into your
            documentation or AI workflow.
          </p>

          <p className="muted" style={{ marginTop: 10 }}>
            CSV conversion runs directly in your browser. Your pasted data is
            not intentionally uploaded to a conversion server.
          </p>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--line)'
            }}
          >
            <strong>Working with Markdown already?</strong>

            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                marginTop: 12
              }}
            >
              <Link to="/table-to-csv" className="btn btn-ghost">
                Markdown → CSV
              </Link>

              <Link to="/cleaner" className="btn btn-ghost">
                Clean Markdown Table
              </Link>

              <Link to="/text-to-table" className="btn btn-ghost">
                Text → Markdown
              </Link>
            </div>
          </div>
        </div>
      </article>
    </ToolLayout>
  )
}
