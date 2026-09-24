import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import { cleanMarkdownTable } from '../utils/parsers.js'

export default function MarkdownCleaner() {
  const convert = useCallback((input) => {
    if (!input.trim()) {
      return 'Cleaned table will appear here...'
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
    </ToolLayout>
  )
}
