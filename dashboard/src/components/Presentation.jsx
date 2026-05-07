import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { User, BarChart2, FlaskConical, FileText, ChevronLeft, ChevronRight } from 'lucide-react'

// ─── McKinsey corporate palette ───────────────────────────────────────────────
const MC = {
  navy: '#002654',        // McKinsey primary navy
  navyMid: '#003F87',     // Secondary navy
  navyTint: '#E8EDF5',    // Navy background tint
  ink: '#1A1A1A',
  inkMuted: '#4A4A4A',
  inkSubtle: '#767676',
  canvas: '#FFFFFF',
  surface1: '#F5F5F5',
  hairline: '#D1D1D1',
  success: '#1A7940',
  warning: '#9C6B00',
  error: '#B81C1C',
  link: '#6491C8',        // Lighter navy for dark backgrounds
}

function Badge({ children, color = MC.navy }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px',
      fontSize: 11, fontWeight: 600, background: color + '18', color,
      letterSpacing: '0.16px',
    }}>{children}</span>
  )
}

// ─── Slide 1: Cover ───────────────────────────────────────────────────────────
function SlideCover() {
  return (
    <div style={{ minHeight: 480, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ marginBottom: 16 }}>
        <Badge color={MC.navy}>Senior PM Case Study</Badge>
      </div>
      <h1 style={{ fontSize: 36, fontWeight: 300, color: MC.ink, margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
        Seller Penetration Initiative
      </h1>
      <p style={{ fontSize: 18, color: MC.inkMuted, margin: '0 0 40px', lineHeight: 1.6, letterSpacing: '0.16px' }}>
        topi GmbH · May 2026
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
        {['VP of Partnership', 'Product Lead', 'Head of Engineering'].map(r => (
          <div key={r} style={{
            padding: '8px 16px', border: `1px solid ${MC.hairline}`,
            fontSize: 13, color: MC.inkMuted, display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.16px',
          }}>
            <User size={13} strokeWidth={1.5} />
            {r}
          </div>
        ))}
      </div>
      <div style={{ padding: '20px 24px', background: MC.navy, maxWidth: 520 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: MC.link, marginBottom: 6, letterSpacing: '0.16px' }}>The one number that matters</div>
        <div style={{ fontSize: 28, fontWeight: 300, color: '#FFFFFF', marginBottom: 4, letterSpacing: '-0.02em' }}>
          1.5% <span style={{ fontSize: 16, color: '#A8C0D8', fontWeight: 300 }}>vs</span> 3%
        </div>
        <div style={{ fontSize: 13, color: '#B8C8D8', lineHeight: 1.5, letterSpacing: '0.16px' }}>
          Our seller penetration vs. industry average.<br />
          Doubling to 3% doubles GMV — zero new customers, zero new markets.
        </div>
      </div>
    </div>
  )
}

// ─── Slide 2: The Problem ─────────────────────────────────────────────────────
function SlideProblem() {
  const problems = [
    {
      id: 'O1', label: 'Top of Funnel', title: 'Seller Penetration',
      stat: '1.5%', benchmark: '3% avg', color: MC.navy,
      headline: 'Sellers are integrated. The product is working. But sellers are not offering it.',
      points: [
        'Room to 2x GMV with zero new customers and zero new market entry',
        'This is a behavior and incentive problem, not a technology problem',
        "Time to see results: immediately, vs. last year's quarter",
      ],
      priority: '#1 — Choosing this',
    },
    {
      id: 'O2', label: 'Mid Funnel', title: 'End-of-Contract Lifecycle',
      stat: '25%', benchmark: 'upgrade rate', color: MC.inkSubtle,
      headline: '50% buy out (cash event). 25% hard churn. 25% upgrade.',
      points: [
        'The 50% buyout is not a loss — it is a cash event (residual value payment)',
        'The real loss: 25% hard churn — zero next cycle, zero recurring revenue',
        'JTBD has shifted: customers use topi to avoid CAPEX, not to rent perpetually',
        'Maximum upside: 25% more customers. Minimum time to signal: 36 months',
      ],
      priority: 'Deprioritized',
    },
    {
      id: 'O3', label: 'Bottom of Funnel', title: 'Large Deal Close Rate',
      stat: '15%', benchmark: '30–40% industry', color: MC.inkMuted,
      headline: '€50k+ deals. We are closing 15%. Industry benchmark is 30–40%.',
      points: [
        'topi is already in the pipeline — we are losing in pre/post-sale services, not price',
        'Onboarding, contract terms, insurance, procurement documentation',
        'Room to grow 2.67x in this segment alone. PEAC is a direct unlock here',
        'Time to signal: 3–6 months (enterprise procurement cycles)',
      ],
      priority: '#2 — Ranked second',
    },
  ]

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkSubtle, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 8 }}>Slide 1 — The Problem</div>
        <h2 style={{ fontSize: 26, fontWeight: 300, color: MC.ink, margin: 0, letterSpacing: '-0.01em' }}>We have three problems at three different funnel stages.</h2>
        <p style={{ fontSize: 14, color: MC.inkMuted, marginTop: 6, letterSpacing: '0.16px' }}>Here is the full picture before we go into what we are solving.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {problems.map(p => (
          <div key={p.id} style={{
            background: MC.canvas, padding: '20px 24px',
            border: `1px solid ${MC.hairline}`,
            borderLeft: `4px solid ${p.color}`,
            opacity: p.id === 'O2' ? 0.72 : 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: p.color, textTransform: 'uppercase', letterSpacing: '0.32px' }}>{p.id} — {p.label}</span>
                  <span style={{ padding: '2px 8px', fontSize: 11, fontWeight: 600, background: p.color + '18', color: p.color, letterSpacing: '0.16px' }}>{p.priority}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: MC.ink, marginBottom: 6, letterSpacing: '0.16px' }}>{p.title}</div>
                <div style={{ fontSize: 13, color: MC.inkMuted, marginBottom: 10, lineHeight: 1.5, letterSpacing: '0.16px' }}>{p.headline}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {p.points.map((pt, i) => (
                    <div key={i} style={{ fontSize: 12, color: MC.inkMuted, display: 'flex', gap: 8, letterSpacing: '0.16px' }}>
                      <span style={{ color: p.color, marginTop: 1 }}>→</span><span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: 100 }}>
                <div style={{ fontSize: 32, fontWeight: 300, color: p.color, letterSpacing: '-0.02em' }}>{p.stat}</div>
                <div style={{ fontSize: 11, color: MC.inkSubtle, letterSpacing: '0.16px' }}>{p.benchmark}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Slide 3: Data Lens ───────────────────────────────────────────────────────
function SlideData() {
  const sources = [
    { Icon: BarChart2, label: 'Industry benchmarks', note: '3% market average, 30–40% enterprise close rate' },
    { Icon: FlaskConical, label: 'Competitive research', note: '7-platform analysis' },
    { Icon: FileText, label: "topi's own disclosed metrics", note: 'From the case study brief' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkSubtle, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 8 }}>Slide 2 — Our Data Lens</div>
        <h2 style={{ fontSize: 26, fontWeight: 300, color: MC.ink, margin: 0, letterSpacing: '-0.01em' }}>No internal data. Here is what we are working from.</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ background: MC.canvas, padding: '20px 24px', border: `1px solid ${MC.hairline}` }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Our sources</div>
          {sources.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
              <s.Icon size={16} strokeWidth={1.5} style={{ color: MC.navy, marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>{s.label}</div>
                <div style={{ fontSize: 12, color: MC.inkMuted, letterSpacing: '0.16px' }}>{s.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: MC.navy, padding: '20px 24px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: MC.link, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 10 }}>The single most important data point</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.6, marginBottom: 12, letterSpacing: '0.16px' }}>
            The 3% market average proves demand exists.<br />
            This is not a demand problem. It is an activation problem.
          </div>
          <div style={{ fontSize: 12, color: '#B8C8D8', lineHeight: 1.6, letterSpacing: '0.16px' }}>
            Sellers who are motivated and enabled close topi deals. The ones who are not — don't. The product is not broken. The channel is.
          </div>
        </div>
      </div>

      <div style={{ background: MC.canvas, padding: '20px 24px', border: `1px solid ${MC.hairline}`, borderLeft: `4px solid ${MC.navy}` }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: MC.navy, marginBottom: 8, letterSpacing: '0.16px' }}>On PEAC</div>
        <div style={{ fontSize: 13, color: MC.inkMuted, lineHeight: 1.7, letterSpacing: '0.16px' }}>
          Assumption: we cannot use PEAC's partner network today. What we can use right now: PEAC's institutional credibility as a sales objection-closer.
          <strong style={{ color: MC.ink }}> "Is topi financially stable?"</strong> — answered with zero product work.
          When PEAC network access becomes available, O1 and O3 get a structural unlock. We park this as a future expansion lever.
        </div>
      </div>
    </div>
  )
}

// ─── Slide 4: Not Choosing ────────────────────────────────────────────────────
function SlideNotChoosing() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkSubtle, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 8 }}>Slide 3 — What We Are Not Choosing</div>
        <h2 style={{ fontSize: 26, fontWeight: 300, color: MC.ink, margin: 0, letterSpacing: '-0.01em' }}>Two real opportunities. Two reasons to go later.</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {[
          {
            id: 'O2', title: 'End-of-Contract Lifecycle', verdict: 'Deprioritized',
            color: MC.inkSubtle,
            reasons: [
              { label: 'Max gain', value: '25% more customers' },
              { label: 'Timeframe', value: '36 months minimum' },
              { label: 'Measurement', value: 'Cannot track within 2 quarters' },
            ],
            note: 'The 50% buyout is already generating revenue — it is a cash event, not a loss. The real problem is 25% hard churn, but even solving that requires contract-term changes we cannot make retroactively.',
          },
          {
            id: 'O3', title: 'Large Deal Close Rate', verdict: 'Ranked #2',
            color: MC.inkMuted,
            reasons: [
              { label: 'Opportunity', value: '2.67x in enterprise segment' },
              { label: 'Timeframe', value: '3–6 months to any signal' },
              { label: 'Complexity', value: 'Multi-team process restructuring' },
            ],
            note: 'Valid — and we will pursue it. But we cannot see the impact right away because of long enterprise approval timelines. We fund O3 with the GMV growth from O1.',
          },
        ].map(o => (
          <div key={o.id} style={{
            background: MC.canvas, padding: '24px',
            border: `1px solid ${MC.hairline}`, borderTop: `3px solid ${o.color}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: o.color, letterSpacing: '0.16px' }}>{o.id}</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>{o.title}</span>
              <span style={{ marginLeft: 'auto', padding: '2px 8px', fontSize: 11, fontWeight: 600, background: o.color + '18', color: o.color, letterSpacing: '0.16px' }}>{o.verdict}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {o.reasons.map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: MC.inkSubtle, letterSpacing: '0.16px' }}>{r.label}</span>
                  <span style={{ fontWeight: 600, color: MC.inkMuted, letterSpacing: '0.16px' }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.6, paddingTop: 12, borderTop: `1px solid ${MC.hairline}`, letterSpacing: '0.16px' }}>
              {o.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Slide 5: Choosing O1 ─────────────────────────────────────────────────────
function SlideChoosing() {
  const reasons = [
    { n: '1', title: 'Fastest feedback loop', body: 'Partners are already integrated. No upfront engineering required to start. First signal in 1–2 weeks.' },
    { n: '2', title: 'Highest leverage', body: 'Doubling penetration from 1.5% to 3% doubles GMV with the current partner base. No new customers. No new markets.' },
    { n: '3', title: 'We control it', body: 'This is an internal incentive and process adjustment — not dependent on end-user behavior change or compliance timelines.' },
  ]

  const frameworks = [
    { name: 'JTBD', body: "The job has shifted. Customers are not hiring topi to rent hardware. They are hiring topi to avoid CAPEX. The 50% buyout confirms willingness to pay — it is a financing behavior, not a subscription behavior. That is fine. It does not break the model. It tells us what the seller conversation should sound like." },
    { name: 'Channel Economics', body: "The gap between our 1.5% and the 3% industry average is not a product gap. Sellers who are motivated and enabled close topi deals. The ones who are not — don't. We fix the motivation and enablement layer." },
  ]

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkSubtle, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 8 }}>Slide 4 — What We Are Choosing</div>
        <h2 style={{ fontSize: 26, fontWeight: 300, color: MC.ink, margin: 0, letterSpacing: '-0.01em' }}>O1: Seller Penetration. Why this, why now.</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reasons.map(r => (
            <div key={r.n} style={{ background: MC.canvas, padding: '16px 20px', border: `1px solid ${MC.hairline}`, display: 'flex', gap: 14 }}>
              <div style={{ minWidth: 28, height: 28, background: MC.navy, color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.n}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 4, letterSpacing: '0.16px' }}>{r.title}</div>
                <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.6, letterSpacing: '0.16px' }}>{r.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkSubtle, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 4 }}>Two frameworks that drove this</div>
          {frameworks.map(f => (
            <div key={f.name} style={{ background: MC.canvas, padding: '16px 20px', border: `1px solid ${MC.hairline}`, borderLeft: `3px solid ${MC.navy}` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.navy, marginBottom: 6, letterSpacing: '0.16px' }}>{f.name}</div>
              <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.7, letterSpacing: '0.16px' }}>{f.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Slide 6: Success Definition ─────────────────────────────────────────────
function SlideSuccess() {
  const phases = [
    { phase: 'Phase 1', window: 'Days 1–14', color: MC.navy, action: 'Launch SPIFF program to top-performing partners first.', track: 'New deal requests vs. baseline' },
    { phase: 'Phase 2', window: 'Days 15–45', color: MC.inkMuted, action: 'Measure: is activation changing? Are more reps offering topi mid-conversation?', track: 'Quote attachment rate, reseller activation rate' },
    { phase: 'Phase 3', window: 'Months 3–6', color: MC.inkSubtle, action: 'Are we moving toward 3%?', track: 'Seller penetration %, financed GMV' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkSubtle, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 8 }}>Slide 5 — How We Define Success</div>
        <h2 style={{ fontSize: 26, fontWeight: 300, color: MC.ink, margin: 0, letterSpacing: '-0.01em' }}>Three phases. One kill switch.</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
        {phases.map((p, i) => (
          <div key={i} style={{ background: MC.canvas, padding: '20px 24px', border: `1px solid ${MC.hairline}`, borderLeft: `4px solid ${p.color}`, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
            <div style={{ minWidth: 120 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: p.color, letterSpacing: '0.16px' }}>{p.phase}</div>
              <div style={{ fontSize: 12, color: MC.inkSubtle, marginTop: 2, letterSpacing: '0.16px' }}>{p.window}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: MC.inkMuted, marginBottom: 6, lineHeight: 1.5, letterSpacing: '0.16px' }}>{p.action}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: MC.inkSubtle, letterSpacing: '0.16px' }}>Track:</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: p.color, letterSpacing: '0.16px' }}>{p.track}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: '#FBF0F0', border: `1px solid ${MC.error}`, padding: '20px 24px' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: MC.error, marginBottom: 8, letterSpacing: '0.16px' }}>Kill Switch</div>
        <div style={{ fontSize: 13, color: MC.ink, lineHeight: 1.7, letterSpacing: '0.16px' }}>
          If day-45 data shows no change in activation, we revisit the blocker hypothesis. The problem may not be incentives — it may be the sales conversation itself (pre-qual friction, product confidence).
          <strong> We do not wait 6 months to find out.</strong>
        </div>
      </div>
    </div>
  )
}

// ─── Slide 7: Features ────────────────────────────────────────────────────────
function SlideFeatures() {
  const [audience, setAudience] = useState('all')

  const features = [
    {
      n: 1, title: 'Tiered Seller SPIFF Program',
      effort: 'Low', impact: 'Very High', ships: 'Immediately',
      effortColor: MC.success, impactColor: MC.navy,
      tiers: [['< €5k', '€20–€50'], ['€5k–€20k', '€100–€250'], ['€20k–€50k', '€300–€450'], ['> €50k', '€500–€1,000 + prize pool']],
      vp: "Aligns reseller sales rep incentives with topi's GMV goal. Cash bonus paid directly to the rep, not the company. Bypasses slow corporate incentive structures.",
      product: 'No engineering required to launch v1. Design the scheme, wire to existing sales CRM. Dashboard and automated onboarding are Phase 2.',
      eng: 'Phase 2 dashboard reads from existing deal/transaction data. No new data collection required — we surface what already exists.',
    },
    {
      n: 2, title: 'Email Campaign Kit',
      effort: 'Low', impact: 'Medium-High', ships: 'Week 1–2',
      effortColor: MC.success, impactColor: MC.navy,
      vp: 'No ask from partners. They receive a ready-to-send kit.',
      product: 'Design + copywriting. Zero engineering for v1.',
      eng: 'AI synthesis add-on is Phase 2. Reads from existing customer contract data.',
    },
    {
      n: 3, title: 'Pipeline Dashboard',
      effort: 'Medium-High', impact: 'High', ships: 'Q2',
      effortColor: MC.warning, impactColor: MC.navy,
      vp: "Gives partners a tool they don't have today. Currently, sellers have no visibility into deal-stage. This makes topi feel like a black box.",
      product: "Data already exists in topi's backend. This is a UI layer problem, not a data problem.",
      eng: 'Backend: aggregate deal-stage events per partner ID. Frontend: clean partner-facing dashboard. No new data required — expose what we already track.',
    },
    {
      n: 4, title: 'Live Quote Generator',
      effort: 'High', impact: 'Medium', ships: 'Q2–Q3',
      effortColor: MC.error, impactColor: MC.navy,
      vp: 'Directly addresses "longer sales conversations" — the #2 blocker. Seller can show the customer the monthly breakdown on the spot.',
      product: 'Currently exists only inside ITscope and SYNAXON. This brings it to every reseller regardless of integration tier.',
      eng: 'Frontend: lightweight web tool. Backend: pricing engine + credit check API. Output: shareable link or PDF. Significant but clearly scoped.',
    },
  ]

  const audienceTabs = [
    { id: 'all', label: 'All' },
    { id: 'vp', label: 'VP of Partnership' },
    { id: 'product', label: 'Product Lead' },
    { id: 'eng', label: 'Head of Engineering' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkSubtle, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 8 }}>Slide 6 — Features</div>
        <h2 style={{ fontSize: 26, fontWeight: 300, color: MC.ink, margin: 0, letterSpacing: '-0.01em' }}>Four features. Ordered by feedback loop speed.</h2>
      </div>

      {/* Summary table */}
      <div style={{ marginBottom: 20, border: `1px solid ${MC.hairline}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: MC.navy }}>
              {['Feature', 'Effort', 'Impact', 'Ships'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.32px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${MC.hairline}`, background: i % 2 === 0 ? MC.canvas : MC.surface1 }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>{f.n}. {f.title}</td>
                <td style={{ padding: '12px 16px' }}><span style={{ padding: '2px 8px', fontSize: 11, fontWeight: 600, background: f.effortColor + '15', color: f.effortColor, letterSpacing: '0.16px' }}>{f.effort}</span></td>
                <td style={{ padding: '12px 16px' }}><span style={{ padding: '2px 8px', fontSize: 11, fontWeight: 600, background: f.impactColor + '15', color: f.impactColor, letterSpacing: '0.16px' }}>{f.impact}</span></td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: MC.inkMuted, letterSpacing: '0.16px' }}>{f.ships}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Audience toggle */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${MC.hairline}`, marginBottom: 16 }}>
        {audienceTabs.map(t => {
          const isActive = audience === t.id
          return (
            <button key={t.id} onClick={() => setAudience(t.id)} style={{
              padding: '8px 14px', border: 'none', cursor: 'pointer',
              borderBottom: isActive ? `2px solid ${MC.navy}` : '2px solid transparent',
              marginBottom: -1,
              fontSize: 12, fontWeight: isActive ? 600 : 400,
              background: 'transparent',
              color: isActive ? MC.navy : MC.inkMuted,
              letterSpacing: '0.16px',
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              {t.id !== 'all' && <User size={11} strokeWidth={1.5} />}
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Feature detail cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {features.map((f, i) => (
          <div key={i} style={{ background: MC.canvas, padding: '18px 24px', border: `1px solid ${MC.hairline}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ minWidth: 24, height: 24, background: MC.navy, color: '#fff', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{f.n}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>{f.title}</div>
            </div>
            {f.tiers && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                {f.tiers.map((t, j) => (
                  <div key={j} style={{ padding: '4px 10px', background: MC.surface1, border: `1px solid ${MC.hairline}`, fontSize: 11 }}>
                    <span style={{ color: MC.inkSubtle, letterSpacing: '0.16px' }}>{t[0]}</span>
                    <span style={{ color: MC.success, fontWeight: 700, marginLeft: 6, letterSpacing: '0.16px' }}>{t[1]}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(audience === 'all' || audience === 'vp') && (
                <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                  <span style={{ minWidth: 130, color: MC.navy, fontWeight: 600, letterSpacing: '0.16px' }}>VP of Partnership</span>
                  <span style={{ color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>{f.vp}</span>
                </div>
              )}
              {(audience === 'all' || audience === 'product') && (
                <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                  <span style={{ minWidth: 130, color: MC.inkMuted, fontWeight: 600, letterSpacing: '0.16px' }}>Product Lead</span>
                  <span style={{ color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>{f.product}</span>
                </div>
              )}
              {(audience === 'all' || audience === 'eng') && (
                <div style={{ display: 'flex', gap: 8, fontSize: 12 }}>
                  <span style={{ minWidth: 130, color: MC.inkSubtle, fontWeight: 600, letterSpacing: '0.16px' }}>Head of Engineering</span>
                  <span style={{ color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>{f.eng}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Slide 8: Q&A + Summary ───────────────────────────────────────────────────
function SlideQA() {
  const qa = [
    { q: 'Why do sellers avoid topi today?', a: "Because we do not incentivize them to hand us the market demand. Commission is tied to revenue and margin — not payment method. Offering topi adds steps to the conversation with no financial upside for the rep." },
    { q: 'Which seller cohorts underperform?', a: 'We expect: smaller resellers outside SYNAXON/ITscope networks, and reps without prior financing experience. Post-SPIFF, we will validate this with data segmented by partner size and rep tenure.' },
    { q: 'What % of financed quotes convert?', a: 'We will establish baseline pre-SPIFF and measure the lift at day 15, day 45, and month 6.' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkSubtle, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 8 }}>Slide 7 — Case Study Q&A + Summary</div>
        <h2 style={{ fontSize: 26, fontWeight: 300, color: MC.ink, margin: 0, letterSpacing: '-0.01em' }}>Questions answered. Decision rationale on record.</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {qa.map((item, i) => (
          <div key={i} style={{ background: MC.navy, padding: '18px 24px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.link, marginBottom: 8, letterSpacing: '0.16px' }}>Q: {item.q}</div>
            <div style={{ fontSize: 13, color: '#B8C8D8', lineHeight: 1.7, paddingLeft: 12, borderLeft: `3px solid ${MC.navyMid}`, letterSpacing: '0.16px' }}>{item.a}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 20, border: `1px solid ${MC.hairline}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: MC.navy }}>
              <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.32px', width: '20%' }}></th>
              {['O1: Seller Penetration', 'O2: Lifecycle', 'O3: Enterprise'].map((h, i) => (
                <th key={i} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: [MC.link, '#8BA5C8', '#6B8AAA'][i], letterSpacing: '0.16px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Current state', vals: ['1.5%', '25% upgrade', '15% close rate'] },
              { label: 'Target', vals: ['3%', '—', '30–40%'] },
              { label: 'Time to signal', vals: ['2 weeks', '36 months', '3–6 months'] },
              { label: 'Leverage', vals: ['Internal', 'External', 'Mixed'] },
              { label: 'Priority', vals: ['#1', 'Deprioritized', '#2'], bold: true },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${MC.hairline}`, background: i % 2 === 0 ? MC.canvas : MC.surface1 }}>
                <td style={{ padding: '10px 16px', fontSize: 12, fontWeight: 600, color: MC.inkMuted, letterSpacing: '0.16px' }}>{row.label}</td>
                {row.vals.map((v, j) => (
                  <td key={j} style={{ padding: '10px 16px', fontSize: 13, letterSpacing: '0.16px', fontWeight: row.bold ? 600 : 400, color: row.bold ? [MC.navy, MC.inkSubtle, MC.inkMuted][j] : MC.inkMuted }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '18px 24px', background: MC.navy, fontSize: 14, color: '#B8C8D8', lineHeight: 1.7, letterSpacing: '0.16px' }}>
        <strong style={{ color: '#FFFFFF' }}>We start with O1.</strong> We use O1's GMV growth to fund and justify O3. O2 is monitored but not actively resourced.
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
const SLIDES = [
  { id: 'cover', label: 'Cover', component: SlideCover },
  { id: 'problem', label: '1 · The Problem', component: SlideProblem },
  { id: 'data', label: '2 · Data Lens', component: SlideData },
  { id: 'not', label: '3 · Not Choosing', component: SlideNotChoosing },
  { id: 'choosing', label: '4 · Choosing O1', component: SlideChoosing },
  { id: 'success', label: '5 · Success', component: SlideSuccess },
  { id: 'features', label: '6 · Features', component: SlideFeatures },
  { id: 'qa', label: '7 · Q&A + Summary', component: SlideQA },
]

export default function Presentation({ sidebarWidth = 48 }) {
  const [idx, setIdx] = useState(0)
  const slideRef = useRef(null)
  const dirRef = useRef(1)
  const firstRender = useRef(true)
  const SlideComponent = SLIDES[idx].component

  function goTo(newIdx) {
    if (newIdx === idx) return
    dirRef.current = newIdx > idx ? 1 : -1
    setIdx(newIdx)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        setIdx(i => {
          const next = Math.min(SLIDES.length - 1, i + 1)
          if (next !== i) dirRef.current = 1
          return next
        })
      } else if (e.key === 'ArrowLeft') {
        setIdx(i => {
          const prev = Math.max(0, i - 1)
          if (prev !== i) dirRef.current = -1
          return prev
        })
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useLayoutEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    const el = slideRef.current
    if (!el) return
    const anim = el.animate(
      [
        { transform: `translateX(${dirRef.current > 0 ? 40 : -40}px)`, opacity: 0 },
        { transform: 'translateX(0px)', opacity: 1 },
      ],
      { duration: 220, easing: 'ease', fill: 'backwards' }
    )
    return () => anim.cancel()
  }, [idx])

  const arrowBtn = (disabled) => ({
    border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    background: 'transparent',
    color: disabled ? '#3A5A7A' : '#A8C0D8',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '0 14px', flexShrink: 0,
    borderRight: `1px solid ${MC.navyMid}`,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: MC.surface1 }}>
      {/* Slide content */}
      <div style={{ flex: 1, padding: '48px 64px 100px' }}>
        <div ref={slideRef}>
          <SlideComponent />
        </div>
      </div>

      {/* Bottom slide nav */}
      <div style={{
        position: 'fixed', bottom: 0, left: sidebarWidth, right: 0, zIndex: 40,
        background: MC.navy,
        borderTop: `1px solid ${MC.navyMid}`,
        display: 'flex', alignItems: 'stretch',
        transition: 'left 0.2s ease',
      }}>
        {/* Prev arrow */}
        <button
          onClick={() => goTo(Math.max(0, idx - 1))}
          disabled={idx === 0}
          style={arrowBtn(idx === 0)}
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>

        {/* Slide tabs */}
        <div style={{ display: 'flex', alignItems: 'stretch', overflowX: 'auto', flex: 1 }}>
          {SLIDES.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} style={{
              padding: '12px 18px',
              border: 'none',
              borderBottom: idx === i ? `3px solid ${MC.link}` : '3px solid transparent',
              cursor: 'pointer',
              fontSize: 12, fontWeight: idx === i ? 600 : 400,
              background: idx === i ? MC.navyMid : 'transparent',
              color: idx === i ? '#FFFFFF' : '#A8C0D8',
              letterSpacing: '0.16px',
              whiteSpace: 'nowrap',
              transition: 'background 0.1s',
            }}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => goTo(Math.min(SLIDES.length - 1, idx + 1))}
          disabled={idx === SLIDES.length - 1}
          style={{ ...arrowBtn(idx === SLIDES.length - 1), borderRight: 'none', borderLeft: `1px solid ${MC.navyMid}` }}
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
