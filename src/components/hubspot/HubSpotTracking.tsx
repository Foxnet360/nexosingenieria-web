'use client'

import Script from 'next/script'

export default function HubSpotTracking() {
  const hubspotId = process.env.NEXT_PUBLIC_HUBSPOT_ID

  if (!hubspotId) {
    console.warn('HubSpot ID not configured')
    return null
  }

  return (
    <Script
      id="hubspot-tracking"
      strategy="afterInteractive"
      src={`//js.hs-scripts.com/${hubspotId}.js`}
    />
  )
}
