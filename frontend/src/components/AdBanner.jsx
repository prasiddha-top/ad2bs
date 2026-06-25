import { useEffect, useRef } from 'react'

/**
 * Google AdSense Ad unit component
 * slot: ad slot ID (or 'auto' for auto ads)
 * format: 'auto', 'rectangle', 'horizontal', 'vertical'
 */
export default function AdBanner({ slot = 'auto', format = 'auto', className = '', style = {} }) {
  const adRef = useRef(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (e) {
      // AdSense not loaded (development or blocked)
    }
  }, [])

  return (
    <div className={`ad-container ${className}`} style={style} aria-label="Advertisement">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-7051110697789992"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
