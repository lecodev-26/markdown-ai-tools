export function detectDelimiter(text){
  const firstLine = text.trim().split('\n')[0] || ''
  const counts = {',': (firstLine.match(/,/g)||[]).length, ';': (firstLine.match(/;/g)||[]).length, '\t': (firstLine.match(/\t/g)||[]).length, '|': (firstLine.match(/\|/g)||[]).length}
  const sorted = Object.entries(counts).sort((a,b)=>b[1]-a[1])
  return sorted[0][1]===0? ',' : sorted[0][0]
}

export function csvToRows(text, delimiter){
  const d = delimiter || detectDelimiter(text)
  return text.trim().split('\n').filter(Boolean).map(line=>{
    const result=[]
    let cur='', inQ=false
    for(let i=0;i<line.length;i++){
      const c=line[i]
      if(c==='"'){ inQ=!inQ; continue }
      if(c===d &&!inQ){ result.push(cur.trim()); cur=''; continue }
      cur+=c
    }
    result.push(cur.trim())
    return result
  })
}

export function rowsToMarkdown(rows, align='left'){
  if(!rows.length) return ''
  const colCount = Math.max(...rows.map(r=>r.length))
  const norm = rows.map(r=>{
    const copy=[...r]
    while(copy.length<colCount) copy.push('')
    return copy
  })
  const esc = s => String(s||'').replace(/\|/g,'\\|').trim()
  const alignMap = {left:':--', center:':--:', right:'--:'}
  const sep = Array(colCount).fill(alignMap[align]||':--')
  const lines=[]
  lines.push('| '+norm[0].map(esc).join(' | ')+' |')
  lines.push('| '+sep.join(' | ')+' |')
  for(let i=1;i<norm.length;i++){
    lines.push('| '+norm[i].map(esc).join(' | ')+' |')
  }
  return lines.join('\n')
}

export function textToRows(input){
  const lines = input.split('\n').map(l=>l.trim()).filter(Boolean)
  if(!lines.length) return []
  if(lines[0].includes(':') && lines.every(l=>l.includes(':'))){
    const rows=[['Property','Value']]
    lines.forEach(l=>{
      const idx=l.indexOf(':')
      rows.push([l.slice(0,idx).trim(), l.slice(idx+1).trim()])
    })
    return rows
  }
  const byComma = lines.map(l=>l.split(',').map(s=>s.trim()).filter(Boolean))
  const sameLen = byComma.every(r=>r.length===byComma[0].length) && byComma[0].length>1
  if(sameLen) return byComma
  const byPipe = lines.map(l=>l.split('|').map(s=>s.trim()).filter(Boolean))
  const samePipe = byPipe.every(r=>r.length===byPipe[0].length) && byPipe[0].length>1
  if(samePipe) return byPipe
  if(lines.length===1){
    return [['Item'],...lines[0].split(/[,\n]+/).map(s=>[s.trim()]).filter(r=>r[0])]
  }
  const hasHeader = lines.length>2
  if(hasHeader){
    return [['Item','Value'],...lines.map(l=>[l])]
  }
  return lines.map(l=>[l])
}

export function cleanMarkdownTable(md){
  let t = md.trim()
  t = t.replace(/\r/g,'')
  const lines = t.split('\n').filter(l=>l.trim())
  if(lines.length<2) return t
  const cols = lines[0].split('|').filter(Boolean).length || 1
  const out=[]
  lines.forEach((line, i)=>{
    if(!line.includes('|')){
      if(i===0) return
      const cells=line.split(/,|\t/).map(s=>s.trim())
      if(cells.length===cols) out.push('| '+cells.join(' | ')+' |')
      else out.push(line)
      return
    }
    let l=line.trim()
    if(!l.startsWith('|')) l='| '+l
    if(!l.endsWith('|')) l=l+' |'
    l=l.replace(/\|\s*\|/g,'| |').replace(/\s{2,}/g,' ')
    out.push(l)
  })
  const firstData = out[0]||''
  const colCount = firstData.split('|').filter(Boolean).length
  if(out.length>=2 &&!out[1].includes('--')){
    out.splice(1,0,'| '+Array(colCount).fill('---').join(' | ')+' |')
  }
  return out.join('\n')
}

export function markdownToCsv(md){
  const lines = md.split('\n').filter(l=>l.trim().includes('|'))
  const rows = lines.filter((_,i)=>{
    if(i===1 && lines[1].includes('---')) return false
    return true
  }).map(l=>l.split('|').filter(Boolean).map(c=>c.trim().replace(/\\\|/g,'|')))
  return rows.map(r=>r.map(v=>{
    const needsQuote = v.includes(',') || v.includes('"') || v.includes('\n')
    if(needsQuote) return `"${v.replace(/"/g,'""')}"`
    return v
  }).join(',')).join('\n')
    }

export const parseCSV = csvToRows
export const markdownTableToCSV = markdownToCsv
export const cleanTable = cleanMarkdownTable
