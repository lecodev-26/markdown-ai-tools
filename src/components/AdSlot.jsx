import React, { useEffect } from 'react'

const ADSENSE_CLIENT = 'ca-pub-5639107439969668'
const DEFAULT_AD_SLOT = '8234765509'

export default function AdSlot({
  id = DEFAULT_AD_SLOT,
  label = 'Advertisement'
}) {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch {
      // AdSense may not be available while the account or site is under review.
    }
  }, [])

  return (
    <div
      style={{
        border: '1px dashed var(--line)',
        borderRadius: 12,
        padding: 12,
        background: 'var(--bg-soft)',
        margin: '24px 0'
      }}
    >
      <div
        className="small mono muted"
        style={{
          textAlign: 'center',
          marginBottom: 8,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontSize: 10
        }}
      >
        {label}
      </div>

      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
