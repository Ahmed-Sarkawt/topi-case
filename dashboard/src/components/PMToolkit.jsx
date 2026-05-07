import { useState } from 'react'
import { GLOSSARY, STAKEHOLDERS } from '../data'
import { Tip } from './Tip'

const TABS = [
  { id: 'glossary', label: 'Glossary' },
  { id: 'stakeholders', label: 'Stakeholders' },
  { id: 'prep', label: 'Interview Prep' },
]

const glossaryTips = {
  'HaaS': 'Hardware-as-a-Service. Instead of buying a laptop outright for €1,500, a company pays €50/month for 36 months. They get the laptop, topi keeps ownership. Like Netflix — you pay monthly and you never "own" the content.',
  'DaaS': 'Device-as-a-Service. Same idea as HaaS but the bundle also includes IT support, insurance, and device management.',
  'B2B2B': 'Business-to-Business-to-Business. topi sells to resellers, who then sell to companies. topi never talks directly to the end company. Three layers.',
  'ICE Score': 'A prioritization tool. Score each product idea from 1–10 on: Impact, Confidence, Ease. Multiply the three numbers. Highest score = build first.',
  'JTBD': 'Jobs-to-be-Done. A framework that asks: what "job" is the customer hiring this product to do?',
  'GMV': 'Gross Merchandise Value. The total value of all devices financed through topi in a year.',
  'NPS': 'Net Promoter Score. A simple customer satisfaction measure: "How likely are you to recommend us 1–10?"',
  'SPIFF': 'Sales Performance Incentive Fund. A cash bonus paid directly to salespeople when they sell a specific product.',
  'ACV': 'Annual Contract Value. The revenue topi gets from one customer per year.',
  'PEAC': 'topi\'s parent company since 2025. PEAC Finance Group is a €4.5 billion leasing company in 12 European countries, backed by BlackRock.',
  'SPV': 'Special Purpose Vehicle. A separate legal entity created just to hold the leases.',
  'AUM': 'Assets Under Management — the total value of devices topi currently owns and is leasing out.',
  'CapEx': 'Capital Expenditure. Money a company spends to buy long-lasting assets like laptops.',
  'OpEx': 'Operating Expenditure. Regular monthly/yearly business costs like rent, salaries, subscriptions.',
  'IFRS 16': 'An accounting rule that says companies must put long-term leases on their balance sheet.',
  'Penetration Rate': 'The percentage of a reseller\'s total B2B sales that go through topi.',
  'Buyout Rate': 'The percentage of customers who buy the device outright at the end of the contract.',
  'Churn': 'When a customer stops paying and cancels their subscription entirely.',
  'Pre-qualification': 'Quickly checking if a customer can afford the subscription before spending time on a full deal.',
  'Reseller': 'A company that sells technology products and bundles topi\'s financing into the sale.',
  'Tier 1 Competitor': 'A competitor that directly threatens topi\'s core business.',
  'North Star Metric': 'The single most important number that captures the health of the entire business.',
}

function GlossaryTab() {
  const [search, setSearch] = useState('')
  const filtered = GLOSSARY.filter(g =>
    g.term.toLowerCase().includes(search.toLowerCase()) ||
    g.def.toLowerCase().includes(search.toLowerCase()) ||
    (g.full && g.full.toLowerCase().includes(search.toLowerCase()))
  )
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>
          <Tip explain="Every abbreviation and buzzword you'll hear in the interview room." title="topi Glossary">
            topi Terminology
          </Tip>
        </h3>
        <p style={{ fontSize: 12, color: '#525252', marginBottom: 16, letterSpacing: '0.16px' }}>
          <Tip explain="22 terms spanning leasing finance, product management, SaaS metrics, and topi-specific jargon." title="Coverage">
            {GLOSSARY.length} terms — every word you'll hear in the room
          </Tip>
        </p>
        <input
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0',
            fontSize: 13, outline: 'none', marginBottom: 20, boxSizing: 'border-box',
            background: '#f4f4f4', color: '#161616', letterSpacing: '0.16px',
            borderRadius: 0,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {filtered.map((g, i) => (
            <div key={g.term} style={{
              display: 'grid', gridTemplateColumns: '120px 1fr',
              gap: 16, padding: '14px 16px',
              background: i % 2 === 0 ? '#f4f4f4' : '#ffffff',
              alignItems: 'start',
              border: '1px solid #e0e0e0',
            }}>
              <div>
                <Tip explain={glossaryTips[g.term] || g.def} title={g.full || g.term}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0f62fe', letterSpacing: '0.16px' }}>{g.term}</div>
                </Tip>
                {g.full && (
                  <Tip explain={`"${g.term}" stands for "${g.full}". ${glossaryTips[g.term] || ''}`} title="Full Name">
                    <div style={{ fontSize: 10, color: '#525252', marginTop: 2, letterSpacing: '0.16px' }}>{g.full}</div>
                  </Tip>
                )}
              </div>
              <Tip explain={glossaryTips[g.term] || g.def} title={g.term}>
                <div style={{ fontSize: 13, color: '#525252', lineHeight: 1.6, letterSpacing: '0.16px' }}>{g.def}</div>
              </Tip>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: '#8c8c8c', fontSize: 13, letterSpacing: '0.16px' }}>No terms match "{search}"</div>
          )}
        </div>
      </div>
    </div>
  )
}

const stakeholderRoleTips = {
  0: 'The Product Lead owns the product roadmap — they decide what gets built, in what order, and why.',
  1: 'VP of Partnerships owns the reseller relationships — the 100+ resellers who sell topi subscriptions.',
  2: 'The Head of Engineering decides what is technically feasible and how fast.',
  3: 'Finance/CFO cares about the economics: leasing margins, AUM growth, bad debt rates.',
}

const sectionExplains = {
  want: 'These are the outcomes and motivations that drive this stakeholder every day.',
  ask: 'These are questions YOU should ask them during the interview. Asking sharp questions shows strategic thinking.',
  answer: 'These are the questions they are likely to ask YOU. Prepare crisp, specific answers grounded in topi data.',
}

function StakeholdersTab() {
  const [activeStakeholder, setActiveStakeholder] = useState(0)
  const [activeSection, setActiveSection] = useState('want')
  const s = STAKEHOLDERS[activeStakeholder]

  const sectionTabs = [
    { id: 'want', label: 'What they want' },
    { id: 'ask', label: 'Questions to ask' },
    { id: 'answer', label: 'Questions for you' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
        {STAKEHOLDERS.map((st, i) => (
          <Tip key={i} explain={stakeholderRoleTips[i] || `${st.role} — a key decision-maker.`} title={st.role} block>
            <button
              onClick={() => { setActiveStakeholder(i); setActiveSection('want') }}
              style={{
                padding: '16px', border: 'none', cursor: 'pointer', textAlign: 'left',
                background: activeStakeholder === i ? '#0f62fe' : '#ffffff',
                color: activeStakeholder === i ? '#ffffff' : '#161616',
                border: activeStakeholder === i ? '1px solid #0f62fe' : '1px solid #e0e0e0',
                width: '100%',
                borderLeft: activeStakeholder === i ? '4px solid #78a9ff' : '4px solid transparent',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 6 }}>
                {['🧠', '🤝', '⚙️', '📊'][i]}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.16px' }}>{st.role.split('/')[0].trim()}</div>
              <div style={{ fontSize: 11, color: activeStakeholder === i ? '#a6c8ff' : '#525252', marginTop: 2, letterSpacing: '0.16px' }}>
                {st.role.includes('/') ? st.role.split('/').slice(1).join('/').trim() : ''}
              </div>
            </button>
          </Tip>
        ))}
      </div>

      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <div style={{ marginBottom: 16 }}>
          <Tip explain={stakeholderRoleTips[activeStakeholder] || s.role} title="Role">
            <div style={{ fontSize: 16, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{s.role}</div>
          </Tip>
          <Tip explain={`Background context: ${s.background}`} title="Their lens">
            <div style={{ fontSize: 13, color: '#525252', marginTop: 4, lineHeight: 1.6, letterSpacing: '0.16px' }}>{s.background}</div>
          </Tip>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', marginBottom: 20 }}>
          {sectionTabs.map(st => (
            <Tip key={st.id} explain={sectionExplains[st.id]} title={st.label}>
              <button
                onClick={() => setActiveSection(st.id)}
                style={{
                  padding: '8px 14px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: activeSection === st.id ? 600 : 400,
                  background: 'transparent',
                  color: activeSection === st.id ? '#0f62fe' : '#525252',
                  borderBottom: activeSection === st.id ? '2px solid #0f62fe' : '2px solid transparent',
                  letterSpacing: '0.16px',
                }}
              >{st.label}</button>
            </Tip>
          ))}
        </div>

        {activeSection === 'want' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {s.whatTheyWant.map((w, i) => (
              <Tip key={i} explain={`This stakeholder wants: "${w}".`} title="Their priority" block>
                <div style={{ display: 'flex', gap: 10, padding: '12px 14px', background: '#f4f4f4', border: '1px solid #e0e0e0', borderLeft: '3px solid #24a148' }}>
                  <span style={{ color: '#24a148', fontWeight: 700, flexShrink: 0, letterSpacing: '0.16px' }}>✓</span>
                  <span style={{ fontSize: 13, color: '#161616', lineHeight: 1.5, letterSpacing: '0.16px' }}>{w}</span>
                </div>
              </Tip>
            ))}
          </div>
        )}

        {activeSection === 'ask' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Tip explain="Asking sharp questions shows you think strategically." title="Why ask questions?">
              <div style={{ fontSize: 12, color: '#525252', marginBottom: 8, letterSpacing: '0.16px' }}>
                Questions YOU should ask this person — shows strategic thinking and curiosity.
              </div>
            </Tip>
            {s.questionsToAsk.map((q, i) => (
              <Tip key={i} explain={`Ask: "${q}".`} title={`Question ${i + 1}`} block>
                <div style={{ display: 'flex', gap: 10, padding: '12px 14px', background: '#edf5ff', border: '1px solid #0f62fe', borderLeft: '3px solid #0f62fe' }}>
                  <span style={{ color: '#0f62fe', fontWeight: 700, flexShrink: 0, letterSpacing: '0.16px' }}>Q{i + 1}</span>
                  <span style={{ fontSize: 13, color: '#161616', lineHeight: 1.5, letterSpacing: '0.16px' }}>{q}</span>
                </div>
              </Tip>
            ))}
          </div>
        )}

        {activeSection === 'answer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Tip explain="The key is to answer specifically with topi data — not generic PM frameworks.">
              <div style={{ fontSize: 12, color: '#525252', marginBottom: 8, letterSpacing: '0.16px' }}>
                Questions they are likely to ask YOU — prepare crisp, specific answers.
              </div>
            </Tip>
            {s.questionsTheyMightAsk.map((q, i) => (
              <Tip key={i} explain={`They may ask: "${q}".`} title="Prepare for this" block>
                <div style={{ display: 'flex', gap: 10, padding: '12px 14px', background: '#f4f4f4', border: '1px solid #e0e0e0', borderLeft: '3px solid #0f62fe' }}>
                  <span style={{ color: '#0f62fe', fontWeight: 700, flexShrink: 0, letterSpacing: '0.16px' }}>→</span>
                  <span style={{ fontSize: 13, color: '#161616', lineHeight: 1.5, letterSpacing: '0.16px' }}>{q}</span>
                </div>
              </Tip>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const keyNumberTips = {
  '1.5%': 'topi\'s current Seller Penetration Rate. The industry benchmark is 3%. Doubling this from 1.5% to 3% would double topi\'s entire revenue without adding a single new reseller partner.',
  '25%': 'Only 25% of customers upgrade their device at the end of the 36-month contract. Compare this to SaaS companies where 80-90% of customers renew/upgrade.',
  '50%': 'Half of all customers buy the device outright at contract end. High buyout means customers see topi as a loan product, not a subscription product.',
  '15%': 'Only 15% of deals larger than €50,000 close successfully. Benchmark for enterprise sales is 30-40%.',
  '39,400': 'The number of reseller partners Grenke Finance has. topi has about 100+. This 400:1 ratio shows how far behind topi is in reseller coverage.',
  '€50M': 'The debt facility topi had from Macquarie bank before the PEAC acquisition.',
  '143': 'topi\'s headcount as of May 2026 (LinkedIn data). Small for a fintech with €50M+ AUM.',
  '27.82%': 'The annual growth rate of the global HaaS market through 2031. A massive tailwind.',
  '€576': 'The ICE score for the "Seller SPIFF" initiative — the highest priority project.',
  '5': 'topi currently operates in 5 countries: Germany, Austria, Netherlands, Belgium, and UK.',
  '12': 'PEAC Finance Group operates in 12 European countries — the expansion runway.',
}

const frameworkTips = {
  'ICE Scoring': 'ICE stands for Impact, Confidence, Ease. Score each one 1–10 and multiply them together.',
  'JTBD (Jobs-to-be-Done)': 'People don\'t "buy" products — they "hire" them to do a job.',
  'B2B2B Product Thinking': 'topi has two types of customers: Resellers (primary users) and End Customers.',
  'North Star Metric': 'Every company needs ONE metric that, if it goes up, means the entire business is healthy.',
}

function PrepTab() {
  const frameworks = [
    {
      name: 'ICE Scoring',
      formula: 'Impact × Confidence × Ease (each 1–10)',
      when: 'Use to prioritize across initiatives. Top score: Seller SPIFF (576).',
      example: 'SPIFF: Impact=9, Confidence=8, Ease=8 → 576. Pre-qual Engine: I=6, C=6, E=6 → 216.',
    },
    {
      name: 'JTBD (Jobs-to-be-Done)',
      formula: 'What job is the customer hiring this product to do?',
      when: 'Use to diagnose the 50% buyout rate — customers hired topi for "defer payment".',
      example: '"SMBs are hiring topi to turn a €2,000 CapEx event into a predictable €56/month OpEx line — not to avoid owning hardware forever."',
    },
    {
      name: 'B2B2B Product Thinking',
      formula: 'Three layers: topi → Reseller (primary user) → End Customer (end user)',
      when: 'Every product decision needs to answer: does this help the reseller sell more?',
      example: 'Seller SPIFF: the reseller is the user. Deal calculator: the reseller uses it during the customer conversation.',
    },
    {
      name: 'North Star Metric',
      formula: 'Seller Penetration Rate = Topi GMV / Total Seller B2B GMV',
      when: 'Use when discussing what metric ties together all three challenges at once.',
      example: '1.5% → 3% penetration doubles Topi\'s GMV with zero new partners. Every challenge is a lever on this number.',
    },
  ]

  const keyNumbers = [
    { n: '1.5%', ctx: 'Current seller penetration (vs 3% benchmark)' },
    { n: '25%', ctx: 'End-of-contract upgrade rate (vs 80-90% SaaS)' },
    { n: '50%', ctx: 'Buyout rate — the most diagnostic signal' },
    { n: '25%', ctx: 'Hard churn — no exit interview data' },
    { n: '15%', ctx: 'Large deal close rate on >€50k (vs 30-40%)' },
    { n: '39,400', ctx: 'Grenke resellers — topi has ~100+' },
    { n: '€50M', ctx: 'Macquarie debt facility (pre-PEAC)' },
    { n: '143', ctx: 'topi employees (LinkedIn, May 2026)' },
    { n: '27.82%', ctx: 'HaaS global CAGR to 2031' },
    { n: '€576', ctx: 'Seller SPIFF ICE score — highest priority' },
    { n: '5', ctx: 'Markets active (DE, AT, NL, BE, UK)' },
    { n: '12', ctx: 'PEAC countries — next expansion runway' },
  ]

  const peacQA = [
    { q: '"What does PEAC mean for the product roadmap?"', a: 'Two things: balance sheet and geography. We\'re no longer milestone-gating feature development to SPV covenants. And PEAC\'s 12-country presence is the expansion path — we can pre-configure for new markets using existing PEAC legal/compliance infrastructure.' },
    { q: '"How does PEAC help with the large deal problem?"', a: 'The acquisition is the single most valuable asset in the large deal motion. A procurement team asking "is topi stable?" now hears "subsidiary of a €4.5B institution backed by BlackRock." That objection is closed with no product work.' },
    { q: '"What changed operationally post-acquisition?"', a: 'The SPV co-owned with Macquarie is dissolved — topi now draws from PEAC\'s own balance sheet. CEO Charlotte Pallua and the product organization remain in place. Co-founder Estelle Merle stepped down as MD in September 2025.' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip explain="These are the numbers you must be able to recall instantly in the interview." title="Why memorize these?">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>Key Numbers Cheatsheet</h3>
        </Tip>
        <p style={{ fontSize: 12, color: '#525252', marginBottom: 20, letterSpacing: '0.16px' }}>Every number you must know cold — internalize before the interview</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
          {keyNumbers.map(k => (
            <Tip key={k.n} explain={keyNumberTips[k.n] || k.ctx} title={k.n} block>
              <div style={{ padding: '14px', background: '#f4f4f4', border: '1px solid #e0e0e0', borderTop: '3px solid #0f62fe' }}>
                <div style={{ fontSize: 22, fontWeight: 300, color: '#0f62fe', letterSpacing: '-0.4px' }}>{k.n}</div>
                <div style={{ fontSize: 12, color: '#525252', marginTop: 4, lineHeight: 1.5, letterSpacing: '0.16px' }}>{k.ctx}</div>
              </div>
            </Tip>
          ))}
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip explain="PM frameworks are structured ways of thinking that help you make decisions, prioritize work, and communicate strategy clearly.">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>PM Frameworks to Use</h3>
        </Tip>
        <p style={{ fontSize: 12, color: '#525252', marginBottom: 20, letterSpacing: '0.16px' }}>How to speak fluently in PM craft during the interview</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {frameworks.map((f, i) => (
            <div key={f.name} style={{
              padding: '18px 20px',
              background: '#f4f4f4',
              border: '1px solid #e0e0e0',
              borderLeft: '3px solid #0f62fe',
            }}>
              <Tip explain={frameworkTips[f.name] || f.formula} title={f.name}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>{f.name}</div>
              </Tip>
              <div style={{ fontSize: 12, color: '#525252', marginBottom: 8, letterSpacing: '0.16px' }}>
                <strong>Formula:</strong> {f.formula}
              </div>
              <div style={{ fontSize: 12, color: '#525252', marginBottom: 8, letterSpacing: '0.16px' }}>
                <strong>When to use:</strong> {f.when}
              </div>
              <div style={{ fontSize: 12, color: '#161616', fontStyle: 'italic', padding: '8px 12px', background: '#ffffff', border: '1px solid #e0e0e0', letterSpacing: '0.16px' }}>
                <strong>Example:</strong> {f.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PEAC Q&A — inverse panel */}
      <div style={{ background: '#161616', padding: 24, borderLeft: '4px solid #0f62fe' }}>
        <Tip explain="PEAC acquired topi in 2025. This is the biggest strategic event in topi's history and WILL come up in the interview.">
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: '#f4f4f4', letterSpacing: '0.16px' }}>How to talk about the PEAC acquisition</h3>
        </Tip>
        <p style={{ fontSize: 12, color: '#6f6f6f', marginBottom: 16, letterSpacing: '0.16px' }}>This topic will come up — have a sharp answer ready</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {peacQA.map((item, i) => (
            <div key={i} style={{ overflow: 'hidden', border: '1px solid #393939' }}>
              <Tip explain="This is a question the interviewer might ask. Prepare a 2–3 sentence answer using specific numbers." title="Likely interview question" block>
                <div style={{ background: '#262626', padding: '10px 16px', fontSize: 12, fontWeight: 600, color: '#78a9ff', letterSpacing: '0.16px' }}>
                  Interviewer: {item.q}
                </div>
              </Tip>
              <Tip explain={`Strong answer: "${item.a}"`} title="How to answer" block>
                <div style={{ background: '#161616', padding: '12px 16px', fontSize: 13, color: '#c6c6c6', lineHeight: 1.65, letterSpacing: '0.16px' }}>
                  {item.a}
                </div>
              </Tip>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PMToolkit() {
  const [tab, setTab] = useState('glossary')
  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <Tip explain="This section is your personal interview preparation kit." title="PM Toolkit">
          <h1 style={{ fontSize: 32, fontWeight: 300, color: '#161616', margin: 0, letterSpacing: 0 }}>PM Toolkit</h1>
        </Tip>
        <p style={{ fontSize: 14, color: '#525252', marginTop: 6, letterSpacing: '0.16px' }}>Everything you need to walk into the interview as the most prepared person in the room</p>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', marginBottom: 28, flexWrap: 'wrap' }}>
        {TABS.map(t => {
          const tabExplains = {
            glossary: 'Every term and abbreviation used at topi.',
            stakeholders: 'The 4 people likely to interview you.',
            prep: 'The 12 numbers you must know cold, the 4 PM frameworks to deploy, and scripted answers for the PEAC question.',
          }
          return (
            <Tip key={t.id} explain={tabExplains[t.id]} title={t.label}>
              <button onClick={() => setTab(t.id)} style={{
                padding: '10px 18px',
                border: 'none',
                borderBottom: tab === t.id ? '2px solid #0f62fe' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: tab === t.id ? 600 : 400,
                background: tab === t.id ? '#f4f4f4' : 'transparent',
                color: tab === t.id ? '#0f62fe' : '#525252',
                letterSpacing: '0.16px',
              }}>
                {t.label}
              </button>
            </Tip>
          )
        })}
      </div>

      {tab === 'glossary' && <GlossaryTab />}
      {tab === 'stakeholders' && <StakeholdersTab />}
      {tab === 'prep' && <PrepTab />}
    </div>
  )
}
