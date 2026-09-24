import React from 'react'
import { Link } from 'react-router-dom'
import AdSlot from '../components/AdSlot.jsx'

const tools = [
  {slug:'/text-to-table', name:'Text to Markdown Table', desc:'Paste messy notes, emails, or AI output. We detect structure and turn it into a perfect table.', tag:'Most Popular'},
  {slug:'/csv-to-table', name:'CSV to Markdown Table', desc:'Handles commas, semicolons, tabs and pipes. Auto-detects delimiter + handles quotes.', tag:'CSV'},
  {slug:'/list-to-table', name:'List to Markdown Table', desc:'Turn bullet lists or one-per-line items into a clean 2-column table.', tag:'Lists'},
  {slug:'/table-to-csv', name:'Markdown Table to CSV', desc:'Reverse conversion. Perfect for moving Notion/GitHub tables to Excel/Sheets.', tag:'Reverse'},
  {slug:'/cleaner', name:'Markdown Table Cleaner', desc:'Fix broken pipes, missing separators, inconsistent columns. One click.', tag:'Cleaner'},
]

export default function Home(){
  return (
    <div className="container">
      <section style={{padding:'40px 0 24px', maxWidth:780}}>
        <span className="badge">New • 100% Free • No Signup • Privacy-First</span>
        <h1 className="h1" style={{margin:'20px 0 16px'}}>Turn any messy text into a perfect markdown table in seconds.</h1>
        <p style={{fontSize:20, lineHeight:1.5, color:'var(--ink-soft)'}}>
          Built for AI workflows, Notion, Obsidian and GitHub. No data stored. Works 100% in your browser. Built for AdSense approval.
        </p>
        <div style={{display:'flex', gap:12, marginTop:24}}>
          <Link to="/text-to-table" className="btn">Start Converting →</Link>
          <Link to="/csv-to-table" className="btn btn-ghost">See CSV Tool</Link>
        </div>
      </section>

      <AdSlot />

      <section style={{marginTop:32}}>
        <h2 className="h2" style={{marginBottom:16}}>All Tools</h2>
        <div className="grid grid-3">
          {tools.map(t=>(
            <Link key={t.slug} to={t.slug} className="card" style={{padding:20, display:'flex', flexDirection:'column', gap:10, transition:'transform .15s'}}>
              <span className="badge" style={{alignSelf:'flex-start'}}>{t.tag}</span>
              <div style={{fontWeight:700, fontSize:18, fontFamily:'var(--font-display)'}}>{t.name}</div>
              <div className="small muted" style={{lineHeight:1.5}}>{t.desc}</div>
              <div className="small mono" style={{marginTop:'auto', paddingTop:12, fontWeight:600}}>Open →</div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{marginTop:56, maxWidth:720}} className="card">
        <div style={{padding:24}}>
          <h3 className="h2" style={{fontSize:24}}>Why this site?</h3>
          <p className="muted" style={{marginTop:12, lineHeight:1.6}}>
            ChatGPT and Claude often return tables with broken markdown. Copy-pasting from Excel creates messy pipes. This tool was built to fix that instantly, with privacy-first processing (nothing leaves your browser) and original content to pass AdSense policies easily.
          </p>
          <ul className="small mono" style={{marginTop:16, display:'grid', gap:8, paddingLeft:18, listStyle:'disc'}}>
            <li>No backend – all conversion runs client-side</li>
            <li>~2000 words of original guides per tool page (for AdSense)</li>
            <li>Ad slots ready, Privacy + Terms + Cookie consent included</li>
            <li>Fast Vite build, SEO meta tags, sitemap.xml</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
