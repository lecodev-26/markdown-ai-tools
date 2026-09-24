import { useEffect } from 'react'

const SITE_URL = 'https://markdown-ai-tools.vercel.app'
const SITE_NAME = 'Markdown AI Tools'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

export default function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = 'website'
}) {
  useEffect(() => {
    const url = `${SITE_URL}${window.location.pathname}`

    document.title = title

    const setMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector)

      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, selector.match(/="([^"]+)"/)?.[1] || '')
        document.head.appendChild(element)
      }

      element.setAttribute('content', value)
    }

    setMeta('meta[name="description"]', 'name', description)
    setMeta('meta[name="robots"]', 'name', 'index, follow')

    setMeta('meta[property="og:type"]', 'property', type)
    setMeta('meta[property="og:url"]', 'property', url)
    setMeta('meta[property="og:title"]', 'property', title)
    setMeta('meta[property="og:description"]', 'property', description)
    setMeta('meta[property="og:image"]', 'property', image)
    setMeta('meta[property="og:site_name"]', 'property', SITE_NAME)

    setMeta('meta[name="twitter:card"]', 'name', 'summary_large_image')
    setMeta('meta[name="twitter:title"]', 'name', title)
    setMeta('meta[name="twitter:description"]', 'name', description)
    setMeta('meta[name="twitter:image"]', 'name', image)

    let canonical = document.head.querySelector('link[rel="canonical"]')

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }

    canonical.setAttribute('href', url)

    const schemaId = 'seo-json-ld'
    const existingSchema = document.getElementById(schemaId)

    if (existingSchema) {
      existingSchema.remove()
    }

    const schema = document.createElement('script')
    schema.id = schemaId
    schema.type = 'application/ld+json'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description
    })

    document.head.appendChild(schema)

    return () => {
      const currentSchema = document.getElementById(schemaId)

      if (currentSchema) {
        currentSchema.remove()
      }
    }
  }, [title, description, image, type])

  return null
}
