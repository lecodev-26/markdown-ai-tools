import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'

function cleanTable(md){
  let lines = md.split('\n').map(l=>l.trim()).filter(Boolean)
  lines = lines.filter(l=>l.includes('|'))
  if(lines.length===0) return md
  
  // Normalize rows
  let rows = lines.map(l=>l.replace(/^\|/,'').replace(/\|$/,'').split('|').map(c=>c.trim()))
  const colCount = Math.max(...rows.map(r=>r.length))
  rows = rows.map(r=>{
    while(r.length < colCount) r.push('')
    return r.slice(0,colCount)
  })
  // Ensure separator row exists
  const hasSeparator = rows.some(r=>r.every(c=>/^[-:]+$/.test(c)))
  if(!hasSeparator && rows.length>1){
    rows.splice(1,0, Array(colCount).fill('---'))
  }
  // Escape pipes inside cells (already split, so just rebuild)
  return rows.map((r,i)=>{
    if(i===1 && r.every(c=>/^[-:]+$/.test(c))){
      return '| ' + r.join(' | ') + ' |'
    }
    return '| ' + r.map(c=>c.replace(/\|/g,'\\|')).join(' | ') + ' |'
  }).join('\n')
}

export default function MarkdownCleaner(){
  const convert = useCallback((input)=>{
    if(!input.trim()) return 'Cleaned table will appear here...'
    return cleanTable(input)
  },[])
  return (
    <ToolLayout 
      badge="Fixer"
      title="Markdown Table Cleaner & Formatter"
      description="Fix broken markdown tables: missing pipes, inconsistent columns, no separator row, extra spaces."
    >
      <Converter 
        inputLabel="Broken markdown"
        outputLabel="Fixed markdown"
        placeholder={`Name | Age | City\n--- | --- | ---\nManuel | 28\nMarta | 26 | Madrid | Extra`}
        convertFn={convert}
      />
    </ToolLayout>
  )
}
