import { useState } from 'react'
import { Tip } from './Tip'

const FEATURE_DIMS = [
  { key: 'coreProductAndModel', label: 'Core Product Model', explain: 'The fundamental business model — how the company makes money and what they actually sell.' },
  { key: 'targetCustomerSegment', label: 'Target Segment', explain: 'Which types of businesses or customers this company focuses on.' },
  { key: 'hardwareCategories', label: 'Hardware Categories', explain: 'What types of physical devices this company will finance.' },
  { key: 'contractTerms', label: 'Contract Terms', explain: 'How long contracts last and what happens at the end.' },
  { key: 'pricingModel', label: 'Pricing Model', explain: 'How the monthly cost is calculated.' },
  { key: 'creditAndUnderwriting', label: 'Credit & Underwriting', explain: 'The process of checking whether a customer can afford the subscription.' },
  { key: 'distributionModel', label: 'Distribution Model', explain: 'How the company reaches customers — direct, indirect, or marketplace.' },
  { key: 'geographicCoverage', label: 'Geography', explain: 'Which countries or regions this platform operates in.' },
  { key: 'integrationCapabilities', label: 'Integration Capabilities', explain: 'Which software systems this platform connects to.' },
  { key: 'customerPortalUXFeatures', label: 'Customer Portal / UX', explain: 'The software tools available to resellers and end customers.' },
  { key: 'sustainabilityCircularEconomy', label: 'Sustainability & Circular', explain: 'Programs for device refurbishment, reuse, and responsible recycling.' },
  { key: 'managedServices', label: 'Managed Services', explain: 'Value-added services bundled with the hardware.' },
  { key: 'keyDifferentiators', label: 'Key Differentiators', explain: 'What makes this company uniquely defensible against competitors.' },
  { key: 'recentProductLaunches', label: 'Recent Launches (2025–26)', explain: 'What new features or products each company shipped in the last 12 months.' },
]

const SWOT_STYLE = {
  strengths: { bg: '#defbe6', border: '#24a148', label: '#24a148', text: 'Strengths' },
  weaknesses: { bg: '#fff1f1', border: '#da1e28', label: '#da1e28', text: 'Weaknesses' },
  opportunities: { bg: '#edf5ff', border: '#0f62fe', label: '#0f62fe', text: 'Opportunities' },
  threats: { bg: '#fff8e1', border: '#f1c21b', label: '#c2410c', text: 'Threats' },
}

const SWOT_EXPLAINS = {
  strengths: 'Things this company does well that competitors struggle to match.',
  weaknesses: 'Internal limitations that make it harder to compete or grow.',
  opportunities: 'External trends, market gaps, or strategic moves that could drive significant growth.',
  threats: 'External risks that could damage the business.',
}

const TIER_COLORS = {
  0: '#0f62fe',
  1: '#da1e28',
  2: '#c2410c',
  3: '#525252',
}

const TIER_EXPLAINS = {
  0: 'topi itself — the company being analyzed.',
  1: 'Direct, high-threat competitors who compete in the same market.',
  2: 'Moderate competitors who overlap in some dimensions.',
  3: 'Adjacent players who occasionally compete.',
}

function FeatureValue({ value }) {
  if (!value) return <span style={{ color: '#8c8c8c', fontSize: 12 }}>—</span>
  if (Array.isArray(value)) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {value.map((v, i) => (
          <span key={i} style={{
            fontSize: 11, padding: '2px 7px',
            background: '#e0e0e0', color: '#161616', letterSpacing: '0.16px',
          }}>{v}</span>
        ))}
      </div>
    )
  }
  return <span style={{ fontSize: 13, color: '#525252', lineHeight: 1.5, letterSpacing: '0.16px' }}>{value}</span>
}

function ComparisonTable({ platforms }) {
  const [hoverPlatform, setHoverPlatform] = useState(null)

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <th style={{
              padding: '12px 16px', textAlign: 'left', background: '#161616',
              color: '#8c8c8c', fontSize: 11, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.32px', width: 160, borderRight: '1px solid #262626',
            }}>
              <Tip explain="Each row is one feature dimension." title="Feature Dimensions">Feature</Tip>
            </th>
            {platforms.map(p => (
              <th key={p.id} style={{
                padding: '12px 14px', textAlign: 'left',
                background: hoverPlatform === p.id ? '#0050e6' : '#161616',
                color: '#f4f4f4', fontSize: 12, fontWeight: 600,
                borderRight: '1px solid #262626', minWidth: 160,
                transition: 'background 0.1s', cursor: 'default',
                letterSpacing: '0.16px',
              }}
                onMouseEnter={() => setHoverPlatform(p.id)}
                onMouseLeave={() => setHoverPlatform(null)}
              >
                <Tip explain={`${p.name}: ${p.tagline || p.tierLabel}.`} title={p.name}>
                  <div>
                    <div>{p.name}</div>
                    <div style={{ fontSize: 10, fontWeight: 400, marginTop: 3, color: TIER_COLORS[p.tier] || '#8c8c8c', letterSpacing: '0.32px' }}>{p.tierLabel}</div>
                  </div>
                </Tip>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FEATURE_DIMS.map((dim, rowIdx) => (
            <tr key={dim.key} style={{ background: rowIdx % 2 === 0 ? '#f4f4f4' : '#ffffff' }}>
              <td style={{
                padding: '12px 16px', fontWeight: 600, color: '#525252', fontSize: 12,
                borderRight: '1px solid #e0e0e0', verticalAlign: 'top',
                background: rowIdx % 2 === 0 ? '#e0e0e0' : '#f4f4f4',
                position: 'sticky', left: 0, letterSpacing: '0.16px',
              }}>
                <Tip explain={dim.explain} title={dim.label}>{dim.label}</Tip>
              </td>
              {platforms.map(p => (
                <td key={p.id} style={{
                  padding: '12px 14px', verticalAlign: 'top',
                  borderRight: '1px solid #e0e0e0',
                  background: hoverPlatform === p.id ? '#edf5ff' : undefined,
                  transition: 'background 0.1s',
                }}
                  onMouseEnter={() => setHoverPlatform(p.id)}
                  onMouseLeave={() => setHoverPlatform(null)}
                >
                  <Tip
                    explain={`${p.name} — ${dim.label}: ${Array.isArray(p.features?.[dim.key]) ? p.features[dim.key].join(', ') : (p.features?.[dim.key] || 'Not disclosed')}.`}
                    title={`${p.name} · ${dim.label}`}
                    block
                  >
                    <FeatureValue value={p.features?.[dim.key]} />
                  </Tip>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SwotCard({ platform }) {
  return (
    <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36,
          background: TIER_COLORS[platform.tier] || '#0f62fe',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: '#ffffff',
        }}>
          {platform.id === 'topi' ? 'T' : platform.id === 'peac' ? 'P' : platform.id === 'grenke' ? 'G' : platform.id === 'everphone' ? 'E' : platform.id === 'grover' ? 'Gr' : platform.id === 'lendis' ? 'L' : platform.name[0]}
        </div>
        <div>
          <Tip explain={`${platform.name}: ${platform.tagline || 'A competitor in the HaaS/DaaS market'}.`} title={platform.name}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{platform.name}</div>
          </Tip>
          <Tip explain={TIER_EXPLAINS[platform.tier] || ''} title="Competitive Tier">
            <div style={{ fontSize: 11, color: TIER_COLORS[platform.tier] || '#525252', fontWeight: 600, letterSpacing: '0.16px' }}>{platform.tierLabel}</div>
          </Tip>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {Object.entries(SWOT_STYLE).map(([key, style]) => (
          <div key={key} style={{
            padding: '12px 14px',
            background: style.bg,
            border: `1px solid ${style.border}`,
            borderLeft: `3px solid ${style.border}`,
          }}>
            <Tip explain={SWOT_EXPLAINS[key]} title={style.text}>
              <div style={{ fontSize: 10, fontWeight: 700, color: style.label, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.32px' }}>
                {style.text}
              </div>
            </Tip>
            {(platform.swot?.[key] || []).map((item, i) => (
              <Tip key={i} explain={`${platform.name} ${key}: "${item}"`} title={platform.name} block>
                <div style={{ fontSize: 12, color: '#161616', marginBottom: 5, lineHeight: 1.5, display: 'flex', gap: 6, letterSpacing: '0.16px' }}>
                  <span style={{ color: style.label, flexShrink: 0, marginTop: 1 }}>•</span>
                  <span>{item}</span>
                </div>
              </Tip>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function NorthStarCard({ platform }) {
  return (
    <div style={{
      background: '#ffffff', padding: 24, border: '1px solid #e0e0e0',
      borderTop: `3px solid ${TIER_COLORS[platform.tier] || '#0f62fe'}`,
    }}>
      <Tip explain={`${platform.name}: ${platform.tagline || platform.tierLabel}.`} title={platform.name}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>{platform.name}</div>
      </Tip>
      <Tip explain={`${platform.name}'s North Star is "${platform.northStar?.metric}".`} title="North Star Metric">
        <div style={{ fontSize: 16, fontWeight: 400, color: '#0f62fe', marginBottom: 8, letterSpacing: '0.16px' }}>
          ★ {platform.northStar?.metric}
        </div>
      </Tip>
      <Tip explain={`Why this metric: ${platform.northStar?.why}.`} title="Why this metric?">
        <p style={{ fontSize: 12, color: '#525252', lineHeight: 1.65, margin: '0 0 14px 0', letterSpacing: '0.16px' }}>
          {platform.northStar?.why}
        </p>
      </Tip>
      {platform.northStar?.secondary?.length > 0 && (
        <div>
          <Tip explain="Secondary metrics are supporting indicators that help explain movements in the North Star.">
            <div style={{ fontSize: 10, fontWeight: 700, color: '#525252', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.32px' }}>Also tracks</div>
          </Tip>
          {platform.northStar.secondary.map((s, i) => (
            <Tip key={i} explain={`Secondary metric: "${s}".`} title="Supporting Metric" block>
              <div style={{ fontSize: 11, color: '#525252', marginBottom: 4, display: 'flex', gap: 6, letterSpacing: '0.16px' }}>
                <span style={{ color: '#0f62fe' }}>→</span><span>{s}</span>
              </div>
            </Tip>
          ))}
        </div>
      )}
    </div>
  )
}

function KeyNumbers({ platform }) {
  return (
    <div style={{ background: '#f4f4f4', padding: '14px 16px', border: '1px solid #e0e0e0' }}>
      <Tip explain={`Published, verifiable metrics for ${platform.name}.`} title={platform.name}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#161616', marginBottom: 10, letterSpacing: '0.16px' }}>{platform.name}</div>
      </Tip>
      {(platform.keyNumbers || []).map((kn, i) => (
        <Tip key={i} explain={`${platform.name} — ${kn.label}: ${kn.value}.`} title={kn.label} block>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6, borderBottom: '1px solid #e0e0e0', paddingBottom: 6 }}>
            <span style={{ fontSize: 11, color: '#525252', letterSpacing: '0.16px' }}>{kn.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{kn.value}</span>
          </div>
        </Tip>
      ))}
    </div>
  )
}

const SUBTABS = [
  { id: 'comparison', label: 'Side-by-Side', explain: 'A feature-level comparison table across all 7 platforms.' },
  { id: 'swot', label: 'SWOT Analysis', explain: 'SWOT = Strengths, Weaknesses, Opportunities, Threats.' },
  { id: 'northstar', label: 'North Stars', explain: 'Each company\'s single most important metric.' },
  { id: 'numbers', label: 'Key Metrics', explain: 'Only publicly disclosed, verifiable numbers.' },
]

export default function Competitive({ platforms }) {
  const [subtab, setSubtab] = useState('comparison')
  const [selectedIds, setSelectedIds] = useState(platforms.map(p => p.id))

  const visible = platforms.filter(p => selectedIds.includes(p.id))

  const togglePlatform = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.length > 2 ? prev.filter(x => x !== id) : prev
        : [...prev, id]
    )
  }

  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <Tip explain="This section covers the competitive landscape for topi's HaaS/DaaS market." title="Competitive Intelligence">
          <h1 style={{ fontSize: 32, fontWeight: 300, color: '#161616', margin: 0, letterSpacing: 0 }}>Competitive Intelligence</h1>
        </Tip>
        <Tip explain="The 7 platforms span the full competitive landscape: Grenke, Everphone, Lendis, Grover, and Flexvelop.">
          <p style={{ fontSize: 14, color: '#525252', marginTop: 6, letterSpacing: '0.16px' }}>
            topi + PEAC vs. 5 competitors — feature-level breakdown, SWOT, and north star metrics
          </p>
        </Tip>
      </div>

      {/* Platform filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {platforms.map(p => (
          <Tip key={p.id} explain={`${p.name} (${p.tierLabel}). Click to toggle.`} title={p.name}>
            <button
              onClick={() => togglePlatform(p.id)}
              style={{
                padding: '6px 14px', border: `1px solid ${selectedIds.includes(p.id) ? TIER_COLORS[p.tier] || '#0f62fe' : '#e0e0e0'}`,
                background: selectedIds.includes(p.id) ? TIER_COLORS[p.tier] || '#0f62fe' : '#ffffff',
                color: selectedIds.includes(p.id) ? '#ffffff' : '#525252',
                fontSize: 12, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.16px',
              }}
            >{p.name}</button>
          </Tip>
        ))}
        <Tip explain="Toggle platforms on/off to focus the comparison. Minimum 2.">
          <span style={{ fontSize: 11, color: '#8c8c8c', alignSelf: 'center', marginLeft: 4, letterSpacing: '0.16px' }}>Click to toggle (min 2)</span>
        </Tip>
      </div>

      {/* Sub-tab bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', marginBottom: 24, flexWrap: 'wrap' }}>
        {SUBTABS.map(t => (
          <Tip key={t.id} explain={t.explain} title={t.label}>
            <button onClick={() => setSubtab(t.id)} style={{
              padding: '10px 18px',
              border: 'none',
              borderBottom: subtab === t.id ? '2px solid #0f62fe' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: subtab === t.id ? 600 : 400,
              background: subtab === t.id ? '#f4f4f4' : 'transparent',
              color: subtab === t.id ? '#0f62fe' : '#525252',
              letterSpacing: '0.16px',
            }}>
              {t.label}
            </button>
          </Tip>
        ))}
      </div>

      {subtab === 'comparison' && (
        <div style={{ background: '#ffffff', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
          <ComparisonTable platforms={visible} />
        </div>
      )}

      {subtab === 'swot' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {visible.map(p => <SwotCard key={p.id} platform={p} />)}
        </div>
      )}

      {subtab === 'northstar' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {visible.map(p => <NorthStarCard key={p.id} platform={p} />)}
        </div>
      )}

      {subtab === 'numbers' && (
        <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
          <Tip explain="Only figures that have been publicly disclosed." title="Data Integrity">
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>Published Metrics by Platform</h3>
          </Tip>
          <Tip explain="Venture-backed startups disclose funding rounds and headcount. Legacy players disclose revenue and AUM.">
            <p style={{ fontSize: 12, color: '#525252', marginBottom: 20, letterSpacing: '0.16px' }}>Only disclosed / verifiable figures — no estimates</p>
          </Tip>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {visible.map(p => <KeyNumbers key={p.id} platform={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
