import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner(){
  const [show, setShow] = useState(false)
  useEffect(()=>{
    const c = localStorage.getItem('cookie-consent')
    if(!c) setShow(true)
  },[])
  if(!show) return null
  return (
    <div style={{position:'fixed', bottom:16, left:16, right:16, maxWidth:520, margin:'0 auto', zIndex:100, background:'var(--ink)', color:'white', borderRadius:16, padding:'16px 18px', display:'flex', gap:16, alignItems:'flex-start', boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
      <div className="small" style={{lineHeight:1.5}}>
        We use cookies for analytics and ads. By continuing, you agree to our <Link to="/privacy" style={{textDecoration:'underline'}}>Privacy Policy</Link>.
      </div>
      <div style={{display:'flex', gap:8, flexShrink:0}}>
        <button className="btn btn-ghost" style={{height:36, background:'white', color:'var(--ink)'}} onClick={()=>{localStorage.setItem('cookie-consent','yes'); setShow(false)}}>Accept</button>
        <button className="btn btn-ghost" style={{height:36, borderColor:'rgba(255,255,255,0.3)', color:'white'}} onClick={()=>{localStorage.setItem('cookie-consent','no'); setShow(false)}}>Decline</button>
      </div>
    </div>
  )
}
