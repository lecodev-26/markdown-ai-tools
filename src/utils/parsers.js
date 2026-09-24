export function detectDelimiter(text) {
  const source = String(text || '').replace(/^\uFEFF/, '')
  const candidates = [',', ';', '\t', '|']

  let bestDelimiter = ','
  let bestCount = 0

  // Analizamos varios caracteres, ignorando delimitadores dentro de comillas.
  let inQuotes = false
  const counts = Object.fromEntries(candidates.map(delimiter => [delimiter, 0]))

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i]

    if (char === '"') {
      if (inQuotes && source[i + 1] === '"') {
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }

    if (!inQuotes && candidates.includes(char)) {
      counts[char] += 1
    }

    // No necesitamos recorrer un archivo enorme entero para detectar
    // el delimitador. Con los primeros 10.000 caracteres es suficiente.
    if (i >= 10000) break
  }

  for (const delimiter of candidates) {
    if (counts[delimiter] > bestCount) {
      bestDelimiter = delimiter
      bestCount = counts[delimiter]
    }
  }

  return bestDelimiter
}

export function csvToRows(text, delimiter) {
  const source = String(text ?? '').replace(/^\uFEFF/, '')

  if (!source.trim()) return []

  const d = delimiter || detectDelimiter(source)

  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i]

    // Dentro de una celda entre comillas.
    if (inQuotes) {
      if (char === '"') {
        // CSV escaped quote: ""
        if (source[i + 1] === '"') {
          cell += '"'
          i += 1
        } else {
          inQuotes = false
        }
      } else {
        // Esto permite saltos de línea dentro de una celda.
        cell += char
      }

      continue
    }

    // Inicio de una celda entre comillas.
    if (char === '"' && cell.trim() === '') {
      inQuotes = true
      continue
    }

    // Delimitador.
    if (char === d) {
      row.push(cell.trim())
      cell = ''
      continue
    }

    // Fin de línea.
    if (char === '\n' || char === '\r') {
      if (char === '\r' && source[i + 1] === '\n') {
        i += 1
      }

      row.push(cell.trim())
      cell = ''

      // Ignoramos líneas completamente vacías.
      if (row.some(value => value !== '')) {
        rows.push(row)
      }

      row = []
      continue
    }

    cell += char
  }

  // Última fila.
  row.push(cell.trim())

  if (row.some(value => value !== '')) {
    rows.push(row)
  }

  return rows
}

function escapeMarkdownCell(value) {
  const text = String(value ?? '').trim()

  let result = ''
  let backslashCount = 0

  for (const char of text) {
    if (char === '\\') {
      result += char
      backslashCount += 1
      continue
    }

    if (char === '|') {
      // Si ya existe un número impar de backslashes,
      // el pipe ya está escapado.
      if (backslashCount % 2 === 0) {
        result += '\\|'
      } else {
        result += '|'
      }

      backslashCount = 0
      continue
    }

    result += char
    backslashCount = 0
  }

  // Markdown tables no soportan saltos de línea reales dentro de una celda.
  return result.replace(/\r?\n/g, '<br>')
}

export function rowsToMarkdown(rows, align = 'left') {
  if (!Array.isArray(rows) || rows.length === 0) {
    return ''
  }

  const colCount = Math.max(
    1,
    ...rows.map(row => Array.isArray(row) ? row.length : 0)
  )

  const normalizedRows = rows.map(row => {
    const normalized = Array.isArray(row) ? [...row] : [row]

    while (normalized.length < colCount) {
      normalized.push('')
    }

    return normalized.slice(0, colCount)
  })

  const alignMap = {
    left: '---',
    center: ':---:',
    right: '---:'
  }

  const separator = Array(colCount).fill(
    alignMap[align] || alignMap.left
  )

  const lines = [
    `| ${normalizedRows[0].map(escapeMarkdownCell).join(' | ')} |`,
    `| ${separator.join(' | ')} |`
  ]

  for (let i = 1; i < normalizedRows.length; i += 1) {
    lines.push(
      `| ${normalizedRows[i].map(escapeMarkdownCell).join(' | ')} |`
    )
  }

  return lines.join('\n')
}

export function textToRows(input) {
  const text = String(input ?? '').trim()

  if (!text) return []

  const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)

  // Caso 1: formato Campo: Valor
  const keyValueRows = lines
    .map(line => {
      const match = line.match(
        /^[-*•]?\s*([^:]{1,80}):\s*(.+)$/
      )

      if (!match) return null

      return [
        match[1].trim(),
        match[2].trim()
      ]
    })
    .filter(Boolean)

  if (keyValueRows.length === lines.length) {
    return [
      ['Field', 'Value'],
      ...keyValueRows
    ]
  }

  // Quitamos bullets y numeración antes de intentar detectar columnas.
  const cleanLines = lines.map(line =>
    line
      .replace(/^\s*(?:[-*•]|\d+[.)])\s+/, '')
      .trim()
  )

  // Caso 2: datos estructurados.
  // Probamos delimitadores comunes.
  const delimiters = [',', '|', '\t', ';']

  for (const delimiter of delimiters) {
    const rows = cleanLines.map(line =>
      line.split(delimiter).map(cell => cell.trim())
    )

    const width = rows[0]?.length || 0

    if (
      width > 1 &&
      rows.every(row => row.length === width)
    ) {
      return rows
    }
  }

  // Caso 3: lista genérica.
  return [
    ['Item'],
    ...cleanLines.map(item => [item])
  ]
}

function splitMarkdownRow(line) {
  let value = line.trim()

  // Soporta tablas con o sin pipe exterior.
  if (value.startsWith('|')) {
    value = value.slice(1)
  }

  if (
    value.endsWith('|') &&
    !value.endsWith('\\|')
  ) {
    value = value.slice(0, -1)
  }

  const cells = []
  let cell = ''
  let escaped = false

  for (const char of value) {
    if (escaped) {
      cell += char
      escaped = false
      continue
    }

    if (char === '\\') {
      cell += char
      escaped = true
      continue
    }

    if (char === '|') {
      cells.push(cell.trim())
      cell = ''
      continue
    }

    cell += char
  }

  cells.push(cell.trim())

  return cells
}

function isMarkdownSeparator(row) {
  return (
    row.length > 0 &&
    row.every(cell => /^:?-{3,}:?$/.test(cell.trim()))
  )
}

function unescapeMarkdownCell(value) {
  let result = ''
  let escaped = false

  for (const char of value) {
    if (escaped) {
      if (char === '|') {
        result += '|'
      } else {
        result += '\\' + char
      }

      escaped = false
      continue
    }

    if (char === '\\') {
      escaped = true
      continue
    }

    result += char
  }

  if (escaped) {
    result += '\\'
  }

  return result
}

export function markdownToRows(md) {
  const lines = String(md ?? '')
    .replace(/\r/g, '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)

  // Nos quedamos con líneas que realmente pueden ser filas.
  const tableLines = lines.filter(line => line.includes('|'))

  if (tableLines.length === 0) {
    return []
  }

  const parsedRows = tableLines.map(splitMarkdownRow)

  // Eliminamos la fila de separación Markdown.
  const rows = parsedRows.filter(
    row => !isMarkdownSeparator(row)
  )

  if (rows.length === 0) {
    return []
  }

  const columnCount = Math.max(
    1,
    ...rows.map(row => row.length)
  )

  return rows.map(row => {
    const normalized = row.map(cell =>
      unescapeMarkdownCell(cell)
    )

    while (normalized.length < columnCount) {
      normalized.push('')
    }

    return normalized.slice(0, columnCount)
  })
}

export function markdownToCsv(md) {
  const rows = markdownToRows(md)

  return rows
    .map(row =>
      row
        .map(cell => {
          const value = String(cell ?? '')

          const needsQuotes =
            value.includes(',') ||
            value.includes('"') ||
            value.includes('\n') ||
            value.includes('\r')

          if (needsQuotes) {
            return `"${value.replace(/"/g, '""')}"`
          }

          return value
        })
        .join(',')
    )
    .join('\n')
}

export function cleanMarkdownTable(md) {
  const rows = markdownToRows(md)

  if (rows.length === 0) {
    return String(md ?? '').trim()
  }

  return rowsToMarkdown(rows)
}

export const parseCSV = csvToRows
export const markdownTableToCSV = markdownToCsv
export const cleanTable = cleanMarkdownTable
