import React from 'react'
import SEO from './SEO.jsx'

export default function ToolLayout({
  badge,
  title,
  description,
  seoTitle,
  seoDescription,
  children
}) {
  return (
    <div className="container">
      <SEO
        title={seoTitle || `${title} — Markdown AI Tools`}
        description={seoDescription || description}
      />

      <div style={{ maxWidth: 760, margin: '0 auto 32px' }}>
        <span className="badge">{badge}</span>

        <h1
          className="h1"
          style={{ margin: '16px 0 12px' }}
        >
          {title}
        </h1>

        <p
          className="muted"
          style={{ fontSize: 18, lineHeight: 1.5 }}
        >
          {description}
        </p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {children}
      </div>
    </div>
  )
}
