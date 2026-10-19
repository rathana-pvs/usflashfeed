'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function pingWhosAmungUs(title: string, url?: string) {
  if (typeof window === 'undefined') return
  try {
    const siteKey = 'br9ezsevbf'
    const targetUrl = url || window.location.href
    const referrer = document.referrer || ''

    // Clean and limit title to 80 chars
    const cleanTitle = (title || 'US Flash Feed')
      .replace(/\s*—\s*US Flash (?:News|Feed).*$/i, '')
      .replace(/\s*—\s*theminutefeed.*$/i, '')
      .replace(/[\r\n\t]+/g, ' ')
      .trim()
      .slice(0, 80)
      .replace(/(\?=)|(\/)/g, '')

    const pageTitle = encodeURIComponent(cleanTitle || 'US Flash Feed')
    const pageUrl = encodeURIComponent(targetUrl)
    const pageRef = encodeURIComponent(referrer)
    const randomId = Math.ceil(99999 * Math.random())

    const pingScript = document.createElement('script')
    pingScript.id = `_wau_ping_${Date.now()}`
    pingScript.async = true
    pingScript.src = `https://whos.amung.us/pingjs/?k=${siteKey}&t=${pageTitle}&c=d&x=${pageUrl}&y=${pageRef}&a=-1&v=27&r=${randomId}`

    // Cleanup previous ping scripts to prevent memory leaks in DOM
    const oldPings = document.querySelectorAll('script[id^="_wau_ping_"]')
    oldPings.forEach((el) => {
      if (el.parentNode) el.parentNode.removeChild(el)
    })

    document.head.appendChild(pingScript)
  } catch (err) {
    console.error('Failed to ping whos.amung.us:', err)
  }
}

export function VisitorCounter() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Keep page-view tracking without loading the visible counter widget.
    try {
      localStorage.removeItem('_wautime')
      localStorage.removeItem('_waucount')
    } catch (e) {}

    // On article pages, ArticleTracker handles tracking with the exact article title.
    // Here we handle non-article routes (homepage, categories, static pages)
    if (pathname && !pathname.startsWith('/article/')) {
      const timer = setTimeout(() => {
        let title = document.title || 'US Flash Feed'
        if (pathname === '/') {
          title = 'Homepage'
        } else {
          const h1Text = document.querySelector('h1')?.textContent?.trim()
          if (h1Text) title = h1Text
        }
        pingWhosAmungUs(title)
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [pathname])

  return null
}
