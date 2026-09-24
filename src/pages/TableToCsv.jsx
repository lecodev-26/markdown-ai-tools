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
      description="Convert Markdown tables from GitHub, Notion, ChatGPT and documentation into CSV for spreadsheets."
      seoTitle="Markdown Table to CSV Converter — Free Online Tool"
      seoDescription="Convert Markdown tables to CSV for Excel, Google Sheets and other spreadsheet apps. Handles escaped pipes and inconsistent Markdown tables."
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
