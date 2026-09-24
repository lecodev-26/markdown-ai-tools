import React from 'react'

export default function Privacy(){
  return (
    <div className="container" style={{maxWidth:720, lineHeight:1.7}}>
      <h1 className="h1">Privacy Policy</h1>
      <p className="small mono muted" style={{marginTop:8}}>Last updated: May 13, 2026</p>
      <div style={{marginTop:24, display:'grid', gap:16}} className="muted">
        <p>At TableConvert.io we take your privacy seriously. All table conversions happen 100% client-side in your browser. We do not store, transmit or see the data you paste.</p>
        <h3 style={{fontWeight:700, color:'var(--ink)'}}>Cookies & Ads</h3>
        <p>We use Google AdSense to display ads. Google may use cookies and web beacons to serve personalized ads based on your visits to this and other sites. You can opt out at adssettings.google.com. We also use Google Analytics 4 to understand usage anonymously.</p>
        <h3 style={{fontWeight:700, color:'var(--ink)'}}>Data</h3>
        <p>No account required. We do not collect personal data unless you contact us via email. In that case we only store what you send to reply.</p>
        <h3 style={{fontWeight:700, color:'var(--ink)'}}>Contact</h3>
        <p>For any privacy request: hello@tableconvert.io</p>
      </div>
    </div>
  )
}
