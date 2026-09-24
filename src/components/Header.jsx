import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header(){
  return (
    <header style={{borderBottom:'1px solid var(--line)', background:'rgba(250,246,241,0.8)', backdropFilter:'blur(12px)', position:'sticky', top:0, zIndex:50}}>
      <div className="container" style={{height:64, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <Link to="/" style={{display:'flex', alignItems:'center', gap:10, fontWeight:700, color:'var(--ink)', textDecoration:'none'}}>
          <img 
            src="/apple-touch-icon.png" 
            alt="Markdown AI Tools Logo" 
            width="32" 
            height="32"
            style={{width:32, height:32, borderRadius:8, objectFit:'cover', display:'block'}}
          />
          <span style={{fontFamily:'var(--font-display)', fontSize:18, letterSpacing:'-0.02em'}}>Markdown AI Tools</span>
        </Link>
        <nav style={{display:'flex', gap:18, fontSize:14, fontWeight:500}} className="mono">
          <NavLink to="/text-to-table" style={({isActive})=>({opacity:isActive?1:0.6, color:'inherit', textDecoration:'none'})}>Text → Table</NavLink>
          <NavLink to="/csv-to-table" style={({isActive})=>({opacity:isActive?1:0.6, color:'inherit', textDecoration:'none'})}>CSV → MD</NavLink>
          <NavLink to="/cleaner" style={({isActive})=>({opacity:isActive?1:0.6, color:'inherit', textDecoration:'none'})}>Cleaner</NavLink>
        </nav>
      </div>
    </header>
  )
}
