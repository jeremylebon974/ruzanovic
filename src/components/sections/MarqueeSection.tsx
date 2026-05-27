'use client'

export default function MarqueeSection() {
  const items = [
    'Architecture Textile',
    '—',
    'SS 2025',
    '—',
    'Ruzanovic Paris',
    '—',
    'Perforations Signature',
    '—',
    'Couleurs Manifeste',
    '—',
    'Silhouettes Architecturales',
    '—',
  ]

  const doubled = [...items, ...items]

  return (
    <div className="py-6 border-y border-rz-ink/10 overflow-hidden bg-rz-white">
      <div className="marquee-track whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`
              inline-block mx-6 font-mono text-[0.65rem] tracking-[0.3em] uppercase
              ${item === '—' ? 'text-rz-orange' : 'text-rz-ink/50'}
            `}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
