import React, { useEffect } from 'react'

export default function AdSlot({ id, label='Advertisement' }){
  useEffect(()=>{
    try{
      if(window.adsbygoogle) window.adsbygoogle.push({})
    }catch(e){}
  },[])

  return (
    <div style={{border:'1px dashed var(--line)', borderRadius:12, padding:12, background:'var(--bg-soft)', margin:'24px 0'}}>
      <div className="small mono muted" style={{textAlign:'center', marginBottom:8, letterSpacing:'0.08em', textTransform:'uppercase', fontSize:10}}>{label}</div>
      <ins className="adsbygoogle"
        style={{display:'block'}}
        data-ad-client="ca-pub-XXXXXXXXXXXX"
        data-ad-slot={id || "0000000000"}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <div className="small mono muted" style={{textAlign:'center', fontSize:11, marginTop:6}}>
        Replace <code>ca-pub-XXXX</code> with your AdSense ID after approval
      </div>
    </div>
  )
}
