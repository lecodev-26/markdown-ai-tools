import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer style={{borderTop:'1px solid var(--line)', padding:'40px 0'}}>
      <div className="container" style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:24}}>
        <div>
          <div style={{fontFamily:'var(--font-display)', fontWeight:700, fontSize:18}}>Markdown AI Tools</div>
          <div className="small muted mono" style={{marginTop:6, maxWidth:360}}>
            Free, privacy-first tools to convert messy text into perfect markdown tables for AI, Notion & GitHub. No signup. No data stored.
          </div>
        </div>
        <div style={{display:'flex', gap:32}} className="small mono">
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <span style={{fontWeight:700}}>Tools</span>
            <Link to="/text-to-table" className="muted">Text to Table</Link>
            <Link to="/csv-to-table" className="muted">CSV to Table</Link>
            <Link to="/list-to-table" className="muted">List to Table</Link>
            <Link to="/table-to-csv" className="muted">Table to CSV</Link>
            <Link to="/cleaner" className="muted">Markdown Cleaner</Link>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <span style={{fontWeight:700}}>Legal</span>
            <Link to="/privacy" className="muted">Privacy Policy</Link>
            <Link to="/terms" className="muted">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
