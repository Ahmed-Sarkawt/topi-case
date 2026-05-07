import { useState, useEffect } from 'react'
import { LayoutDashboard, FlaskConical, Swords, BookOpen, FileText, MonitorPlay, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import Overview from './components/Overview'
import Analysis from './components/Analysis'
import PMToolkit from './components/PMToolkit'
import Competitive from './components/Competitive'
import PRD from './components/PRD'
import Presentation from './components/Presentation'
import { COMPETITIVE_PLATFORMS } from './competitiveData'
import { TooltipProvider } from './components/Tip'

const NAV = [
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard, sub: 'Case study presentation' },
  { id: 'analysis', label: 'Deep Analysis', Icon: FlaskConical, sub: 'Research exploration' },
  { id: 'competitive', label: 'Competitive Intel', Icon: Swords, sub: 'SWOT · features · north stars' },
  { id: 'toolkit', label: 'PM Toolkit', Icon: BookOpen, sub: 'Role prep & terminology' },
  { id: 'prd', label: 'PRD', Icon: FileText, sub: 'Seller penetration · greenfield' },
  { id: 'presentation', label: 'Presentation', Icon: MonitorPlay, sub: 'VP · Product · Engineering' },
]

// McKinsey sidebar palette
const S = {
  bg: '#002654',
  border: '#003F87',
  activeBg: '#003F87',
  activeAccent: '#6491C8',
  textPrimary: '#FFFFFF',
  textMuted: '#A8C0D8',
  textSubtle: '#5A7A9A',
  badgeBg: '#003F87',
}

export default function App() {
  const [page, setPage] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (page === 'presentation') setSidebarOpen(false)
  }, [page])

  const W = sidebarOpen ? 248 : 48

  return (
    <TooltipProvider>
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: W,
        minHeight: '100vh',
        background: S.bg,
        color: S.textPrimary,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
        borderRight: `1px solid ${S.border}`,
        transition: 'width 0.2s ease',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ borderBottom: `1px solid ${S.border}`, flexShrink: 0 }}>
          <div style={{
            padding: sidebarOpen ? '20px 16px 0' : '16px 0 0',
            display: 'flex', alignItems: 'center', gap: 10,
            justifyContent: sidebarOpen ? 'space-between' : 'center',
          }}>
            {sidebarOpen && (
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: S.textPrimary, letterSpacing: '0.16px' }}>topi GmbH</div>
                <div style={{ fontSize: 11, color: S.textMuted, letterSpacing: '0.16px', marginTop: 2 }}>Senior PM Interview Prep</div>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(v => !v)}
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: S.activeAccent, padding: 4, display: 'flex', alignItems: 'center',
                flexShrink: 0, borderRadius: 2,
              }}
            >
              {sidebarOpen
                ? <PanelLeftClose size={14} strokeWidth={1.5} />
                : <PanelLeftOpen size={14} strokeWidth={1.5} />
              }
            </button>
          </div>
          {sidebarOpen ? (
            <div style={{ margin: '12px 16px 16px', padding: '6px 10px', background: S.badgeBg, fontSize: 11, color: S.textMuted, letterSpacing: '0.16px', lineHeight: 1.4 }}>
              Ahmed Sulaiman · Case Study · May 2026
            </div>
          ) : (
            <div style={{ height: 16 }} />
          )}
        </div>

        {/* Nav */}
        <nav style={{ padding: '8px 0', flex: 1 }}>
          {NAV.map(n => {
            const active = page === n.id
            return (
              <button
                key={n.id}
                onClick={() => setPage(n.id)}
                title={!sidebarOpen ? n.label : undefined}
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center',
                  gap: sidebarOpen ? 12 : 0,
                  padding: sidebarOpen ? '12px 20px' : '14px 0',
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: active ? S.activeBg : 'transparent',
                  color: active ? S.textPrimary : S.textMuted,
                  borderLeft: active ? `4px solid ${S.activeAccent}` : '4px solid transparent',
                  transition: 'background 0.1s',
                  borderRadius: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                <n.Icon size={16} strokeWidth={1.5} style={{ flexShrink: 0, opacity: active ? 1 : 0.6 }} />
                {sidebarOpen && (
                  <div>
                    <div style={{ fontSize: 13, fontWeight: active ? 600 : 400, letterSpacing: '0.16px', color: active ? S.textPrimary : S.textMuted }}>{n.label}</div>
                    <div style={{ fontSize: 11, color: active ? S.textMuted : S.textSubtle, marginTop: 1, letterSpacing: '0.16px' }}>{n.sub}</div>
                  </div>
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom info — hidden when collapsed */}
        {sidebarOpen && (
          <div style={{ padding: '16px 20px', borderTop: `1px solid ${S.border}`, fontSize: 11, color: S.textSubtle, lineHeight: 1.6, letterSpacing: '0.16px' }}>
            <div style={{ color: S.activeAccent, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.32px' }}>Research Coverage</div>
            <div>✓ Customer reviews & product UX</div>
            <div>✓ Company financials & PEAC context</div>
            <div>✓ 7-platform competitive breakdown</div>
            <div>✓ Market trends 2026</div>
            <div>✓ ICE-scored opportunities</div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: W, flex: 1, minHeight: '100vh', background: '#f4f4f4', transition: 'margin-left 0.2s ease' }}>
        {page === 'overview' && <Overview />}
        {page === 'analysis' && <Analysis />}
        {page === 'competitive' && <Competitive platforms={COMPETITIVE_PLATFORMS} />}
        {page === 'toolkit' && <PMToolkit />}
        {page === 'prd' && <PRD />}
        {page === 'presentation' && <Presentation sidebarWidth={W} />}
      </main>
    </div>
    </TooltipProvider>
  )
}
