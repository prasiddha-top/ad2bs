import DateConverter from './DateConverter'
import './TopConverterZone.css'

export default function TopConverterZone({ title, subtitle, subtitleNe, defaultMode = 'ad-to-bs' }) {
  return (
    <section className="cz-section" aria-labelledby="cz-title">
      <div className="cz-layout">
        
        {/* LEFT Vertical Ad */}
        <aside className="cz-sidebar cz-sidebar--left" aria-label="Advertisement">
          <div className="cz-sidebar-label">Ad</div>
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '160px', height: '600px' }}
            data-ad-client="ca-pub-7051110697789992"
            data-ad-slot="auto"
            data-ad-format="vertical"
          />
        </aside>

        {/* CENTER Content: Header & Converter */}
        <div className="cz-center">
          {title && (
            <div className="cz-header">
              <h1 id="cz-title" className="cz-title">{title}</h1>
              {subtitle && <p className="cz-subtitle">{subtitle}</p>}
              {subtitleNe && <p className="cz-subtitle-ne nepali-text">{subtitleNe}</p>}
            </div>
          )}
          <DateConverter defaultMode={defaultMode} />
        </div>

        {/* RIGHT Vertical Ad */}
        <aside className="cz-sidebar cz-sidebar--right" aria-label="Advertisement">
          <div className="cz-sidebar-label">Ad</div>
          <ins
            className="adsbygoogle"
            style={{ display: 'block', width: '160px', height: '600px' }}
            data-ad-client="ca-pub-7051110697789992"
            data-ad-slot="auto"
            data-ad-format="vertical"
          />
        </aside>

      </div>
    </section>
  )
}
