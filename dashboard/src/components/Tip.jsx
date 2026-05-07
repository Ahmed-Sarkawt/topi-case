import { createContext, useContext, useState, useCallback } from 'react'

const TooltipCtx = createContext(null)

export function TooltipProvider({ children }) {
  const [tip, setTip] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const showTip = useCallback((title, explain) => setTip({ title, explain }), [])
  const hideTip = useCallback(() => setTip(null), [])
  const moveTip = useCallback((x, y) => setPos({ x, y }), [])

  // flip left if too close to right edge
  const flipLeft = pos.x > window.innerWidth - 340
  const flipUp = pos.y > window.innerHeight - 200

  return (
    <TooltipCtx.Provider value={{ showTip, hideTip, moveTip }}>
      {children}
      {tip && (
        <div
          style={{
            position: 'fixed',
            left: flipLeft ? pos.x - 304 : pos.x + 14,
            top: flipUp ? pos.y - 160 : pos.y + 14,
            width: 290,
            background: '#0f172a',
            border: '1px solid #1e3a5f',
            borderRadius: 12,
            padding: '12px 14px',
            zIndex: 9999,
            pointerEvents: 'none',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            animation: 'tipFade 0.12s ease',
          }}
        >
          {tip.title && (
            <div style={{ marginBottom: 7 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa' }}>{tip.title}</span>
            </div>
          )}
          <p style={{
            fontSize: 12, color: '#cbd5e1', lineHeight: 1.65, margin: 0,
          }}>{tip.explain}</p>
        </div>
      )}
      <style>{`@keyframes tipFade { from { opacity:0; transform:translateY(4px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </TooltipCtx.Provider>
  )
}

export function Tip({ explain, title, children, block }) {
  const ctx = useContext(TooltipCtx)
  if (!ctx) return children

  const { showTip, hideTip, moveTip } = ctx

  const Tag = block ? 'div' : 'span'
  return (
    <Tag
      onMouseEnter={() => showTip(title, explain)}
      onMouseLeave={hideTip}
      onMouseMove={e => moveTip(e.clientX, e.clientY)}
      style={{
        cursor: 'help',
        borderBottom: block ? undefined : '1px dashed rgba(148,163,184,0.4)',
        display: block ? 'block' : undefined,
      }}
    >
      {children}
    </Tag>
  )
}
