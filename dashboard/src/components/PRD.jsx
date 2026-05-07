import { useState } from 'react'
import { CheckCircle2, AlertTriangle, XCircle, Lock, Settings } from 'lucide-react'

// ─── McKinsey corporate palette ───────────────────────────────────────────────
const MC = {
  blue: '#002654',        // McKinsey primary navy
  ink: '#1A1A1A',
  inkMuted: '#4A4A4A',
  inkSubtle: '#767676',
  canvas: '#FFFFFF',
  surface1: '#F5F5F5',
  inverseCanvas: '#002654',
  inverseSurface1: '#003F87',
  hairline: '#D1D1D1',
  success: '#1A7940',
  warning: '#9C6B00',
  error: '#B81C1C',
  link: '#6491C8',
}

// ─── Small primitives ─────────────────────────────────────────────────────────
function Badge({ children, color = MC.blue, bg }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 0,
      fontSize: 11,
      fontWeight: 600,
      background: bg || color + '18',
      color,
    }}>{children}</span>
  )
}

function Tag({ children, color = MC.inkMuted }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 7px',
      borderRadius: 0,
      fontSize: 11,
      fontWeight: 500,
      background: color + '14',
      color,
      marginRight: 4,
      marginBottom: 4,
    }}>{children}</span>
  )
}

function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, color: MC.ink, margin: 0, letterSpacing: '0.16px' }}>{title}</h2>
      {sub && <p style={{ fontSize: 13, color: MC.inkMuted, marginTop: 4, marginBottom: 0, letterSpacing: '0.16px' }}>{sub}</p>}
    </div>
  )
}

function Card({ children, style }) {
  return (
    <div style={{
      background: MC.canvas,
      borderRadius: 0,
      padding: '20px 24px',
      border: `1px solid ${MC.hairline}`,
      ...style,
    }}>{children}</div>
  )
}

function CodeBlock({ children }) {
  return (
    <pre style={{
      background: MC.inverseCanvas,
      color: '#c6c6c6',
      borderRadius: 0,
      padding: '16px 18px',
      fontSize: 11.5,
      lineHeight: 1.7,
      overflowX: 'auto',
      margin: 0,
      fontFamily: "'IBM Plex Mono', 'Cascadia Code', monospace",
    }}>{children}</pre>
  )
}

function Table({ headers, rows, colWidths }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: MC.inverseCanvas }}>
            {headers.map((h, i) => (
              <th key={i} style={{
                padding: '9px 14px',
                textAlign: 'left',
                fontWeight: 600,
                color: '#ffffff',
                fontSize: 12,
                letterSpacing: '0.16px',
                width: colWidths?.[i],
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? MC.canvas : MC.surface1, borderBottom: `1px solid ${MC.hairline}` }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '10px 14px',
                  color: MC.inkMuted,
                  verticalAlign: 'top',
                  lineHeight: 1.5,
                  letterSpacing: '0.16px',
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EstimateRow({ label, weeks }) {
  const pct = Math.min((weeks / 9) * 100, 100)
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: MC.inkMuted, letterSpacing: '0.16px' }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: MC.blue }}>{weeks}w</span>
      </div>
      <div style={{ height: 6, background: MC.surface1 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: MC.blue }} />
      </div>
    </div>
  )
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
function Tabs({ tabs, active, onChange, size = 'md' }) {
  return (
    <div style={{ display: 'flex', borderBottom: `1px solid ${MC.hairline}`, marginBottom: size === 'sm' ? 16 : 24 }}>
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              padding: size === 'sm' ? '8px 14px' : '10px 18px',
              border: 'none',
              borderBottom: isActive ? `2px solid ${MC.blue}` : '2px solid transparent',
              marginBottom: -1,
              cursor: 'pointer',
              fontSize: size === 'sm' ? 12 : 13,
              fontWeight: isActive ? 600 : 400,
              background: 'transparent',
              color: isActive ? MC.blue : MC.inkMuted,
              letterSpacing: '0.16px',
              transition: 'all 0.1s',
              borderRadius: 0,
            }}
          >{t.label}</button>
        )
      })}
    </div>
  )
}

// ─── SECTION: OVERVIEW ───────────────────────────────────────────────────────
function OverviewSection() {
  const goals = [
    ['Increase seller penetration', 'Seller penetration %', '1.5% → 3%', '6 months'],
    ['Increase financed GMV', 'Monthly financed GMV (€)', '+50%', '6 months'],
    ['Activate dormant resellers', 'Reseller activation rate', 'Baseline → establish', '45 days'],
    ['Increase quote-to-deal conversion', 'Quote attachment rate', 'Baseline → establish', '45 days'],
  ]

  const leading = [
    'Quote attachment rate — quotes generated per reseller per week',
    'Reseller activation rate — % of integrated resellers with ≥1 topi deal in the period',
    'Calculator / quote tool usage',
    'Financed pipeline value — € in deals currently in-progress',
  ]
  const lagging = [
    'Seller penetration % — topi GMV / total reseller B2B GMV',
    'Financed GMV (€)',
  ]

  const problems = [
    { id: 1, title: 'Incentive misalignment', desc: 'Sales rep commission is tied to revenue/margin, not payment method. Offering topi adds steps with no financial upside for the rep.' },
    { id: 2, title: 'No visibility', desc: 'Sellers cannot see their own topi deal pipeline, attach rate, or conversion data.' },
    { id: 3, title: 'No awareness tools', desc: 'Sellers have no ready-made way to promote topi to their existing customer base.' },
    { id: 4, title: 'Friction in the sales conversation', desc: 'Generating a topi quote mid-conversation requires leaving the current tool or going through the full checkout flow.' },
  ]

  return (
    <div>
      <SectionHeader title="PRD Overview" sub="Seller Penetration Initiative — v2.0, May 2026 · Greenfield build" />

      {/* Status bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        <Badge color={MC.warning} bg="#f1c21b18">Draft — Engineering Review</Badge>
        <Badge color={MC.blue}>Owner: Senior PM</Badge>
        <Badge color={MC.inkMuted}>Greenfield — nothing assumed</Badge>
        <Badge color={MC.success}>Target: 1.5% → 3% in 6 months</Badge>
      </div>

      {/* Context */}
      <Card style={{ marginBottom: 20, borderLeft: `4px solid ${MC.blue}` }}>
        <div style={{ fontSize: 13, color: MC.inkMuted, lineHeight: 1.7, letterSpacing: '0.16px' }}>
          topi's seller penetration rate is <strong style={{ color: MC.ink }}>1.5% of reseller GMV</strong>. Industry average is <strong style={{ color: MC.ink }}>3%</strong>.
          Partners are already integrated. The problem is not technology — it is incentives and tooling.
          This PRD covers four features that address the activation gap, ordered by shipping priority.
          All systems described here are <strong style={{ color: MC.ink }}>net-new</strong>. Nothing is assumed to already exist.
        </div>
      </Card>

      {/* Root causes */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Root Causes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {problems.map(p => (
            <Card key={p.id} style={{ borderTop: `3px solid ${MC.blue}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 6, letterSpacing: '0.16px' }}>#{p.id} — {p.title}</div>
              <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.6, letterSpacing: '0.16px' }}>{p.desc}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Goals table */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Goals</h3>
        <Card style={{ padding: 0 }}>
          <Table
            headers={['Goal', 'Metric', 'Target', 'Timeframe']}
            rows={goals}
            colWidths={['35%', '30%', '20%', '15%']}
          />
        </Card>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        <Card>
          <div style={{ fontSize: 12, fontWeight: 600, color: MC.success, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>
            Leading Indicators <span style={{ color: MC.inkSubtle, fontWeight: 400 }}>tracked weekly</span>
          </div>
          {leading.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 12, color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>
              <span style={{ color: MC.success, marginTop: 1 }}>↑</span>
              <span>{m}</span>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontSize: 12, fontWeight: 600, color: MC.blue, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>
            Lagging Indicators <span style={{ color: MC.inkSubtle, fontWeight: 400 }}>tracked monthly</span>
          </div>
          {lagging.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 12, color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>
              <span style={{ color: MC.blue, marginTop: 1 }}>→</span>
              <span>{m}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: '10px 12px', background: '#fff1f1', border: `1px solid ${MC.error}` }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: MC.error, marginBottom: 4, letterSpacing: '0.32px', textTransform: 'uppercase' }}>Kill Switch</div>
            <div style={{ fontSize: 12, color: MC.ink, lineHeight: 1.5, letterSpacing: '0.16px' }}>
              If day-45 data shows &lt;10% change in reseller activation rate, revisit root cause. The problem may be pre-qual friction or sales confidence, not incentives alone.
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// ─── SECTION: ARCHITECTURE ───────────────────────────────────────────────────
function ArchitectureSection() {
  const infra = [
    { name: 'Partner Auth Service', what: 'JWT-based login for reseller accounts', why: 'All four features require login', est: '1w' },
    { name: 'Deal Event Bus', what: 'Internal event stream for deal state changes', why: 'SPIFF engine and Pipeline both consume this', est: '1–2w' },
    { name: 'Notification Service', what: 'Email + in-app alerts', why: 'Onboarding sequences, deal alerts', est: '1w' },
    { name: 'Partner Data Store', what: 'Core partner/reseller records', why: 'Single source of truth for partner IDs', est: '1w' },
    { name: 'Analytics Store', what: 'Aggregated metrics warehouse', why: 'Leading/lagging indicator dashboards', est: '2w' },
  ]

  return (
    <div>
      <SectionHeader title="System Architecture" sub="Shared foundation — built once, all four features layer on top" />

      {/* Diagram */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.32px' }}>Service Map</div>
        <CodeBlock>{`┌──────────────────────────────────────────────────────────────────┐
│                         PARTNER PORTAL                           │
│              React SPA — authentication required                 │
└──────────────────────────┬───────────────────────────────────────┘
                           │  REST API / JSON
┌──────────────────────────▼───────────────────────────────────────┐
│                        API GATEWAY                               │
│         Auth middleware → rate limiting → route dispatch         │
└──┬──────────────┬──────────────┬──────────────┬─────────────────┘
   │              │              │              │
   ▼              ▼              ▼              ▼
SPIFF          PIPELINE      CAMPAIGN        QUOTE
SERVICE        SERVICE       SERVICE         SERVICE`}</CodeBlock>
      </Card>

      {/* Shared infra table */}
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Shared Infrastructure</h3>
        <Card style={{ padding: 0 }}>
          <div style={{ fontSize: 12, color: MC.inkMuted, padding: '14px 24px 0', lineHeight: 1.5, letterSpacing: '0.16px' }}>
            Built before features begin. All four services depend on this foundation.
          </div>
          <div style={{ marginTop: 14 }}>
            <Table
              headers={['Component', 'What it is', 'Why we need it', 'Est.']}
              rows={infra.map(r => [
                <strong style={{ color: MC.ink, letterSpacing: '0.16px' }}>{r.name}</strong>,
                r.what,
                r.why,
                <Badge color={MC.blue}>{r.est}</Badge>,
              ])}
            />
          </div>
          <div style={{ margin: '16px 24px 20px', padding: '10px 14px', background: MC.surface1, border: `1px solid ${MC.hairline}` }}>
            <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>
              <strong style={{ color: MC.ink }}>Total shared infra: ~6–7 weeks.</strong> Infra team works in parallel with Feature 1 design sprint. No feature depends on complete infra before Week 3.
            </div>
          </div>
        </Card>
      </div>

      {/* Feature dependency diagram */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.32px' }}>Build Order + Dependencies</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { wk: 'Wk 1–3', label: 'Shared Infra', desc: 'Auth · Event Bus · Notifications · Data Store · Analytics', deps: 'none' },
            { wk: 'Wk 3–8', label: 'Feature 1: SPIFF + Dashboard', desc: 'SPIFF engine · Payout table · Partner dashboard', deps: 'Needs: Auth · Event Bus' },
            { wk: 'Wk 4–10', label: 'Feature 2: Pipeline Dashboard', desc: 'Deal events · Materialised view · Pipeline UI', deps: 'Needs: Auth · Event Bus' },
            { wk: 'Wk 6–9', label: 'Feature 3: Email Campaign Kit', desc: 'Phase 1 is design only. Phase 2: ingestion · segmentation · Claude API', deps: 'Needs: Auth · Notifications' },
            { wk: 'Wk 9–16', label: 'Feature 4: Live Quote Generator', desc: 'Pricing engine · Pre-qual rules · Quote API · Share URL · PDF', deps: 'Needs: Auth · Products catalogue' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                minWidth: 60, padding: '4px 0', textAlign: 'right',
                fontSize: 11, fontWeight: 600, color: MC.inkSubtle, paddingTop: 8, letterSpacing: '0.16px',
              }}>{r.wk}</div>
              <div style={{ width: 3, background: MC.blue, alignSelf: 'stretch', marginTop: 8 }} />
              <div style={{ flex: 1, padding: '8px 12px', background: MC.surface1, border: `1px solid ${MC.hairline}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: MC.blue, letterSpacing: '0.16px' }}>{r.label}</div>
                <div style={{ fontSize: 12, color: MC.inkMuted, marginTop: 2, letterSpacing: '0.16px' }}>{r.desc}</div>
                <div style={{ fontSize: 11, color: MC.inkSubtle, marginTop: 4 }}>⬆ {r.deps}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ─── SECTION: FEATURE ────────────────────────────────────────────────────────
function FeatureSection() {
  const [feat, setFeat] = useState('spiff')

  const featTabs = [
    { id: 'spiff', label: '1 · SPIFF Program' },
    { id: 'pipeline', label: '2 · Pipeline Dashboard' },
    { id: 'campaign', label: '3 · Email Campaign Kit' },
    { id: 'quote', label: '4 · Live Quote Generator' },
  ]

  return (
    <div>
      <SectionHeader title="Features" sub="4 features · ordered by shipping priority" />
      <Tabs tabs={featTabs} active={feat} onChange={setFeat} />
      {feat === 'spiff' && <SpiffFeature />}
      {feat === 'pipeline' && <PipelineFeature />}
      {feat === 'campaign' && <CampaignFeature />}
      {feat === 'quote' && <QuoteFeature />}
    </div>
  )
}

// ── Feature 1: SPIFF ─────────────────────────────────────────────────────────
function SpiffFeature() {
  const [tab, setTab] = useState('overview')
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'datamodel', label: 'Data Model' },
    { id: 'api', label: 'API' },
    { id: 'frontend', label: 'Frontend / Backend' },
    { id: 'estimate', label: 'Estimate' },
  ]

  const tiers = [
    ['< €5,000', '€20–€50', 'No'],
    ['€5,000–€20,000', '€100–€250', 'No'],
    ['€20,000–€50,000', '€300–€450', 'No'],
    ['> €50,000', '€500–€1,000', 'Yes'],
  ]

  return (
    <div>
      <Card style={{ marginBottom: 20, borderLeft: `4px solid ${MC.blue}` }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>Tiered Seller SPIFF Program + Tracking Dashboard</div>
          <div style={{ fontSize: 13, color: MC.inkMuted, marginTop: 4, lineHeight: 1.6, letterSpacing: '0.16px' }}>
            A cash incentive paid directly to the reseller sales rep for every topi-financed deal closed above the reseller's historical baseline. Bypasses slow corporate incentive structures.
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge color={MC.success}>Low engineering for v1</Badge>
            <Badge color={MC.warning} bg="#f1c21b18">Very high impact</Badge>
            <Badge color={MC.blue}>Ships first</Badge>
          </div>
        </div>
      </Card>

      <Tabs tabs={tabs} active={tab} onChange={setTab} size="sm" />

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>User Story</div>
              <div style={{ fontSize: 13, fontStyle: 'italic', color: MC.inkMuted, lineHeight: 1.7, borderLeft: `3px solid ${MC.blue}`, paddingLeft: 12, letterSpacing: '0.16px' }}>
                As a reseller sales rep, I want to receive a direct cash bonus when I close a topi-financed deal, so that offering topi has a clear financial upside for me and I am motivated to introduce it in every eligible conversation.
              </div>
            </Card>
            <Card style={{ padding: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', padding: '14px 24px 0' }}>SPIFF Tiers</div>
              <div style={{ marginTop: 12 }}>
                <Table
                  headers={['Deal Size', 'Bonus Range', 'Prize Pool']}
                  rows={tiers.map(r => [
                    <strong style={{ color: MC.ink }}>{r[0]}</strong>,
                    <span style={{ color: MC.success, fontWeight: 600 }}>{r[1]}</span>,
                    r[2] === 'Yes' ? <Badge color={MC.warning} bg="#f1c21b18">Yes</Badge> : '—',
                  ])}
                />
              </div>
              <div style={{ fontSize: 11, color: MC.inkSubtle, padding: '10px 24px 14px', letterSpacing: '0.16px' }}>
                Bonuses are incremental above the reseller's existing GMV baseline to prevent gaming.
              </div>
            </Card>
          </div>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>Dashboard Add-on</div>
              {['Total SPIFF earned (current quarter)', 'Deals closed via topi — current vs. prior period', 'topi attach rate — % of B2B deals financed via topi', 'Leaderboard position vs. peer resellers (anonymised)', 'Quarterly prize pool status'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7, fontSize: 12, color: MC.inkMuted, letterSpacing: '0.16px' }}>
                  <span style={{ color: MC.blue }}>•</span>{item}
                </div>
              ))}
            </Card>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>Automated Onboarding Emails</div>
              {[
                { day: 'Day 0', msg: 'Welcome + how tiers work + link to quote tool' },
                { day: 'Day 7', msg: '"Here is how top resellers use topi" — data from highest-performing cohort' },
                { day: 'Day 30', msg: 'SPIFF earned so far + what to do to reach the next tier' },
              ].map((e, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <div style={{ minWidth: 50, padding: '2px 8px', background: '#edf5ff', color: MC.blue, fontSize: 11, fontWeight: 700, textAlign: 'center', height: 'fit-content', letterSpacing: '0.16px' }}>{e.day}</div>
                  <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>{e.msg}</div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {tab === 'datamodel' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'partners', code: `CREATE TABLE partners (
  partner_id      UUID PRIMARY KEY,
  name            TEXT NOT NULL,
  tier            TEXT,          -- 'standard' | 'premium'
  enrolled_spiff  BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);` },
            { label: 'reps', code: `CREATE TABLE reps (
  rep_id          UUID PRIMARY KEY,
  partner_id      UUID REFERENCES partners(partner_id),
  name            TEXT NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);` },
            { label: 'deals', code: `CREATE TABLE deals (
  deal_id         UUID PRIMARY KEY,
  partner_id      UUID REFERENCES partners(partner_id),
  rep_id          UUID REFERENCES reps(rep_id),
  deal_value      NUMERIC(12,2) NOT NULL,
  status          TEXT NOT NULL,
  -- 'quote_sent' | 'in_checkout' | 'credit_review'
  -- | 'approved' | 'active' | 'abandoned' | 'expired'
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  closed_at       TIMESTAMPTZ,
  quote_id        UUID  -- FK to quotes table if originated from quote tool
);` },
            { label: 'spiff_tiers', code: `CREATE TABLE spiff_tiers (
  tier_id           UUID PRIMARY KEY,
  min_value         NUMERIC(12,2) NOT NULL,
  max_value         NUMERIC(12,2),  -- NULL = no upper bound
  bonus_min         NUMERIC(8,2)  NOT NULL,
  bonus_max         NUMERIC(8,2)  NOT NULL,
  prize_pool_entry  BOOLEAN DEFAULT FALSE,
  effective_from    DATE NOT NULL,
  effective_to      DATE
);` },
            { label: 'partner_baselines', code: `CREATE TABLE partner_baselines (
  baseline_id     UUID PRIMARY KEY,
  partner_id      UUID REFERENCES partners(partner_id),
  period_start    DATE NOT NULL,
  period_end      DATE NOT NULL,
  avg_weekly_gmv  NUMERIC(12,2) NOT NULL,
  deal_count      INT  NOT NULL,
  calculated_at   TIMESTAMPTZ DEFAULT NOW()
);` },
            { label: 'spiff_payouts', code: `CREATE TABLE spiff_payouts (
  payout_id       UUID PRIMARY KEY,
  rep_id          UUID REFERENCES reps(rep_id),
  deal_id         UUID REFERENCES deals(deal_id),
  amount          NUMERIC(8,2) NOT NULL,
  tier_id         UUID REFERENCES spiff_tiers(tier_id),
  status          TEXT DEFAULT 'pending',
  -- 'pending' | 'approved' | 'paid' | 'rejected'
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  approved_at     TIMESTAMPTZ,
  paid_at         TIMESTAMPTZ
);` },
          ].map(t => (
            <Card key={t.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Tag color={MC.blue}>{t.label}</Tag>
              </div>
              <CodeBlock>{t.code}</CodeBlock>
            </Card>
          ))}

          <Card style={{ background: MC.surface1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MC.ink, marginBottom: 10, letterSpacing: '0.16px' }}>SPIFF Engine Logic</div>
            <CodeBlock>{`Trigger: deal.status changes to 'active' (closed-won)

1. Load deal → get partner_id, rep_id, deal_value
2. Load current partner_baseline (most recent active record)
3. Incremental check:
   - current-quarter deal count > baseline deal count → eligible
   - else → skip (not incremental, no payout)
4. Load active spiff_tier for deal_value range
5. Calculate bonus:
   bonus = random_in_range(tier.bonus_min, tier.bonus_max)
   (round to nearest €10 for amounts > €50)
6. Write spiff_payouts record  { status: 'pending' }
7. If tier.prize_pool_entry → write to prize_pool_entries
8. Emit notification to rep: "You earned a €{bonus} SPIFF bonus"`}</CodeBlock>
          </Card>
        </div>
      )}

      {tab === 'api' && (
        <Card>
          <CodeBlock>{`# Auth
POST   /auth/login
       → { token, partner_id, rep_id }

POST   /auth/refresh
       → { token }

# SPIFF — Partner / Rep views
GET    /partner/{partner_id}/spiff/summary
       → { earned_qtd, deal_count, leaderboard_rank, prize_pool_entries }

GET    /rep/{rep_id}/spiff/history
       → [ { deal_id, amount, status, date } ]

GET    /partner/{partner_id}/leaderboard
       → [ { rank, attach_rate, spiff_earned (own), others: anonymised } ]

# SPIFF — Finance admin (internal)
GET    /admin/spiff/payouts
       → [ pending payouts queue ]

PATCH  /admin/spiff/payouts/{payout_id}
       Body: { status: 'approved' | 'rejected' }

# Baseline recalculation (admin trigger)
POST   /admin/baselines/recalculate
       → triggers weekly batch job`}</CodeBlock>
        </Card>
      )}

      {tab === 'frontend' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Frontend Requirements</div>
            {[
              { section: 'Partner Dashboard — SPIFF Tab', items: ['Total SPIFF earned (QTD) with tier progress bar', 'Deal history table: date, deal value, bonus, status', 'Leaderboard rank card with anonymised peer comparison', 'Quarterly prize pool: entries count, draw date'] },
              { section: 'Rep-Level View', items: ['Personal SPIFF history (individual rep login)', 'Current quarter vs. prior quarter earnings'] },
              { section: 'Finance Admin View (internal)', items: ['Pending payouts list with deal detail', 'Bulk approve / reject', 'Total SPIFF liability (approved + pending)', 'Export to CSV for payroll processing'] },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: MC.blue, marginBottom: 6, letterSpacing: '0.16px' }}>{s.section}</div>
                {s.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 12, color: MC.inkMuted, marginBottom: 4, paddingLeft: 12, letterSpacing: '0.16px' }}>• {item}</div>
                ))}
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Backend Requirements</div>
            {[
              'SPIFF engine — event-driven on deal.status → active',
              'Baseline calculation job — weekly cron, rolling 90-day avg per partner',
              'Payout batch aggregation — daily, surfaces new pending payouts to Finance queue',
              'Notification triggers — payout earned, approved, paid',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 12, color: MC.inkMuted, letterSpacing: '0.16px' }}>
                <span style={{ color: MC.blue, marginTop: 1 }}>⚙</span><span>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 12, letterSpacing: '0.16px' }}>Integrations</div>
              <Table
                headers={['Integration', 'Direction', 'Purpose']}
                rows={[
                  ['Email service (Sendgrid)', 'Outbound', 'Onboarding + SPIFF notifications'],
                  ['Payroll / payment system', 'Outbound write', 'Trigger SPIFF payout to rep'],
                  ['Finance tooling', 'Read', 'Finance reviews pending payouts'],
                ]}
              />
            </div>
          </Card>
        </div>
      )}

      {tab === 'estimate' && (
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 20, letterSpacing: '0.16px' }}>Engineering Estimate</div>
          <EstimateRow label="Data model + SPIFF engine" weeks={2} />
          <EstimateRow label="Baseline calculation job" weeks={1} />
          <EstimateRow label="Partner dashboard (frontend)" weeks={3} />
          <EstimateRow label="Finance admin view" weeks={1} />
          <EstimateRow label="Automated onboarding emails" weeks={1} />
          <div style={{ marginTop: 20, padding: '12px 16px', background: '#edf5ff', border: `1px solid ${MC.blue}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.blue, letterSpacing: '0.16px' }}>Total: ~6–8 weeks</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, marginBottom: 8, letterSpacing: '0.16px' }}>Not in v1</div>
            {['Gamification beyond leaderboard (badges, levels)', 'Real-time SPIFF push notifications', 'Rep-to-rep direct visibility (anonymised leaderboard only)'].map((item, i) => (
              <div key={i} style={{ fontSize: 12, color: MC.inkSubtle, marginBottom: 4, letterSpacing: '0.16px' }}>✗ {item}</div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

// ── Feature 2: Pipeline Dashboard ────────────────────────────────────────────
function PipelineFeature() {
  const [tab, setTab] = useState('overview')
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'datamodel', label: 'Data Model' },
    { id: 'api', label: 'API + GDPR' },
    { id: 'frontend', label: 'Frontend / Backend' },
    { id: 'estimate', label: 'Estimate' },
  ]

  const stages = [
    ['Quote sent', 'Customer received checkout link, not yet started', '—'],
    ['In checkout', 'Customer started the checkout flow', '—'],
    ['Credit review', 'topi is underwriting the application', 'Monitor'],
    ['Approved', 'Customer approved, awaiting contract signature', 'Nudge customer'],
    ['Active', 'Contract signed, device delivered', 'Baseline deal'],
    ['Expiring soon', 'Contract within 90 days of end date', 'Renewal conversation'],
    ['Abandoned', 'Checkout started, not completed >72h', 'Follow up'],
  ]

  return (
    <div>
      <Card style={{ marginBottom: 20, borderLeft: `4px solid ${MC.blue}` }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>Pipeline Dashboard</div>
          <div style={{ fontSize: 13, color: MC.inkMuted, marginTop: 4, lineHeight: 1.6, letterSpacing: '0.16px' }}>
            Real-time deal-stage visibility per reseller. Shows in-progress deals (quote sent, abandoned, in credit review, closed). Lets sellers follow up at the right moment instead of losing deals to inertia.
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge color={MC.warning} bg="#f1c21b18">Medium-high effort</Badge>
            <Badge color={MC.blue}>High impact</Badge>
            <Badge color={MC.inkMuted}>Ships Q2</Badge>
          </div>
        </div>
      </Card>

      <Tabs tabs={tabs} active={tab} onChange={setTab} size="sm" />

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>User Story</div>
              <div style={{ fontSize: 13, fontStyle: 'italic', color: MC.inkMuted, lineHeight: 1.7, borderLeft: `3px solid ${MC.blue}`, paddingLeft: 12, letterSpacing: '0.16px' }}>
                As a reseller account manager, I want to see the current status of all topi deals in progress with my customers, so that I can follow up at the right moment and prevent deal abandonment.
              </div>
            </Card>
            <Card style={{ padding: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', padding: '14px 24px 0' }}>Deal Stages</div>
              <div style={{ marginTop: 12 }}>
                <Table
                  headers={['Stage', 'Definition', 'Action']}
                  rows={stages.map(r => [
                    <strong style={{ color: MC.ink }}>{r[0]}</strong>,
                    <span style={{ fontSize: 12 }}>{r[1]}</span>,
                    r[2] === '—' ? <span style={{ color: MC.inkSubtle }}>—</span> : <Badge color={MC.blue}>{r[2]}</Badge>,
                  ])}
                />
              </div>
            </Card>
          </div>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>Frontend Features</div>
              {[
                'Kanban-style view grouped by deal stage',
                'List view: sortable + filterable by stage, deal value, time in stage',
                'Deal card: company name, value, stage, time since last update, abandoned flag',
                'Abandoned deals: one-click "Send reminder" button',
                'Expiring soon: "Start renewal conversation" CTA',
                'Export to CSV',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7, fontSize: 12, color: MC.inkMuted, letterSpacing: '0.16px' }}>
                  <span style={{ color: MC.blue }}>•</span>{item}
                </div>
              ))}
            </Card>
            <Card style={{ background: '#fff1f1', border: `1px solid ${MC.error}` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.error, marginBottom: 10, letterSpacing: '0.32px', textTransform: 'uppercase' }}>GDPR Rules</div>
              {[
                'Customer full name + email: never in partner-visible tables',
                'Partner pipeline shows company name only',
                'Full PII lives in internal-only customer_contacts table',
                'send-reminder resolves contact server-side — partner never sees email',
                'Retention: deal records purged 7 years after contract close',
              ].map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: MC.ink, marginBottom: 5, letterSpacing: '0.16px', display: 'flex', alignItems: 'center', gap: 6 }}><Lock size={12} strokeWidth={1.5} style={{ color: MC.error, flexShrink: 0 }} />{item}</div>
              ))}
            </Card>
          </div>
        </div>
      )}

      {tab === 'datamodel' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'deal_events', note: 'append-only event log', code: `CREATE TABLE deal_events (
  event_id        UUID PRIMARY KEY,
  deal_id         UUID REFERENCES deals(deal_id),
  from_status     TEXT,
  to_status       TEXT NOT NULL,
  occurred_at     TIMESTAMPTZ DEFAULT NOW(),
  metadata        JSONB  -- underwriting decision, reason codes
);` },
            { label: 'partner_pipeline', note: 'materialized view — refreshed every 15 min', code: `CREATE MATERIALIZED VIEW partner_pipeline AS
SELECT
  d.deal_id,
  d.partner_id,
  d.rep_id,
  d.deal_value,
  d.status AS current_status,
  d.created_at,
  EXTRACT(EPOCH FROM (NOW() - MAX(e.occurred_at)))/3600
    AS hours_in_current_status,
  d.customer_company_name   -- GDPR: no PII, company name only
FROM deals d
LEFT JOIN deal_events e ON e.deal_id = d.deal_id
GROUP BY d.deal_id, d.partner_id, d.rep_id,
         d.deal_value, d.status, d.created_at,
         d.customer_company_name;

CREATE INDEX idx_pipeline_partner ON partner_pipeline(partner_id);
CREATE INDEX idx_pipeline_status  ON partner_pipeline(current_status);` },
            { label: 'deal_reminders', code: `CREATE TABLE deal_reminders (
  reminder_id     UUID PRIMARY KEY,
  deal_id         UUID REFERENCES deals(deal_id),
  sent_by_rep_id  UUID REFERENCES reps(rep_id),
  sent_at         TIMESTAMPTZ DEFAULT NOW(),
  template_used   TEXT
);` },
          ].map(t => (
            <Card key={t.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Tag color={MC.blue}>{t.label}</Tag>
                {t.note && <span style={{ fontSize: 11, color: MC.inkSubtle, letterSpacing: '0.16px' }}>{t.note}</span>}
              </div>
              <CodeBlock>{t.code}</CodeBlock>
            </Card>
          ))}
        </div>
      )}

      {tab === 'api' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <CodeBlock>{`GET    /partner/{partner_id}/pipeline
       → stages: { quote_sent, in_checkout, credit_review,
                   approved, active, expiring_soon, abandoned }
       Each stage: [ { deal_id, company_name, deal_value,
                       current_status, hours_in_status } ]
       Query params: ?stage=abandoned&min_value=5000&sort=hours_in_status

GET    /partner/{partner_id}/pipeline/summary
       → { total_active, total_value, abandoned_count, expiring_soon_count }

POST   /deal/{deal_id}/send-reminder
       Body: { template: 'checkout_nudge' | 'approval_follow_up' }
       → triggers email to customer (backend resolves contact — never exposed)

GET    /partner/{partner_id}/pipeline/export
       → CSV: company name, deal value, stage, time in stage`}</CodeBlock>
          </Card>
          <Card style={{ background: '#fff1f1', border: `1px solid ${MC.error}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.error, marginBottom: 10, letterSpacing: '0.16px' }}>GDPR Data Handling</div>
            <div style={{ fontSize: 12, color: MC.ink, lineHeight: 1.8, letterSpacing: '0.16px' }}>
              The <code style={{ background: MC.surface1, padding: '1px 4px', fontFamily: 'IBM Plex Mono, monospace' }}>send-reminder</code> endpoint resolves the customer contact from an <strong>internal-only</strong> <code style={{ background: MC.surface1, padding: '1px 4px', fontFamily: 'IBM Plex Mono, monospace' }}>customer_contacts</code> table that is never exposed to partners via any API.
              The partner calls <code style={{ background: MC.surface1, padding: '1px 4px', fontFamily: 'IBM Plex Mono, monospace' }}>POST /deal/{`{id}`}/send-reminder</code> — the backend looks up the contact, sends the email, and returns only a confirmation.
              No PII traverses the partner-facing API layer.
            </div>
          </Card>
        </div>
      )}

      {tab === 'frontend' && (
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Backend Requirements</div>
          {[
            'Deal events service — receives deal state changes, writes to deal_events, updates deals.status',
            'Pipeline materialized view refresh job — cron every 15 minutes',
            'Abandoned detection job — hourly cron: flag deals in in_checkout > 72h',
            'Expiring soon detection job — daily cron: flag active deals within 90 days of contract end',
            'Reminder email service — renders template + sends via email provider',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 12, color: MC.inkMuted, letterSpacing: '0.16px' }}>
              <Settings size={12} strokeWidth={1.5} style={{ color: MC.blue, flexShrink: 0, marginTop: 1 }} /><span>{item}</span>
            </div>
          ))}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 12, letterSpacing: '0.16px' }}>Integrations</div>
            <Table
              headers={['Integration', 'Direction', 'Purpose']}
              rows={[
                ['Deal state machine (internal)', 'Read', 'Source of deal_events'],
                ['Email service', 'Outbound', 'Customer reminder emails'],
                ['Partner auth', 'Read', 'Scoped deal visibility per partner'],
              ]}
            />
          </div>
        </Card>
      )}

      {tab === 'estimate' && (
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 20, letterSpacing: '0.16px' }}>Engineering Estimate</div>
          <EstimateRow label="Deal events service + data model" weeks={2} />
          <EstimateRow label="Abandoned + expiring detection jobs" weeks={1} />
          <EstimateRow label="Pipeline API + GDPR masking" weeks={2} />
          <EstimateRow label="Frontend dashboard" weeks={3} />
          <EstimateRow label="Reminder email integration" weeks={1} />
          <div style={{ marginTop: 20, padding: '12px 16px', background: '#edf5ff', border: `1px solid ${MC.blue}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.blue, letterSpacing: '0.16px' }}>Total: ~7–9 weeks</div>
          </div>
        </Card>
      )}
    </div>
  )
}

// ── Feature 3: Email Campaign Kit ────────────────────────────────────────────
function CampaignFeature() {
  const [tab, setTab] = useState('overview')
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'datamodel', label: 'Data Model (Phase 2)' },
    { id: 'api', label: 'API (Phase 2)' },
    { id: 'estimate', label: 'Estimate' },
  ]

  const templates = [
    { title: '"Rent instead of buy" intro', audience: 'Customers who have never heard of topi' },
    { title: 'Device refresh timing', audience: 'Customers whose device purchases are 2–3 years old' },
    { title: 'CAPEX to OpEx CFO pitch', audience: 'Finance decision makers' },
    { title: 'PEAC credibility', audience: '"topi is now backed by a €4.5B institution"' },
  ]

  return (
    <div>
      <Card style={{ marginBottom: 20, borderLeft: `4px solid ${MC.blue}` }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>Email Campaign Kit</div>
          <div style={{ fontSize: 13, color: MC.inkMuted, marginTop: 4, lineHeight: 1.6, letterSpacing: '0.16px' }}>
            Pre-built email templates resellers send to their existing B2B customer lists to promote topi financing. Phase 2 adds AI synthesis of the reseller's customer data to draft personalised campaigns.
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge color={MC.success}>Phase 1: zero engineering</Badge>
            <Badge color={MC.warning} bg="#f1c21b18">Phase 2: 3–4 weeks</Badge>
            <Badge color={MC.blue}>Ships Wk 2–3</Badge>
          </div>
        </div>
      </Card>

      <Tabs tabs={tabs} active={tab} onChange={setTab} size="sm" />

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>User Story</div>
              <div style={{ fontSize: 13, fontStyle: 'italic', color: MC.inkMuted, lineHeight: 1.7, borderLeft: `3px solid ${MC.blue}`, paddingLeft: 12, letterSpacing: '0.16px' }}>
                As a reseller marketing or account team, I want ready-to-send email templates about topi financing that I can send to my customers, so that I can drive awareness without spending time on copywriting or design.
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>Phase 1 Templates — Design Only</div>
              {templates.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, padding: '10px 12px', background: MC.surface1, border: `1px solid ${MC.hairline}`, borderLeft: `3px solid ${MC.blue}` }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: MC.blue, letterSpacing: '0.16px' }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: MC.inkMuted, marginTop: 2, letterSpacing: '0.16px' }}>For: {t.audience}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: MC.inkSubtle, marginTop: 4, letterSpacing: '0.16px' }}>
                Each template: co-branded (reseller + topi logo), device-agnostic, includes reseller's custom checkout link.
              </div>
            </Card>
          </div>
          <Card>
            <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>Phase 2 — AI Campaign Synthesis</div>
            <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.7, marginBottom: 16, letterSpacing: '0.16px' }}>
              For resellers who share their customer list (opt-in, GDPR-compliant). topi ingests anonymised purchase history, segments customers, and drafts personalised campaigns using the Claude API.
            </div>
            {[
              { step: '1', label: 'Reseller uploads customer CSV', note: 'Opt-in · GDPR consent captured' },
              { step: '2', label: 'Segmentation job runs', note: 'By device age, value tier, industry' },
              { step: '3', label: 'Claude API drafts subject + opening', note: 'Per segment — no PII in prompt' },
              { step: '4', label: 'Reseller reviews in campaign builder', note: 'Editable inline before export' },
              { step: '5', label: 'Export only — reseller sends from their own tool', note: 'topi does not send on their behalf' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div style={{ minWidth: 22, height: 22, background: MC.blue, color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.step}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: MC.inkSubtle, letterSpacing: '0.16px' }}>{s.note}</div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}

      {tab === 'datamodel' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'partner_customer_uploads', code: `CREATE TABLE partner_customer_uploads (
  upload_id         UUID PRIMARY KEY,
  partner_id        UUID REFERENCES partners(partner_id),
  filename          TEXT,
  gdpr_consent_at   TIMESTAMPTZ NOT NULL,  -- required before processing
  status            TEXT DEFAULT 'pending',
  -- 'pending' | 'processing' | 'ready' | 'deleted'
  uploaded_at       TIMESTAMPTZ DEFAULT NOW(),
  deleted_at        TIMESTAMPTZ  -- set on partner deletion request
);` },
            { label: 'partner_customers', note: 'anonymised — no PII stored', code: `CREATE TABLE partner_customers (
  customer_id          UUID PRIMARY KEY,
  upload_id            UUID REFERENCES partner_customer_uploads(upload_id),
  partner_id           UUID REFERENCES partners(partner_id),
  -- Anonymised fields only — no name, email, address
  industry             TEXT,
  company_size         TEXT,    -- 'smb' | 'mid' | 'enterprise'
  last_purchase_value  NUMERIC(12,2),
  last_purchase_date   DATE,
  device_age_months    INT,
  created_at           TIMESTAMPTZ DEFAULT NOW()
);` },
            { label: 'campaign_segments', code: `CREATE TABLE campaign_segments (
  segment_id       UUID PRIMARY KEY,
  upload_id        UUID REFERENCES partner_customer_uploads(upload_id),
  partner_id       UUID REFERENCES partners(partner_id),
  segment_label    TEXT,        -- e.g. "Device refresh candidates"
  customer_count   INT,
  ai_subject_line  TEXT,
  ai_opening_para  TEXT,
  template_base    TEXT,        -- which template this extends
  created_at       TIMESTAMPTZ DEFAULT NOW()
);` },
          ].map(t => (
            <Card key={t.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Tag color={MC.blue}>{t.label}</Tag>
                {t.note && <span style={{ fontSize: 11, color: MC.inkSubtle, letterSpacing: '0.16px' }}>{t.note}</span>}
              </div>
              <CodeBlock>{t.code}</CodeBlock>
            </Card>
          ))}
          <Card style={{ background: MC.surface1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MC.ink, marginBottom: 10, letterSpacing: '0.16px' }}>Claude API Prompt Constraints</div>
            <CodeBlock>{`Input to Claude API:
  - Segment profile: { industry, company_size, device_age_avg, value_tier }
  - Template base:   { subject_template, body_template }
  - Reseller context: { name, checkout_link }
  — No customer PII in prompt —

Output:
  - subject_line   (max 60 chars)
  - opening_paragraph (max 100 words)

Reseller reviews + edits before export.
We do not send on their behalf — export only.`}</CodeBlock>
          </Card>
        </div>
      )}

      {tab === 'api' && (
        <Card>
          <CodeBlock>{`POST   /partner/{partner_id}/campaigns/upload
       multipart/form-data: { file, gdpr_consent: true }
       → { upload_id, status: 'pending' }

GET    /partner/{partner_id}/campaigns/uploads/{upload_id}/status
       → { status, segment_count, ready_at }

GET    /partner/{partner_id}/campaigns/segments/{upload_id}
       → [ { segment_label, customer_count,
             ai_subject_line, ai_opening_para,
             template_base } ]

GET    /partner/{partner_id}/campaigns/export/{segment_id}
       → HTML email (ready to paste into reseller's own tool)

DELETE /partner/{partner_id}/campaigns/uploads/{upload_id}
       → data deletion, sets deleted_at, purges partner_customers rows`}</CodeBlock>
        </Card>
      )}

      {tab === 'estimate' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card style={{ borderTop: `3px solid ${MC.success}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.success, marginBottom: 12, letterSpacing: '0.16px' }}>Phase 1 — Templates</div>
            <div style={{ fontSize: 22, fontWeight: 300, color: MC.success, marginBottom: 8, letterSpacing: '-0.02em' }}>0 weeks</div>
            <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.6, letterSpacing: '0.16px' }}>Design + copywriting only. 4 templates designed and delivered to top 10 partners by week 2–3.</div>
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 16, letterSpacing: '0.16px' }}>Phase 2 — AI Synthesis</div>
            <EstimateRow label="Ingestion + GDPR framework" weeks={2} />
            <EstimateRow label="Segmentation + Claude API integration" weeks={2} />
            <EstimateRow label="Campaign builder UI" weeks={1} />
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#edf5ff', border: `1px solid ${MC.blue}` }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: MC.blue, letterSpacing: '0.16px' }}>Phase 2 total: ~3–4 weeks</div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

// ── Feature 4: Live Quote Generator ──────────────────────────────────────────
function QuoteFeature() {
  const [tab, setTab] = useState('overview')
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'datamodel', label: 'Data Model' },
    { id: 'api', label: 'API' },
    { id: 'frontend', label: 'Frontend / Backend' },
    { id: 'estimate', label: 'Estimate' },
  ]

  return (
    <div>
      <Card style={{ marginBottom: 20, borderLeft: `4px solid ${MC.blue}` }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>Live Quote Generator</div>
          <div style={{ fontSize: 13, color: MC.inkMuted, marginTop: 4, lineHeight: 1.6, letterSpacing: '0.16px' }}>
            A standalone web tool that allows any reseller to generate a shareable topi financing quote in 30 seconds, mid-customer-conversation, without going through the full checkout flow.
          </div>
          <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge color={MC.error}>High effort</Badge>
            <Badge color={MC.blue}>Medium impact</Badge>
            <Badge color={MC.inkMuted}>Ships Q2–Q3</Badge>
          </div>
        </div>
      </Card>

      <Tabs tabs={tabs} active={tab} onChange={setTab} size="sm" />

      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>User Story</div>
              <div style={{ fontSize: 13, fontStyle: 'italic', color: MC.inkMuted, lineHeight: 1.7, borderLeft: `3px solid ${MC.blue}`, paddingLeft: 12, letterSpacing: '0.16px' }}>
                As a reseller sales rep in a live customer meeting, I want to generate a topi financing quote on the spot by entering the device and deal details, so that I can show the customer their monthly payment option without interrupting or extending the conversation.
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>Quote Output</div>
              {['Device name + image', 'Monthly rate per term: 6 / 12 / 24 / 36 months', 'Total cost over term', 'vs. RRP comparison', 'Tax benefit note (100% OpEx deductible)', 'Shareable link (customer proceeds to checkout)', 'PDF download'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7, fontSize: 12, color: MC.inkMuted, letterSpacing: '0.16px' }}>
                  <span style={{ color: MC.blue }}>•</span>{item}
                </div>
              ))}
            </Card>
          </div>
          <div>
            <Card style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, textTransform: 'uppercase', letterSpacing: '0.32px', marginBottom: 12 }}>Pre-qual Indicator</div>
              {[
                { Icon: CheckCircle2, label: 'Likely approve', color: MC.success, desc: 'Deal value < €50k, standard company profile' },
                { Icon: AlertTriangle, label: 'Needs review', color: MC.warning, desc: 'Deal value > €50k, flagged by rules' },
                { Icon: XCircle, label: 'Contact support', color: MC.error, desc: 'Known exclusion criteria match' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, padding: '8px 10px', background: MC.surface1, border: `1px solid ${MC.hairline}`, borderLeft: `3px solid ${p.color}` }}>
                  <p.Icon size={15} strokeWidth={1.5} style={{ color: p.color, flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: p.color, letterSpacing: '0.16px' }}>{p.label}</div>
                    <div style={{ fontSize: 11, color: MC.inkMuted, letterSpacing: '0.16px' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: 11, color: MC.inkSubtle, marginTop: 8, letterSpacing: '0.16px' }}>
                v1 is rules-based only — no external credit bureau API. Company name stored but not used for lookup. v2 integrates Creditsafe / Dun & Bradstreet.
              </div>
            </Card>
            <Card style={{ background: MC.surface1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.ink, marginBottom: 8, letterSpacing: '0.32px', textTransform: 'uppercase' }}>Rate Limiting</div>
              <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.6, letterSpacing: '0.16px' }}>
                Max 50 quotes/hour per partner. Sliding window. Prevents pricing scraping. Partner auth required — public access blocked.
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'datamodel' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'products', code: `CREATE TABLE products (
  product_id    UUID PRIMARY KEY,
  name          TEXT NOT NULL,
  category      TEXT,         -- 'laptop' | 'phone' | 'tablet' | 'other'
  rrp_eur       NUMERIC(10,2),
  image_url     TEXT,
  active        BOOLEAN DEFAULT TRUE
);` },
            { label: 'pricing_rules', code: `CREATE TABLE pricing_rules (
  rule_id           UUID PRIMARY KEY,
  term_months       INT NOT NULL,    -- 6 | 12 | 24 | 36
  min_value         NUMERIC(10,2) NOT NULL,
  max_value         NUMERIC(10,2),
  monthly_rate_pct  NUMERIC(5,4) NOT NULL, -- e.g. 0.0285 = 2.85%
  effective_from    DATE NOT NULL,
  effective_to      DATE
);` },
            { label: 'quotes', code: `CREATE TABLE quotes (
  quote_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id       UUID REFERENCES partners(partner_id),
  rep_id           UUID REFERENCES reps(rep_id),
  product_id       UUID REFERENCES products(product_id),
  deal_value       NUMERIC(10,2) NOT NULL,
  customer_company TEXT,
  terms_output     JSONB NOT NULL,
  -- [ { term: 6,  monthly_rate: 250.00, total: 1500.00 },
  --   { term: 12, monthly_rate: 140.00, total: 1680.00 },
  --   { term: 24, monthly_rate: 80.00,  total: 1920.00 },
  --   { term: 36, monthly_rate: 60.00,  total: 2160.00 } ]
  prequal_result   TEXT,  -- 'likely_approve' | 'needs_review' | 'flag'
  status           TEXT DEFAULT 'draft',
  -- 'draft' | 'shared' | 'converted' | 'expired'
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  expires_at       TIMESTAMPTZ,         -- 30 days after creation
  converted_deal_id UUID REFERENCES deals(deal_id)
);` },
            { label: 'quote_rate_limits', code: `CREATE TABLE quote_rate_limits (
  partner_id    UUID REFERENCES partners(partner_id),
  window_start  TIMESTAMPTZ NOT NULL,
  quote_count   INT DEFAULT 0,
  PRIMARY KEY (partner_id, window_start)
);` },
          ].map(t => (
            <Card key={t.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Tag color={MC.blue}>{t.label}</Tag>
              </div>
              <CodeBlock>{t.code}</CodeBlock>
            </Card>
          ))}
          <Card style={{ background: MC.surface1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: MC.ink, marginBottom: 10, letterSpacing: '0.16px' }}>Pricing Engine Logic</div>
            <CodeBlock>{`Input: deal_value, term_months

1. Load active pricing_rule WHERE:
   - term_months  = input.term_months
   - min_value   <= deal_value < max_value
   - effective_from <= TODAY (effective_to IS NULL or >= TODAY)

2. Calculate:
   monthly_rate = deal_value * pricing_rule.monthly_rate_pct
   total        = monthly_rate * term_months

3. Return: { term, monthly_rate, total }

For quote output: run steps 1–3 for each of [6, 12, 24, 36]`}</CodeBlock>
          </Card>
        </div>
      )}

      {tab === 'api' && (
        <Card>
          <CodeBlock>{`# Product catalogue
GET    /products/search?q={query}
       → [ { product_id, name, category, rrp_eur, image_url } ]

# Quote generation
POST   /quotes
       Body: { partner_id, rep_id, product_id?, deal_value,
               customer_company, terms?: [6,12,24,36] }
       → { quote_id, terms_output, prequal_result,
           share_url, expires_at }

# Shareable quote (public — no auth required)
GET    /quote/{quote_id}
       → full quote card + CTA "Proceed to checkout"
       → pre-populates checkout with quote data

# Conversion tracking
PATCH  /quote/{quote_id}/convert
       Body: { deal_id }
       → marks quote as converted, links to deal

# PDF
GET    /quote/{quote_id}/pdf
       → PDF binary (server-side render)

# Rate limit check (internal — called before POST /quotes)
GET    /partner/{partner_id}/quote-limit
       → { allowed: true/false, count_this_hour: N, limit: 50 }`}</CodeBlock>
        </Card>
      )}

      {tab === 'frontend' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Frontend Requirements</div>
            {[
              { section: 'Quote Builder', items: ['Device search (catalogue) OR manual price entry', 'Company name field', 'Real-time output — renders as user types (debounced 500ms)', '4 term cards: 6 / 12 / 24 / 36 months', 'Pre-qual indicator badge', 'Share options: copy link, email (pre-filled mailto), PDF download', 'Mobile-responsive — used on tablets in in-store meetings'] },
              { section: 'Shareable Quote Page (public)', items: ['Quote card: device, monthly breakdown, tax note', '"Proceed to checkout" CTA — hands off to checkout pre-filled', 'Expiry notice if quote > 30 days old'] },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: MC.blue, marginBottom: 6, letterSpacing: '0.16px' }}>{s.section}</div>
                {s.items.map((item, j) => (
                  <div key={j} style={{ fontSize: 12, color: MC.inkMuted, marginBottom: 4, paddingLeft: 12, letterSpacing: '0.16px' }}>• {item}</div>
                ))}
              </div>
            ))}
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Backend Requirements</div>
            {[
              'Pricing engine — stateless calculation service',
              'Product catalogue store + search endpoint',
              'Quote persistence service',
              'PDF generation service (headless browser or server-side template)',
              'Rate limiting middleware — 50 quotes/hr per partner, sliding window',
              'Quote expiry job — daily cron: expire quotes > 30 days old',
              'Conversion tracking — PATCH /quote/{id}/convert',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 9, fontSize: 12, color: MC.inkMuted, letterSpacing: '0.16px' }}>
                <Settings size={12} strokeWidth={1.5} style={{ color: MC.blue, flexShrink: 0, marginTop: 1 }} /><span>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: MC.inkMuted, marginBottom: 8, letterSpacing: '0.16px' }}>Integrations</div>
              <Table
                headers={['Integration', 'Direction', 'Purpose']}
                rows={[
                  ['Partner auth', 'Read', 'Scope quotes to partner / rep'],
                  ['Checkout flow', 'Outbound handoff', 'Shareable link pre-fills checkout'],
                  ['PDF generation', 'Internal', 'Server-side PDF render'],
                  ['Email service', 'Outbound', '"Send via email" from quote tool'],
                ]}
              />
            </div>
          </Card>
        </div>
      )}

      {tab === 'estimate' && (
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 20, letterSpacing: '0.16px' }}>Engineering Estimate</div>
          <EstimateRow label="Pricing engine + data model" weeks={2} />
          <EstimateRow label="Pre-qual rules service" weeks={1} />
          <EstimateRow label="Quote API + persistence" weeks={1} />
          <EstimateRow label="Shareable URL + checkout handoff" weeks={1} />
          <EstimateRow label="Frontend (input + output)" weeks={2} />
          <EstimateRow label="PDF generation" weeks={1} />
          <EstimateRow label="Rate limiting + expiry job" weeks={1} />
          <div style={{ marginTop: 20, padding: '12px 16px', background: '#edf5ff', border: `1px solid ${MC.blue}` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: MC.blue, letterSpacing: '0.16px' }}>Total: ~8–9 weeks</div>
          </div>
          <div style={{ marginTop: 16, padding: '10px 12px', background: MC.surface1, border: `1px solid ${MC.hairline}` }}>
            <div style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>
              <strong style={{ color: MC.ink }}>v2 note:</strong> Pre-qual is rules-based in v1. v2 integrates an external KYB/credit API (Creditsafe, Dun & Bradstreet) for real company credit lookup. Not blocking v1 ship.
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── SECTION: ROADMAP ────────────────────────────────────────────────────────
function RoadmapSection() {
  const weeks = [
    { wk: '1', items: ['Define SPIFF tiers with Finance', 'Approve SPIFF scheme'], tags: ['Finance', 'No eng'] },
    { wk: '1–2', items: ['SPIFF + onboarding email templates designed, delivered to top 10 partners'], tags: ['Design', 'No eng'] },
    { wk: '2–3', items: ['Email campaign kit templates designed, delivered'], tags: ['Design', 'No eng'] },
    { wk: '1–3', items: ['Shared infra: partner auth, deal events, notification service'], tags: ['Engineering'] },
    { wk: '3–8', items: ['Feature 1: SPIFF engine + payout table + partner dashboard'], tags: ['Engineering'] },
    { wk: '4–10', items: ['Feature 2: Pipeline dashboard'], tags: ['Engineering'] },
    { wk: '6–9', items: ['Feature 3 Phase 2: AI campaign synthesis (parallel with Feature 2)'], tags: ['Engineering'] },
    { wk: '9–16', items: ['Feature 4: Live quote generator'], tags: ['Engineering'] },
    { wk: 'Day 45', items: ['First penetration read', 'Go / no-go on continued investment'], tags: ['Milestone'] },
  ]

  const tagColor = {
    'Finance': { color: '#c2410c', bg: '#f1c21b18' },
    'Design': { color: MC.blue, bg: '#edf5ff' },
    'No eng': { color: MC.success, bg: '#defbe6' },
    'Engineering': { color: MC.blue, bg: '#edf5ff' },
    'Milestone': { color: MC.error, bg: '#fff1f1' },
  }

  return (
    <div>
      <SectionHeader title="Shipping Sequence" sub="Ordered by dependency and feedback loop speed" />
      <Card>
        {weeks.map((row, i) => (
          <div key={i} style={{
            display: 'flex', gap: 16, paddingBottom: 16, marginBottom: 16,
            borderBottom: i < weeks.length - 1 ? `1px solid ${MC.hairline}` : 'none',
            alignItems: 'flex-start',
          }}>
            <div style={{
              minWidth: 70, padding: '4px 10px',
              background: row.wk.startsWith('Day') ? '#fff1f1' : MC.surface1,
              color: row.wk.startsWith('Day') ? MC.error : MC.inkMuted,
              fontSize: 12, fontWeight: 600, textAlign: 'center', letterSpacing: '0.16px',
            }}>{row.wk}</div>
            <div style={{ flex: 1 }}>
              {row.items.map((item, j) => (
                <div key={j} style={{ fontSize: 13, color: MC.inkMuted, marginBottom: 4, letterSpacing: '0.16px' }}>• {item}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {row.tags.map(t => (
                <span key={t} style={{
                  padding: '2px 8px', fontSize: 11, fontWeight: 600, letterSpacing: '0.16px',
                  color: tagColor[t]?.color || MC.inkMuted,
                  background: tagColor[t]?.bg || MC.surface1,
                }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

// ─── SECTION: RISKS ──────────────────────────────────────────────────────────
function RisksSection() {
  const risks = [
    { risk: 'SPIFF gaming', desc: 'Reps convert deals they would have closed anyway', l: 'Medium', i: 'Medium', mitigation: 'Baseline-relative incentives — bonus only on incremental deals above historical average' },
    { risk: 'SPIFF cost > incremental revenue', desc: 'Program costs more than the GMV it generates', l: 'Medium', i: 'High', mitigation: 'ROI threshold: topi must earn >2x SPIFF cost per deal. Sunset if ratio fails after 90 days' },
    { risk: 'Low dashboard adoption', desc: "Resellers don't log in to the new dashboard", l: 'Low', i: 'Medium', mitigation: 'Automated onboarding sequence drives first login. Week-7 check-in with top 10 partners' },
    { risk: 'GDPR violation — email kit Phase 2', desc: 'Customer data handling in AI campaign synthesis', l: 'Low', i: 'High', mitigation: 'Data isolation per partner. Explicit consent capture. DPA review before Phase 2 launch' },
    { risk: 'Quote tool pricing scraping', desc: 'Bad actor uses quote tool to reverse-engineer pricing', l: 'Low', i: 'Low', mitigation: 'Rate limiting (50 quotes/hour per partner). Partner auth required' },
    { risk: 'Day-45 shows no activation change', desc: "SPIFF program doesn't move the needle", l: 'Medium', i: 'High', mitigation: 'Kill switch: if <10% activation lift, pivot to investigating pre-qual friction as root cause' },
    { risk: 'Shared infra delays block all features', desc: 'Foundation build takes longer than expected', l: 'Medium', i: 'High', mitigation: 'Infra team works in parallel with Feature 1 design sprint. No feature depends on complete infra before week 3' },
  ]

  const lColor = { Low: MC.success, Medium: '#c2410c', High: MC.error }
  const iColor = { Low: MC.success, Medium: '#c2410c', High: MC.error }

  const deps = [
    'Finance approval on SPIFF tier structure and payout mechanics',
    'Legal review of SPIFF terms (commission disclosure requirements by market)',
    'Partner comms: SPIFF announcement to all integrated resellers (Sales & Partnerships team)',
    'GDPR review for email kit Phase 2 (DPO sign-off)',
    'Product / pricing rules defined before quote engine build (pricing team input)',
    'KYB/credit API vendor selection for pre-qual v2 (not blocking v1)',
  ]

  const outOfScope = [
    'Real-time push notifications for deal events',
    'Native mobile app (web-responsive only)',
    'PEAC partner network integration',
    'Multi-currency SPIFF (EUR only for now)',
    'Automated payout (manual Finance approval batch in v1)',
    'External credit bureau integration (pre-qual v1 is rules-based only)',
    'Rep-to-rep direct visibility (anonymised leaderboard only)',
  ]

  return (
    <div>
      <SectionHeader title="Risks, Dependencies & Scope" />

      <div style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Risk Register</h3>
        <Card style={{ padding: 0 }}>
          <Table
            headers={['Risk', 'Likelihood', 'Impact', 'Mitigation']}
            rows={risks.map(r => [
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, letterSpacing: '0.16px' }}>{r.risk}</div>
                <div style={{ fontSize: 11, color: MC.inkSubtle, marginTop: 2, letterSpacing: '0.16px' }}>{r.desc}</div>
              </div>,
              <Badge color={lColor[r.l] || MC.inkMuted}>{r.l}</Badge>,
              <Badge color={iColor[r.i] || MC.inkMuted}>{r.i}</Badge>,
              <span style={{ fontSize: 12, color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>{r.mitigation}</span>,
            ])}
          />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Dependencies</div>
          {deps.map((d, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 12, color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>
              <AlertTriangle size={13} strokeWidth={1.5} style={{ color: MC.warning, flexShrink: 0, marginTop: 1 }} /><span>{d}</span>
            </div>
          ))}
        </Card>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 600, color: MC.ink, marginBottom: 14, letterSpacing: '0.16px' }}>Out of Scope (v1)</div>
          {outOfScope.map((d, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 12, color: MC.inkMuted, lineHeight: 1.5, letterSpacing: '0.16px' }}>
              <span style={{ color: MC.inkSubtle }}>✗</span><span>{d}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function PRD() {
  const [section, setSection] = useState('overview')

  const SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'System Architecture' },
    { id: 'features', label: 'Features' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'risks', label: 'Risks & Scope' },
  ]

  return (
    <div style={{ padding: '32px 40px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 36, height: 36,
            background: MC.blue,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, color: '#fff',
          }}>P</div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: MC.ink, margin: 0, letterSpacing: '0.16px' }}>
              PRD: Seller Penetration Initiative
            </h1>
            <div style={{ fontSize: 12, color: MC.inkSubtle, marginTop: 2, letterSpacing: '0.16px' }}>
              topi GmbH · v2.0 · May 2026 · Greenfield build
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <Tabs tabs={SECTIONS} active={section} onChange={setSection} />

      {section === 'overview' && <OverviewSection />}
      {section === 'architecture' && <ArchitectureSection />}
      {section === 'features' && <FeatureSection />}
      {section === 'roadmap' && <RoadmapSection />}
      {section === 'risks' && <RisksSection />}
    </div>
  )
}
