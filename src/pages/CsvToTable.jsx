import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { parseCSV, rowsToMarkdown } from '../utils/parsers.js'

export default function CsvToTable(){
  const convert = useCallback((input)=>{
    if(!input.trim()) return 'Your markdown table will appear here...'
    const rows = parseCSV(input)
    return rowsToMarkdown(rows)
  },[])

  return (
    <ToolLayout 
      badge="CSV → Markdown"
      title="CSV to Markdown Table Converter"
      description="Paste CSV with any delimiter: comma, semicolon, tab or pipe. Auto-detects, handles quoted fields and newlines inside cells."
    >
      <Converter 
        inputLabel="CSV input"
        outputLabel="Markdown output"
        placeholder={`name,age,city\nManuel,28,Barcelona\nMarta,26,Madrid\n"Doe, John",31,"New York, NY"`}
        convertFn={convert}
      />
      <AdSlot />
      <article style={{maxWidth:720, marginTop:32}} className="card"><div style={{padding:24, lineHeight:1.7}}>
        <h2 className="h2" style={{fontSize:28}}>How CSV to Markdown Works</h2>
        <p className="muted" style={{marginTop:12}}>Unlike simple split(",") converters, this uses a full RFC-4180 compatible parser. It respects quotes, so values like "Doe, John" don't break columns. It also auto-detects delimiters – if your file uses ; (common in Europe) or tab, it switches automatically.</p>
      </div></article>
    </ToolLayout>
  )
}
