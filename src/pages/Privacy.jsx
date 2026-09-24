import React from 'react'
import SEO from '../components/SEO.jsx'

export default function Privacy() {
  return (
    <div
      className="container"
      style={{
        maxWidth: 720,
        lineHeight: 1.7
      }}
    >
      <SEO
        title="Privacy Policy — Markdown AI Tools"
        description="Read the Markdown AI Tools privacy policy and learn how browser-based conversions, cookies and advertising are handled."
      />

      <h1 className="h1">
        Privacy Policy
      </h1>

      <p
        className="small mono muted"
        style={{ marginTop: 8 }}
      >
        Last updated: September 24, 2026
      </p>

      <div
        className="muted"
        style={{
          marginTop: 24,
          display: 'grid',
          gap: 16
        }}
      >
        <p>
          Markdown AI Tools is designed so that table conversions happen
          directly in your browser. The text and data you paste into the
          conversion tools are processed locally and are not intentionally
          uploaded to a conversion server by the site.
        </p>

        <h2
          style={{
            fontWeight: 700,
            color: 'var(--ink)'
          }}
        >
          Cookies & Advertising
        </h2>

        <p>
          Markdown AI Tools uses Google AdSense to display advertising.
          Google and its advertising partners may use cookies, local storage,
          web beacons, IP addresses or similar technologies to serve, measure
          and personalize advertising, subject to applicable settings and
          consent requirements.
        </p>

        <p>
          In the European Economic Area, the United Kingdom and Switzerland,
          Google’s Privacy &amp; Messaging system may display a consent message
          and provide users with choices about advertising and related data
          processing. Consent choices can be changed through the mechanisms
          provided by Google.
        </p>

        <p>
          Google may use advertising cookies to help serve relevant ads,
          measure advertising performance and avoid repeatedly showing the same
          ads. Users can manage Google advertising personalization through
          Google’s advertising settings.
        </p>

        <h2
          style={{
            fontWeight: 700,
            color: 'var(--ink)'
          }}
        >
          Local Processing
        </h2>

        <p>
          The conversion tools do not require an account. Conversion operations
          such as parsing CSV, creating Markdown tables and cleaning Markdown
          are performed in your browser. However, third-party technologies
          used for advertising may process information according to their own
          policies and applicable settings.
        </p>

        <h2
          style={{
            fontWeight: 700,
            color: 'var(--ink)'
          }}
        >
          Your Data
        </h2>

        <p>
          You retain your rights to the text and data you provide to the
          conversion tools. Because this is an online service, do not paste
          confidential or sensitive information unless you are comfortable with
          the risks of using the service and any third-party technologies
          present on the page.
        </p>

        <h2
          style={{
            fontWeight: 700,
            color: 'var(--ink)'
          }}
        >
          Third-Party Services
        </h2>

        <p>
          Google AdSense and related Google advertising technologies are
          third-party services used by the site. Their handling of information
          is governed by their own policies and settings in addition to the
          disclosures provided on this page.
        </p>

        <h2
          style={{
            fontWeight: 700,
            color: 'var(--ink)'
          }}
        >
          Contact
        </h2>

        <p>
          For privacy questions or requests, please use the contact information
          provided by the site owner.
        </p>
      </div>
    </div>
  )
}
