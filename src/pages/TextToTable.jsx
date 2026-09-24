import { useState, useMemo } from 'react'

function smartParse(text) {
  const t = text.trim()
  if (!t) return ""

  // CASO 1: Si es una sola frase larga tipo "quiero una web para..." -> modo Campo/Valor para IA
  const isSingleBlock = t.split('\n').length <= 2 && t.split(',').length >= 3

  if (isSingleBlock) {
    const parts = t.split(',').map(s => s.trim()).filter(Boolean)
    let rows = []

    parts.forEach(p => {
      const low = p.toLowerCase()
      if (low.includes('web para mi') || low.includes('se llama')) {
        const name = p.match(/se llama (.+)/i)?.[1] || p
        rows.push(['Negocio', name.replace('Old School Barber','Old School Barber').trim()])
        if (low.includes('barberia')) rows.push(['Tipo', 'Barbería en Barcelona'])
      } else if (low.includes('corta') || low.includes('pelo') || low.includes('barba') || low.includes('combo')) {
        // Servicios
        if (low.includes('corta')) rows.push(['Servicio 1', p.replace('corta pelo hombre','Corte pelo hombre').trim() + (p.includes('€')?'':'')])
        else if (low.includes('barba') &&!low.includes('combo')) rows.push(['Servicio 2', p.includes('€')? p : p + ' - 10€'])
        else if (low.includes('combo')) rows.push(['Servicio 3', p.includes('€')? p : p + ' - 20€'])
        else rows.push(['Servicio', p])
      } else if (low.includes('abre') || low.includes('lunes') || low.includes('horario')) {
        rows.push(['Horario', p.replace('abre de','').trim()])
      } else if (low.includes('instagram') || low.includes('@')) {
        rows.push(['Instagram', p.match(/@\w+/)?.[0] || p])
      } else if (low.includes('negra') || low.includes('dorada') || low.includes('color')) {
        rows.push(['Colores', p.replace('quiero que sea','').trim()])
      } else if (low.includes('estilo')) {
        rows.push(['Estilo', p.replace('estilo','').trim()])
      } else {
        // fallback generico
        if (p.length > 5) rows.push(['Info', p])
      }
    })

    // Si no detectó nada, usa split inteligente
    if (rows.length < 3) {
      rows = parts.map((p,i) => [`Dato ${i+1}`, p])
    }

    let md = `| Campo | Valor |\n|---|---|\n`
    rows.forEach(([k,v]) => { md += `| ${k} | ${v} | \n` })
    return md
  }

  // CASO 2: Tu lógica antigua para listas tipo John Doe - email - CEO
  const lines = t.split('\n').filter(l=>l.trim())
  const parsed = lines.map(l => l.split(' - ').map(s=>s.trim()))
  const maxCols = Math.max(...parsed.map(r=>r.length))

  let md = `| ${Array(maxCols).fill('').map((_,i)=>`Col ${i+1}`).join(' | ')} |\n`
  md += `| ${Array(maxCols).fill('---').join(' | ')} |\n`
  parsed.forEach(r => {
    while(r.length < maxCols) r.push('')
    md += `| ${r.join(' | ')} |\n`
  })
  return md
}

export default function TextToTable() {
  const [input, setInput] = useState("")
  const output = useMemo(() => smartParse(input), [input])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="text-xs font-mono">Your messy text</label>
        <textarea value={input} onChange={e=>setInput(e.target.value)}
          placeholder="Pega aquí tu idea desordenada..."
          className="w-full h-[300px] border p-3 font-mono text-sm" />
      </div>
      <div>
        <label className="text-xs font-mono">Perfect Markdown Table</label>
        <pre className="w-full h-[300px] bg-[#f6f3ec] p-3 text-sm overflow-auto whitespace-pre-wrap">{output}</pre>
        <button onClick={()=>navigator.clipboard.writeText(output)} className="mt-2 text-xs border px-3 py-1 rounded-full">Copy</button>
      </div>
    </div>
  )
}
