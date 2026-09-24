import React from 'react'

export default function Terms(){
  return (
    <div className="container" style={{maxWidth:720, lineHeight:1.7}}>
      <h1 className="h1">Terms of Service</h1>
      <p className="small mono muted" style={{marginTop:8}}>Last updated: May 13, 2026</p>
      <div style={{marginTop:24, display:'grid', gap:16}} className="muted">
        <p>By using TableConvert.io you agree to these terms. The tools are provided as-is, free of charge, without warranty.</p>
        <h3 style={{fontWeight:700, color:'var(--ink)'}}>Use</h3>
        <p>You may use the tools for personal and commercial purposes. Do not abuse, scrape aggressively, or attempt to reverse-engineer ad implementations.</p>
        <h3 style={{fontWeight:700, color:'var(--ink)'}}>Intellectual Property</h3>
        <p>Original guides and UI are © TableConvert.io. Markdown and CSV outputs belong to you.</p>
        <h3 style={{fontWeight:700, color:'var(--ink)'}}>Liability</h3>
        <p>We are not liable for data loss or formatting errors. Always keep a backup of important data.</p>
      </div>
    </div>
  )
}
