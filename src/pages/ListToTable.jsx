import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import { rowsToMarkdown } from '../utils/parsers.js'

export default function ListToTable(){
  const convert = useCallback((input)=>{
    if(!input.trim()) return 'Your markdown table will appear here...'
    const lines = input.split('\n').map(s=>s.trim()).filter(Boolean).map(s=>s.replace(/^[-*•\d.]+\s*/,''))
    const rows = [['Item','#'], ...lines.map((l,i)=>[l, String(i+1)])]
    return rowsToMarkdown(rows)
  },[])

  return (
    <ToolLayout 
      badge="List → Table"
      title="List to Markdown Table"
      description="Convert bullet lists, numbered lists or one-item-per-line into a clean 2-column markdown table."
    >
      <Converter 
        inputLabel="List input"
        outputLabel="Markdown table"
        placeholder={`- Apple\n- Banana\n- Orange\n- Mango`}
        convertFn={convert}
      />
    </ToolLayout>
  )
}
