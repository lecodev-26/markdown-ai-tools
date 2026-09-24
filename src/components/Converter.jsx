import React, { useState, useEffect } from 'react'

export default function Converter({ 
  inputLabel, 
  outputLabel, 
  placeholder,
  initialInput='',
  convertFn,
  downloadExt='md'
}){
  const [input, setInput] = useState(initialInput)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(()=>{
    try{
      const res = convertFn(input)
      setOutput(res)
    }catch(e){
      setOutput('Error: '+e.message)
    }
  },[input, convertFn])

  const copy = async ()=>{
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(()=>setCopied(false),1500)
  }

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:16}}>
      <div className="card" style={{padding:16}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
          <span className="small mono" style={{fontWeight:700}}>{inputLabel}</span>
          <button className="small mono muted" onClick={()=>setInput('')} style={{background:'none', border:0, cursor:'pointer'}}>Clear</button>
        </div>
        <textarea className="textarea" placeholder={placeholder} value={input} onChange={e=>setInput(e.target.value)} style={{minHeight:380}} />
        <div className="small mono muted" style={{marginTop:8}}>{input.length} chars</div>
      </div>

      <div className="card" style={{padding:16, display:'flex', flexDirection:'column'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
          <span className="small mono" style={{fontWeight:700}}>{outputLabel}</span>
          <div style={{display:'flex', gap:8}}>
            <button className="btn btn-ghost" style={{height:28, padding:'0 12px', fontSize:12}} onClick={copy}>{copied?'Copied ✓':'Copy'}</button>
          </div>
        </div>
        <pre className="textarea" style={{minHeight:380, background:'var(--bg-soft)', overflow:'auto'}}>{output}</pre>
      </div>
    </div>
  )
}
