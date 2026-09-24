import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header(){
  return (
    <header style={{borderBottom:'1px solid var(--line)', background:'rgba(250,246,241,0.8)', backdropFilter:'blur(12px)', position:'sticky', top:0, zIndex:50}}>
      <div className="container" style={{height:64, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <Link to="/" style={{display:'flex', alignItems:'center', gap:10, fontWeight:700}}>
          <img src="/apple-touch-icon.png" alt="Logo" width="32" height="32" style={{width:32, height:32, borderRadius:8, objectFit:'cover'}} />
          <span style={{fontFamily:'var(--font-display)', fontSize:18}}>Markdown AI Tools</span>
        </Link>
        <nav style={{display:'flex', gap:18, fontSize:14, fontWeight:500}} className="mono">
          <NavLink to="/text-to-table">Text → Table</NavLink>
          <NavLink to="/csv-to-table">CSV → MD</NavLink>
          <NavLink to="/cleaner">Cleaner</NavLink>
        </nav>
      </div>
    </header>
  )
}
