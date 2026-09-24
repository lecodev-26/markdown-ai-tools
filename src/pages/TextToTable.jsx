import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import { rowsToMarkdown, textToRows } from '../utils/parsers.js'

export default function TextToTable() {
  const convert = useCallback((input) => {
    if (!input.trim()) {
      return 'Your markdown table will appear here...'
    }

    const rows = textToRows(input)

    return rowsToMarkdown(rows)
  }, [])

  return (
    <ToolLayout
      badge="Text → Markdown"
      title="Text to Markdown Table Converter"
      description="Turn messy notes, lists, key-value data and simple structured text into a clean Markdown table."
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
    </ToolLayout>
  )
}
