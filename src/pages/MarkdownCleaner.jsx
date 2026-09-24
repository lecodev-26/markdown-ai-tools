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
      badge="Fixer"
      title="Markdown Table Cleaner & Formatter"
      description="Fix broken markdown tables: missing pipes, inconsistent columns, missing separator rows and extra spaces."
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
