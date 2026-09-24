import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import { cleanMarkdownTable } from '../utils/parsers.js'

export default function MarkdownCleaner() {
  const convert = useCallback((input) => {
    if (!input.trim()) {
      return ''
    }

    return cleanMarkdownTable(input)
  }, [])

  return (
    <ToolLayout
      badge="Markdown Fixer"
      title="Markdown Table Cleaner & Formatter"
      description="Fix broken Markdown tables with missing pipes, inconsistent columns, separator rows and extra spaces."
      seoTitle="Markdown Table Cleaner & Formatter — Free Online Tool"
      seoDescription="Clean and repair broken Markdown tables online. Fix missing pipes, inconsistent columns, separator rows and spacing directly in your browser."
    >
      <Converter
        inputLabel="Broken markdown"
        outputLabel="Fixed markdown"
        placeholder={`Name | Age | City
--- | --- | ---
Manuel | 28
Marta | 26 | Madrid | Extra`}
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
            Clean and repair Markdown tables
          </h2>

          <p className="muted" style={{ marginTop: 12 }}>
            Markdown tables copied from AI tools, documents or different
            editors can contain inconsistent spacing, missing pipes or rows
            with different numbers of columns. This tool normalizes the table
            structure while preserving the available data.
          </p>

          <h3
            style={{
              marginTop: 24,
              fontWeight: 700,
              color: 'var(--ink)'
            }}
          >
            What the cleaner handles
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
            <li>Missing outer pipe characters</li>
            <li>Inconsistent column counts</li>
            <li>Extra spaces around cell values</li>
            <li>Markdown separator rows</li>
            <li>Empty cells</li>
            <li>Escaped pipe characters inside cells</li>
          </ul>

          <h3
            style={{
              marginTop: 24,
              fontWeight: 700,
              color: 'var(--ink)'
            }}
          >
            When should you use it?
          </h3>

          <p className="muted" style={{ marginTop: 10 }}>
            Use the cleaner when a table looks correct visually but contains
            malformed Markdown, or when an AI-generated table needs to be
            normalized before adding it to a README, documentation page or
            Markdown file.
          </p>

          <p className="muted" style={{ marginTop: 10 }}>
            Paste the table, review the normalized result, then copy it back
            into your project. The conversion runs locally in your browser.
          </p>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--line)'
            }}
          >
            <strong>Need to convert data instead?</strong>

            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                marginTop: 12
              }}
            >
              <Link to="/text-to-table" className="btn btn-ghost">
                Text → Markdown
              </Link>

              <Link to="/csv-to-table" className="btn btn-ghost">
                CSV → Markdown
              </Link>

              <Link to="/table-to-csv" className="btn btn-ghost">
                Markdown → CSV
              </Link>
            </div>
          </div>
        </div>
      </article>
    </ToolLayout>
  )
}
