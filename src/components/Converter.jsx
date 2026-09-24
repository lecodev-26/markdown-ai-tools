import React, { useEffect, useState } from 'react'

function getStats(value) {
  const text = String(value ?? '')

  return {
    chars: text.length,
    lines: text ? text.split(/\r?\n/).length : 0
  }
}

export default function Converter({
  inputLabel,
  outputLabel,
  placeholder,
  initialInput = '',
  convertFn,
  downloadExt = 'md'
}) {
  const [input, setInput] = useState(initialInput)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      setError('')
      const result = convertFn(input)
      setOutput(String(result ?? ''))
    } catch (err) {
      setOutput('')
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }, [input, convertFn])

  const inputStats = getStats(input)
  const outputStats = getStats(output)

  const copy = async () => {
    if (!output) return

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(output)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = output
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        textarea.remove()
      }

      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {
      setCopied(false)
    }
  }

  const download = () => {
    if (!output) return

    const extension = String(downloadExt || 'md').replace(/^\./, '')
    const mimeType =
      extension === 'csv'
        ? 'text/csv;charset=utf-8'
        : 'text/markdown;charset=utf-8'

    const blob = new Blob([output], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = url
    anchor.download = `markdown-ai-tools.${extension}`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()

    URL.revokeObjectURL(url)
  }

  const clear = () => {
    setInput('')
    setCopied(false)
    setError('')
  }

  return (
    <div className="converter-grid">
      <section className="card converter-card" aria-labelledby="converter-input-label">
        <div className="converter-header">
          <span
            id="converter-input-label"
            className="small mono"
            style={{ fontWeight: 700 }}
          >
            {inputLabel}
          </span>

          <button
            type="button"
            className="text-button small mono muted"
            onClick={clear}
            disabled={!input}
            aria-label="Clear input"
          >
            Clear
          </button>
        </div>

        <textarea
          className="textarea converter-textarea"
          placeholder={placeholder}
          value={input}
          onChange={event => setInput(event.target.value)}
          aria-label={inputLabel}
          spellCheck="false"
        />

        <div className="converter-footer">
          <span className="small mono muted">
            {inputStats.chars} chars · {inputStats.lines} lines
          </span>
        </div>
      </section>

      <section className="card converter-card" aria-labelledby="converter-output-label">
        <div className="converter-header">
          <span
            id="converter-output-label"
            className="small mono"
            style={{ fontWeight: 700 }}
          >
            {outputLabel}
          </span>

          <div className="converter-actions">
            <button
              type="button"
              className="btn btn-ghost converter-action"
              onClick={copy}
              disabled={!output || Boolean(error)}
              aria-label="Copy output"
            >
              {copied ? 'Copied ✓' : 'Copy'}
            </button>

            <button
              type="button"
              className="btn converter-action"
              onClick={download}
              disabled={!output || Boolean(error)}
              aria-label={`Download ${downloadExt} file`}
            >
              Download
            </button>
          </div>
        </div>

        {error ? (
          <div className="converter-error" role="alert">
            <strong>Conversion error</strong>
            <span>{error}</span>
          </div>
        ) : (
          <pre
            className="textarea converter-output"
            aria-label={outputLabel}
          >
            {output || 'Your converted output will appear here...'}
          </pre>
        )}

        <div className="converter-footer">
          <span className="small mono muted">
            {outputStats.chars} chars · {outputStats.lines} lines
          </span>

          <span className="small mono muted">
            Runs locally in your browser
          </span>
        </div>
      </section>
    </div>
  )
}
