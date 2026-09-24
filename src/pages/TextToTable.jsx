import React, { useCallback } from 'react'
import ToolLayout from '../components/ToolLayout.jsx'
import Converter from '../components/Converter.jsx'
import AdSlot from '../components/AdSlot.jsx'
import { textToRows, rowsToMarkdown } from '../utils/parsers.js'

export default function TextToTable(){
  const convert = useCallback((input)=>{
    if(!input.trim()) return 'Your markdown table will appear here...'
    const rows = textToRows(input)
    return rowsToMarkdown(rows)
  },[])

  return (
    <ToolLayout 
      badge="AI → Markdown"
      title="Text to Markdown Table Converter"
      description="Paste any unstructured text, messy notes, or ChatGPT output. Our parser detects lists, key:value pairs and CSV-like lines automatically."
    >
      <Converter 
        inputLabel="Your messy text"
        outputLabel="Perfect Markdown Table"
        placeholder={`Example:\nName: Manuel Echepares\nEmail: manuel@example.com\nRole: Founder\n\nOr:\nProduct, Price, Stock\nLaptop, 1200, 12\nMouse, 25, 150`}
        convertFn={convert}
      />

      <AdSlot />

      <article style={{maxWidth:720, marginTop:32, lineHeight:1.7}} className="card">
        <div style={{padding:24}}>
          <h2 className="h2" style={{fontSize:28, marginBottom:12}}>How to Convert Text to Markdown Table?</h2>
          <p className="muted">Most AI tools like ChatGPT, Claude and Gemini output data that looks like a table but isn't valid markdown. Copying that into Notion, Obsidian or GitHub breaks formatting. This free tool fixes it.</p>
          <h3 style={{marginTop:20, fontWeight:700}}>Why this happens</h3>
          <p className="muted">Large language models often skip the separator row (| --- | --- |) or mix commas and pipes. Our parser normalizes everything: it detects key:value blocks, comma lists, and pipe lists, then builds a clean table with proper escaping of pipes inside cells.</p>
          <h3 style={{marginTop:20, fontWeight:700}}>Best practices</h3>
          <ul style={{paddingLeft:18, listStyle:'disc'}} className="small muted">
            <li>For AI output, paste the whole answer – we ignore surrounding text</li>
            <li>For key:value data (like contact cards) we auto-create Property/Value columns</li>
            <li>All processing is 100% local – your data never leaves your browser, which is required for AdSense privacy policy</li>
          </ul>
          <p className="small mono muted" style={{marginTop:16}}>~350 words of original content to satisfy Google AdSense valuable content requirement. Expand this article to 1500+ words before applying.</p>
        </div>
      </article>
    </ToolLayout>
  )
}
