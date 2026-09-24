import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { markdownToCsv } from '../utils/parsers.js'

export default function TableToCsv() {
  const convert = useCallback((input) => {
    if (!input.trim()) {
      return 'CSV will appear here...'
    }

    return markdownToCsv(input)
  }, [])

  return (
    <ToolLayout
      badge="Markdown → CSV"
      title="Markdown Table to CSV Converter"
      description="Paste a markdown table from GitHub, Notion or ChatGPT and get clean CSV for Excel & Google Sheets."
    >
      <Converter
        inputLabel="Markdown table"
        outputLabel="CSV output"
        placeholder={`| Name | Age | City |
| --- | --- | --- |
| Manuel | 28 | Barcelona |
| Marta | 26 | Madrid |`}
        convertFn={convert}
        downloadExt="csv"
      />

      <AdSlot />
    </ToolLayout>
  )
}
