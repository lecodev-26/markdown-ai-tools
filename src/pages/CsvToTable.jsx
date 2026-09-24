import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { parseCSV, rowsToMarkdown } from '../utils/parsers.js'

export default function CsvToTable() {
  const convert = useCallback((input) => {
    if (!input.trim()) {
      return 'Your markdown table will appear here...'
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
        style={{ maxWidth: 720, marginTop: 32 }}
        className="card"
      >
        <div style={{ padding: 24, lineHeight: 1.7 }}>
          <h2 className="h2" style={{ fontSize: 28 }}>
            Convert CSV to Markdown
          </h2>

          <p className="muted" style={{ marginTop: 12 }}>
            Paste CSV data and get a Markdown table ready for GitHub,
            documentation, AI prompts or note-taking apps. The parser
            recognizes common delimiters and respects quoted fields, so
            commas inside quoted values do not create unwanted columns.
          </p>

          <p className="muted" style={{ marginTop: 12 }}>
            Processing happens directly in your browser, so the CSV content
            you paste is not uploaded to a conversion server.
          </p>
        </div>
      </article>
    </ToolLayout>
  )
}
