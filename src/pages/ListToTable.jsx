import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import { rowsToMarkdown } from '../utils/parsers.js'

export default function ListToTable() {
  const convert = useCallback((input) => {
    if (!input.trim()) {
      return ''
    }

    const lines = input
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean)
      .map(s => s.replace(/^[-*•\d.]+\s*/, ''))

    const rows = [
      ['Item', '#'],
      ...lines.map((line, index) => [line, String(index + 1)])
    ]

    return rowsToMarkdown(rows)
  }, [])

  return (
    <ToolLayout
      badge="List → Table"
      title="List to Markdown Table"
      description="Convert bullet lists, numbered lists or one-item-per-line text into a clean Markdown table."
      seoTitle="List to Markdown Table Converter — Free Online Tool"
      seoDescription="Convert bullet lists, numbered lists and one-item-per-line text into Markdown tables. Free browser-based converter with no signup."
    >
      <Converter
        inputLabel="List input"
        outputLabel="Markdown table"
        placeholder={`- Apple
- Banana
- Orange
- Mango`}
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
            Turn lists into Markdown tables
          </h2>

          <p className="muted" style={{ marginTop: 12 }}>
            A simple list is useful for quick notes, but a Markdown table can
            make the same information easier to scan and organize. Paste one
            item per line and this tool creates a numbered table automatically.
          </p>

          <h3
            style={{
              marginTop: 24,
              fontWeight: 700,
              color: 'var(--ink)'
            }}
          >
            Supported list formats
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
            <li>Dash lists such as <code>- Apple</code></li>
            <li>Asterisk lists such as <code>* Apple</code></li>
            <li>Bullet character lists</li>
            <li>Numbered lists such as <code>1. Apple</code></li>
            <li>One item per line without list markers</li>
          </ul>

          <h3
            style={{
              marginTop: 24,
              fontWeight: 700,
              color: 'var(--ink)'
            }}
          >
            Common use cases
          </h3>

          <p className="muted" style={{ marginTop: 10 }}>
            Use the converter for task lists, product lists, meeting notes,
            feature lists, datasets and other simple collections that need a
            Markdown-friendly format.
          </p>

          <p className="muted" style={{ marginTop: 10 }}>
            The generated table can be copied directly into GitHub,
            documentation, AI prompts or Markdown editors. Processing runs
            locally in your browser.
          </p>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--line)'
            }}
          >
            <strong>Need more structured data?</strong>

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
