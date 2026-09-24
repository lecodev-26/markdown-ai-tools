import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import { rowsToMarkdown } from '../utils/parsers.js'

export default function ListToTable() {
  const convert = useCallback((input) => {
    if (!input.trim()) {
      return 'Your markdown table will appear here...'
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
    </ToolLayout>
  )
}
