import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import AdSlot from '../components/AdSlot.jsx'

function markdownTableToCSV(md){
  const lines = md.trim().split('\n').filter(l=>l.trim().startsWith('|'))
  if(lines.length < 2) return ''
  const dataLines = lines.filter(l=>!l.match(/^\|?\s*[-|:\s]+\s*\|?\s*$/))
  const rows = dataLines.map(l=>{
    return l.trim().replace(/^\|/,'').replace(/\|$/,'').split('|').map(c=>c.trim())
  })
  return rows.map(r=>r.map(cell=>{
    if(cell.includes(',') || cell.includes('"') || cell.includes('\n')){
      return `"${cell.replace(/"/g,'""')}"`
    }
    return cell
  }).join(',')).join('\n')
}

export default function TableToCsv(){
  const convert = useCallback((input)=>{
    if(!input.trim()) return 'CSV will appear here...'
    return markdownTableToCSV(input)
  },[])

  return (
    <ToolLayout 
      badge="Markdown → CSV"
      title="Markdown Table to CSV Converter"
      description="Paste a markdown table from GitHub, Notion or ChatGPT and get clean CSV for Excel & Google Sheets."
    >
      <Converter 
        inputLabel="Markdown table"
        outputLabel="CSV output"
        placeholder={`| Name | Age | City |\n| --- | --- | --- |\n| Manuel | 28 | Barcelona |`}
        convertFn={convert}
        downloadExt="csv"
      />
      <AdSlot />
    </ToolLayout>
  )
}
