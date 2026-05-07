import { CHALLENGES, COMPANY, MARKET_NUMBERS, PEAC_CONTEXT, COMPETITORS } from '../data'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Tip } from './Tip'

const challengeColors = { penetration: '#0f62fe', retention: '#da1e28', largedeals: '#525252' }

const topIce = [
  { name: 'Seller SPIFF', ice: 576, color: '#0f62fe', challenge: 'Penetration' },
  { name: 'Renewal Journey', ice: 504, color: '#da1e28', challenge: 'Retention' },
  { name: 'Enterprise Package', ice: 504, color: '#525252', challenge: 'Large Deals' },
  { name: 'Exit Interviews', ice: 448, color: '#da1e28', challenge: 'Retention' },
  { name: 'IFRS 16 Tool', ice: 432, color: '#525252', challenge: 'Large Deals' },
  { name: 'Lifecycle Comms', ice: 432, color: '#da1e28', challenge: 'Retention' },
]

function ChallengeCard({ c }) {
  const color = challengeColors[c.id]

  const metricTips = {
    penetration: { title: 'Seller Penetration: 1.5%', explain: 'Imagine topi is a payment option at a store checkout — like Klarna. Right now, only 1.5 out of every 100 B2B sales that go through a topi-integrated reseller actually use topi financing. The shop has the button, but almost nobody clicks it. The industry average is 3% — so topi is half as effective as a typical player at getting their own checkout button used.' },
    retention: { title: 'Upgrade Rate: 25%', explain: 'When a 3-year contract ends, topi loses 75% of customers. Only 25 out of 100 customers sign up for a new, upgraded device. Think of it like a gym membership — only 1 in 4 people renew at the end. The rest either buy the device outright (50%) or just leave (25%). Great subscription businesses like Netflix keep 80–90% of customers. topi is far behind.' },
    largedeals: { title: 'Large Deal Win Rate: 15%', explain: 'When topi competes for big contracts worth more than €50,000, they only win 15 out of every 100 deals. Imagine going to 100 job interviews and only getting 15 offers. And price isn\'t the problem — they lose even when they match the price. The issue is trust: big companies are scared to put €50,000+ through a 4-year-old startup.' },
  }

  const benchmarkTips = {
    penetration: { title: 'Industry Benchmark: 3%', explain: 'This is what a typical embedded financing provider achieves. Klarna, Mondu, and other BNPL players consistently get 3% or higher of a merchant\'s transactions to go through their financing. topi is at 1.5% — exactly half the benchmark. Doubling to 3% would double topi\'s revenue without signing a single new reseller partner.' },
    retention: { title: 'SaaS Benchmark: 80–90%', explain: 'Great subscription businesses — think Salesforce, Spotify, or your phone contract — keep 80–90% of customers when their plan ends. This is the "renewal rate" benchmark. topi\'s 25% upgrade rate means it\'s losing 75% of customers at the end of every 3-year contract. That\'s a major leak in the business.' },
    largedeals: { title: 'Expected Win Rate: 30–40%', explain: 'In enterprise B2B sales, if you\'ve made it to a competitive evaluation for a deal, winning 30–40% of them is normal and healthy. topi wins only 15% — which means they\'re losing deals they should be able to win. The gap isn\'t price. It\'s credibility and paperwork.' },
  }

  const initiativeTips = {
    'Seller SPIFF Program': 'SPIFF stands for Sales Performance Incentive Fund — it\'s basically a cash bonus for sales reps. If a reseller\'s salesperson gets €50 extra every time they offer topi financing and the customer says yes, they\'ll start mentioning it on every call. Klarna used exactly this approach to go from near-zero to 500,000 merchant partners. This is the #1 recommendation because it costs little (no engineering) and can start working in weeks.',
    'Proactive Renewal Journey (T-90/60/30)': 'T-90/60/30 means "contact the customer 90 days before, 60 days before, and 30 days before their contract ends." Right now topi only notifies customers 4 weeks out — which is too late. By the time someone knows their contract is ending, they\'ve already mentally decided to buy the device or leave. Starting the conversation 3 months earlier gives time to show them the value of upgrading to a newer device.',
    'Enterprise Deal Package': 'This is a folder of documents that makes procurement teams at large companies feel safe. Things like: a GDPR data processing agreement (legal compliance document), an IFRS 16 analysis (accounting document showing how the lease affects their books), an ISO certification, and reference customers. Big companies won\'t sign a €50k+ deal without these. topi doesn\'t have them. Building this package is mostly writing — no engineering needed.',
  }

  return (
    <div style={{
      background: '#ffffff',
      padding: '24px',
      border: '1px solid #e0e0e0',
      borderLeft: `4px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 22 }}>{c.icon}</span>
        <div>
          <Tip title={c.title} explain={c.id === 'penetration' ? 'Seller Penetration measures how often resellers actually offer topi financing to their customers. topi\'s checkout button is integrated at these resellers, but resellers rarely bring it up. It\'s like a store having Apple Pay enabled but the cashier never mentioning it.' : c.id === 'retention' ? 'This tracks what happens when a customer\'s 3-year hardware subscription ends. Do they upgrade to a new device through topi? Buy their old one outright? Or just leave? Right now, 75% of customers are lost at this moment — the biggest leak in topi\'s business.' : 'This measures topi\'s success rate when competing for deals worth more than €50,000. These are large companies buying 50+ devices at once. topi wins very rarely — not because of price, but because big companies don\'t fully trust a young fintech startup with their hardware budget.'}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{c.title}</div>
          </Tip>
          <Tip explain={c.gap === '2× below industry avg' ? 'This means topi\'s penetration rate (1.5%) is exactly half the industry average (3%). If topi doubled its penetration rate — without adding a single new reseller — revenue would double. That\'s the scale of the opportunity.' : c.gap === '75% lost at contract end' ? 'Three out of four customers don\'t renew their hardware subscription when it ends. They either buy their old device outright (50%) or just walk away (25%). Only 1 in 4 upgrades to a new device on a new subscription.' : 'topi wins only 15% of deals over €50,000. That means in 85 out of 100 competitive situations, the customer chooses someone else — often a more established company or a traditional bank leasing provider.'}>
            <div style={{ fontSize: 11, color: '#525252', marginTop: 2, letterSpacing: '0.16px' }}>{c.gap}</div>
          </Tip>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
        <Tip {...metricTips[c.id]} block>
          <div style={{ flex: 1, background: '#f4f4f4', border: '1px solid #e0e0e0', padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 300, color, letterSpacing: '-0.5px' }}>{c.metric}</div>
            <div style={{ fontSize: 10, color: '#525252', marginTop: 2, letterSpacing: '0.32px', textTransform: 'uppercase' }}>Topi Current</div>
          </div>
        </Tip>
        <Tip {...benchmarkTips[c.id]} block>
          <div style={{ flex: 1, background: '#f4f4f4', border: '1px solid #e0e0e0', padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 300, color: '#24a148', letterSpacing: '-0.5px' }}>{c.benchmark}</div>
            <div style={{ fontSize: 10, color: '#525252', marginTop: 2, letterSpacing: '0.32px', textTransform: 'uppercase' }}>Industry Benchmark</div>
          </div>
        </Tip>
      </div>

      <Tip explain={c.summary} block>
        <p style={{ fontSize: 13, color: '#525252', lineHeight: 1.6, margin: 0, letterSpacing: '0.16px' }}>{c.summary}</p>
      </Tip>

      <div style={{ marginTop: 14, borderTop: '1px solid #e0e0e0', paddingTop: 12 }}>
        <Tip explain="Q1 means the first quarter of the year (January–March). This is the initiative that scored highest on the ICE framework — meaning it has the most impact, is most confident to work, and is easiest to execute. It should be done first.">
          <div style={{ fontSize: 10, fontWeight: 600, color: '#525252', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.32px' }}>TOP Q1 INITIATIVE</div>
        </Tip>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Tip explain={initiativeTips[c.initiatives[0].name] || 'This is the highest-priority action topi can take to address this challenge, based on its ICE score.'}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{c.initiatives[0].name}</span>
          </Tip>
          <Tip title="ICE Score" explain="ICE = Impact × Confidence × Ease. Each dimension is scored 1–10, then multiplied together. A score of 576 means: Impact 9 (huge effect on revenue) × Confidence 8 (we're quite sure it will work) × Ease 8 (not hard to do). Maximum possible score is 1,000. The higher the ICE, the more this initiative should be prioritized over others.">
            <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', background: color + '14', color, letterSpacing: '0.16px' }}>
              ICE {c.initiatives[0].ice}
            </span>
          </Tip>
        </div>
      </div>
    </div>
  )
}

export default function Overview() {
  return (
    <div style={{ padding: '40px 40px 60px', maxWidth: 1100, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Tip explain="A case study is a take-home assignment that a company gives to job candidates. Instead of just asking interview questions, topi gave Ahmed a real business problem to analyze and write up — like a mini consulting project. This dashboard was built to research and prepare for that assignment.">
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.32px', color: '#0f62fe', textTransform: 'uppercase', marginBottom: 8 }}>
            Case Study · Senior PM Interview · topi GmbH
          </div>
        </Tip>
        <Tip title="The core thesis" explain="topi has three real, measurable gaps in its business right now. This document lays out what those gaps are, why they exist (the root causes), and exactly what to do about them — in priority order. The goal is to walk into the interview knowing more about topi's business than most people who work there.">
          <h1 style={{ fontSize: 42, fontWeight: 300, color: '#161616', margin: 0, lineHeight: 1.2, letterSpacing: 0 }}>
            Where topi grows next
          </h1>
        </Tip>
        <p style={{ fontSize: 15, color: '#525252', marginTop: 10, maxWidth: 620, lineHeight: 1.6, letterSpacing: '0.16px' }}>
          <Tip explain="These are the three specific challenges topi mentioned in its case study brief — seller penetration at 1.5%, end-of-contract upgrade at 25%, and large deal win rate at 15%. All three have been measured against industry benchmarks and diagnosed for root causes.">
            Three measurable challenges,
          </Tip>{' '}
          <Tip explain="ICE scoring is a PM prioritization tool. Every potential initiative was scored on Impact (how much it moves the metric), Confidence (how sure we are it will work), and Ease (how easy it is to execute). The scores are multiplied. This gives a ranked list of what to do first.">
            ICE-scored initiatives,
          </Tip>{' '}
          and the strategic context that makes 2026 the right window to act — backed by PEAC's acquisition.
        </p>
      </div>

      {/* Company snapshot */}
      <div style={{
        background: '#161616',
        padding: '24px 28px', marginBottom: 32, color: '#f4f4f4',
        display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center',
        borderLeft: '4px solid #0f62fe',
      }}>
        <div style={{ flex: '1 1 280px' }}>
          <div style={{ fontSize: 10, color: '#6f6f6f', fontWeight: 600, letterSpacing: '0.32px', textTransform: 'uppercase' }}>Company</div>
          <Tip title="topi GmbH" explain="topi is a German fintech startup founded in 2021. GmbH is the German equivalent of 'Ltd' or 'LLC' — it just means it's a private limited company. topi's business is providing the software and financial plumbing that lets IT resellers offer hardware subscriptions to their business customers.">
            <div style={{ fontSize: 18, fontWeight: 400, marginTop: 4, color: '#f4f4f4', letterSpacing: '0.16px' }}>{COMPANY.name}</div>
          </Tip>
          <Tip title="B2B2B model" explain="B2B2B means Business-to-Business-to-Business. topi doesn't sell to end customers directly. Instead: topi builds the platform → resellers (IT shops) use it → business customers subscribe through the reseller. Think of topi like Stripe — Stripe doesn't sell to shoppers, it powers merchant checkouts. topi doesn't sell to companies, it powers reseller checkouts. The API is the product.">
            <div style={{ fontSize: 13, color: '#8c8c8c', marginTop: 2, letterSpacing: '0.16px' }}>{COMPANY.model}</div>
          </Tip>
          <div style={{ fontSize: 12, color: '#6f6f6f', marginTop: 4, letterSpacing: '0.16px' }}>{COMPANY.hq} · Founded {COMPANY.founded}</div>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: 10, color: '#6f6f6f', fontWeight: 600, letterSpacing: '0.32px', textTransform: 'uppercase' }}>Status</div>
          <Tip title="PEAC acquisition" explain="In August 2025, topi was bought by PEAC Solutions — a large equipment finance company backed by BlackRock (one of the world's biggest investment firms). This is like a tiny app startup being acquired by a major bank. topi gets access to a huge balance sheet, 12 countries, and institutional credibility. In return, PEAC gets topi's digital technology to modernize its old-school leasing business.">
            <div style={{ fontSize: 13, color: '#78a9ff', marginTop: 4, fontWeight: 600, letterSpacing: '0.16px' }}>PEAC Solutions subsidiary</div>
          </Tip>
          <Tip title="PEAC's scale" explain="AUM means Assets Under Management — the total value of all the equipment that PEAC has financed and still owns or manages. €4.5 billion is an enormous number. For context: if topi originates a €100,000 hardware subscription, PEAC can fund it easily from this pool. The Macquarie SPV that previously funded topi's devices (limited to ~€50M) is now replaced by PEAC's much larger balance sheet.">
            <div style={{ fontSize: 12, color: '#6f6f6f', marginTop: 2, letterSpacing: '0.16px' }}>{PEAC_CONTEXT.aum} AUM · HPS/BlackRock</div>
          </Tip>
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: 10, color: '#6f6f6f', fontWeight: 600, letterSpacing: '0.32px', textTransform: 'uppercase' }}>Markets</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
            {COMPANY.markets.map(m => (
              <Tip key={m} explain={m === 'UK (Feb 2026)' ? 'The UK was launched in February 2026 — just 4 months after the PEAC acquisition closed. This speed is remarkable for a fintech that had to set up new banking relationships, legal entities, and reseller contracts in a new country. It proves the topi platform is modular and fast to deploy.' : `topi is active in ${m} — meaning resellers in this country can integrate topi's API and offer hardware subscriptions to their business customers. The resellers handle the customer relationship; topi handles the financing and device lifecycle.`}>
                <span style={{ fontSize: 11, padding: '3px 8px', background: '#262626', border: '1px solid #393939', color: '#8c8c8c', letterSpacing: '0.16px' }}>{m}</span>
              </Tip>
            ))}
          </div>
        </div>
      </div>

      {/* Three challenges */}
      <div style={{ marginBottom: 36 }}>
        <Tip title="The Three Challenges" explain="These three challenges came directly from topi's case study brief — they are real, internal metrics that topi shared with interview candidates. Each one represents a gap between where topi is today and where a healthy business in this space should be. A Senior PM candidate is expected to pick ONE of these to focus on and write a detailed plan.">
          <h2 style={{ fontSize: 20, fontWeight: 400, color: '#161616', marginBottom: 4, letterSpacing: 0 }}>The Three Challenges</h2>
        </Tip>
        <p style={{ fontSize: 13, color: '#525252', marginBottom: 20, letterSpacing: '0.16px' }}>From the case study brief — internal metrics vs. benchmarks</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {CHALLENGES.map(c => <ChallengeCard key={c.id} c={c} />)}
        </div>
      </div>

      {/* ICE Chart + Market Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>

        <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #e0e0e0' }}>
          <Tip title="ICE Score chart" explain="This bar chart ranks all initiatives across the three challenges by their ICE score. Longer bar = higher priority. The blue bars are Penetration initiatives, red are Retention, gray are Large Deals. The Seller SPIFF Program (ICE 576) is the clear winner — it can start immediately, costs little, and has a documented track record from Klarna and Mondu.">
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>Top Initiatives by ICE Score</h3>
          </Tip>
          <p style={{ fontSize: 12, color: '#525252', marginBottom: 16, letterSpacing: '0.16px' }}>
            <Tip explain="Impact × Confidence × Ease — each scored 1–10 and multiplied together. Max possible = 1,000. This framework forces you to think about three things separately: Will it matter if it works? Will it actually work? Can we actually do it? A high-impact idea that's impossible to execute scores low. A small idea that's easy and certain scores medium. The sweet spot is impact + confidence + doability.">
              Impact × Confidence × Ease — Q1 2026 focus
            </Tip>
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topIce} layout="vertical" margin={{ left: 0, right: 20 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#8c8c8c', fontFamily: 'IBM Plex Sans' }} domain={[0, 650]} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#525252', fontFamily: 'IBM Plex Sans' }} width={110} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0, border: '1px solid #e0e0e0' }} formatter={(v, n, p) => [`ICE ${v}`, p.payload.challenge]} />
              <Bar dataKey="ice" radius={0}>
                {topIce.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
            {[['#0f62fe', 'Penetration'], ['#da1e28', 'Retention'], ['#525252', 'Large Deals']].map(([c, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#525252', letterSpacing: '0.16px' }}>
                <span style={{ width: 10, height: 10, background: c, display: 'inline-block' }} />
                {l}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #e0e0e0' }}>
          <Tip title="Market context" explain="These numbers show the size and growth of the market topi is operating in. They matter for the case study because they explain WHY this is the right time to invest in growth. A growing market means the opportunity gets bigger over time, not smaller. topi doesn't need to steal customers from competitors — it just needs to capture a slice of the new demand being created every year.">
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>Market Opportunity</h3>
          </Tip>
          <p style={{ fontSize: 12, color: '#525252', marginBottom: 16, letterSpacing: '0.16px' }}>The window topi is operating in</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MARKET_NUMBERS.slice(0, 5).map(m => (
              <Tip key={m.label} title={m.label} explain={
                m.label === 'Global HaaS (2025)' ? 'HaaS = Hardware-as-a-Service. The total global market for renting hardware instead of buying it is $120 billion today and growing at nearly 28% per year. By 2031 it will be over $500 billion. topi operates in a tiny slice of this, which means there\'s enormous headroom to grow.' :
                m.label === 'Germany IT Leasing' ? 'This is topi\'s home market. German companies spent $29.2 billion leasing IT equipment in the most recent year, growing at 15.7% annually. Germany is one of the largest and fastest-growing IT leasing markets in Europe — which is why Berlin was the right place to start.' :
                m.label === 'European IT Spend (2026)' ? 'Gartner (the world\'s leading IT research firm) forecasts European IT spending at $1.4 trillion in 2026, growing 11% year-over-year. This is the total addressable budget pool that topi\'s reseller partners are selling into. Even a tiny slice of this is a very large number for topi.' :
                m.label === 'CFO Approval Threshold' ? '79% of B2B hardware purchases now require approval from the CFO (Chief Financial Officer). This used to only apply to purchases above ~$500K. Now it applies to purchases above ~$50K. This is exactly why topi\'s large deal close rate is so low — the reseller\'s sales rep convinces the IT manager, but then the CFO kills the deal because they don\'t know topi.' :
                m.label === 'AI PC Devices Needing Refresh' ? '1.7 billion computers need to be replaced because they can\'t run new AI software (they lack the special AI processing chip called an NPU). Windows 10 also reached end of life in October 2025 — no more security updates. This creates the biggest wave of IT hardware purchases in a decade, and every single one is a potential topi subscription.'
                : m.sub
              } block>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#f4f4f4', border: '1px solid #e0e0e0' }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: '#8c8c8c', marginTop: 1, letterSpacing: '0.16px' }}>{m.sub}</div>
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 300, color: '#0f62fe', whiteSpace: 'nowrap', letterSpacing: '-0.4px' }}>{m.value}</div>
                </div>
              </Tip>
            ))}
          </div>
        </div>
      </div>

      {/* PEAC unlock */}
      <div style={{ background: '#0f62fe', padding: '24px 28px', marginBottom: 32, borderLeft: '4px solid #78a9ff' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 24, flexShrink: 0 }}>🔓</div>
          <div>
            <Tip title="Why PEAC changes everything" explain="Before PEAC, if a large company asked 'Is topi financially stable enough to trust with a multi-year contract?' — the honest answer was 'we're a 4-year-old startup backed by VCs.' That's a dealbreaker for enterprise procurement. After PEAC, the answer is 'we're a subsidiary of a €4.5B asset finance institution backed by BlackRock.' That's a completely different conversation. No new product needed — just a different sentence in the sales pitch.">
              <div style={{ fontSize: 15, fontWeight: 600, color: '#ffffff', marginBottom: 6, letterSpacing: '0.16px' }}>The PEAC Acquisition Changes Everything</div>
            </Tip>
            <p style={{ fontSize: 13, color: '#a6c8ff', margin: 0, lineHeight: 1.6, letterSpacing: '0.16px' }}>
              A 4-year-old fintech startup is now a subsidiary of a €4.5B asset finance institution backed by BlackRock.
              The "Is topi stable?" objection that kills large enterprise deals is answered — with no product changes required.
              PEAC's 12-country footprint is the international expansion runway. This is the single largest strategic unlock available.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {PEAC_CONTEXT.whatChangedForTopi.map((w, i) => (
                <Tip key={i} explain={
                  i === 0 ? 'Before PEAC, topi\'s device portfolio was funded through a Special Purpose Vehicle (SPV) — a separate legal entity co-owned with Macquarie Bank. Every time topi wanted to fund more devices, they had to hit performance milestones to unlock the next tranche of the €50M facility. PEAC replaces this constraint with access to its entire €4.5B balance sheet — no milestones, no tranches, just scale.' :
                  i === 1 ? 'PEAC already operates in 12 countries: UK, Germany, France, Poland, Hungary, Italy, Czech Republic, Austria, Sweden, Spain, plus USA. topi previously operated in 5 markets (DE, AT, NL, BE, UK). Going from 5 to 12 countries is possible without building from scratch — PEAC already has the legal entities, banking relationships, and reseller networks in place.' :
                  i === 2 ? 'When a procurement team at a large German company asks "who backs topi?" — the answer changed from "Index Ventures and Creandum" (VC firms most people haven\'t heard of) to "HPS Investment Partners, which manages money for BlackRock" (the world\'s largest asset manager). That one sentence changes the risk perception completely.' :
                  'PEAC can approve larger individual deals than topi could under the Macquarie SPV structure. A single €200,000 deal that previously would have exceeded topi\'s credit concentration limits is now well within PEAC\'s risk appetite. This directly addresses the large deal challenge.'
                }>
                  <span style={{ fontSize: 11, padding: '4px 10px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff', fontWeight: 500, letterSpacing: '0.16px' }}>
                    {['Balance sheet', 'Geographic runway', 'Enterprise credibility', 'Risk appetite'][i]}
                  </span>
                </Tip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Competitive risk */}
      <div style={{ background: '#ffffff', padding: '24px', border: '1px solid #e0e0e0' }}>
        <Tip title="Why competitors matter" explain="Understanding the competitive landscape is essential for a PM case study. Your recommendations need to be aware of what competitors are already doing, so you're not recommending something that a rival has already won. The threat levels tell you which competitors to worry about most and why.">
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#161616', marginBottom: 16, letterSpacing: '0.16px' }}>Competitive Risk Register</h3>
        </Tip>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
          {COMPETITORS.slice(0, 4).map(c => (
            <div key={c.name} style={{
              padding: '14px',
              border: `1px solid ${c.threat === 'CRITICAL' ? '#da1e28' : c.threat === 'HIGH' ? '#f1c21b' : '#e0e0e0'}`,
              borderLeft: `3px solid ${c.threat === 'CRITICAL' ? '#da1e28' : c.threat === 'HIGH' ? '#f1c21b' : '#0f62fe'}`,
              background: '#f4f4f4',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Tip title={c.name} explain={c.notes}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{c.name}</div>
                </Tip>
                <Tip
                  title={`Threat: ${c.threat}`}
                  explain={
                    c.threat === 'CRITICAL' ? 'CRITICAL means this competitor could potentially make topi irrelevant overnight without even trying. Grenke has 39,400 reseller partners — topi has roughly 100+. If Grenke adds a subscription/DaaS feature to their existing leasing portal, every one of their resellers gets it automatically. topi\'s entire distribution advantage disappears.' :
                    c.threat === 'HIGH' ? 'HIGH means this competitor is actively growing in a direction that will overlap with topi\'s market within 1–2 years. They\'re not there yet, but they\'re heading there fast and they have the funding to get there.' :
                    'MEDIUM means this competitor is in a similar space but addresses it differently enough that direct competition is limited today. They\'re worth watching but not the top priority.'
                  }
                >
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '2px 6px',
                    background: c.threat === 'CRITICAL' ? '#da1e28' : c.threat === 'HIGH' ? '#f1c21b' : '#0f62fe',
                    color: c.threat === 'HIGH' ? '#161616' : '#ffffff',
                    letterSpacing: '0.32px',
                  }}>{c.threat}</span>
                </Tip>
              </div>
              <Tip explain={`Tier ${c.tier} = ${c.tierLabel}. This describes how directly they compete with topi's core model.`}>
                <div style={{ fontSize: 11, color: '#525252', marginTop: 4, letterSpacing: '0.16px' }}>{c.tierLabel}</div>
              </Tip>
              <Tip explain={`${c.name} has raised ${c.funding} in total funding and operates at scale: ${c.scale}.`}>
                <div style={{ fontSize: 11, color: '#161616', marginTop: 6, letterSpacing: '0.16px' }}>{c.funding} raised · {c.scale.substring(0, 30)}</div>
              </Tip>
            </div>
          ))}
        </div>
        <Tip title="The Grenke Problem" explain="Grenke is a 40-year-old MDAX-listed company (Germany's mid-cap stock index). They have 39,400 resellers in 31 countries and did €3 billion in new leasing business in 2025. topi's entire competitive advantage is its modern API-first subscription model. But if Grenke's engineering team spends 6 months building a subscription layer on top of their existing leasing product, they don't need to acquire any resellers — they already have 39,400 of them. This is the existential risk: a sleeping giant who could wake up and have 1,000× topi's distribution at launch." block>
          <div style={{ marginTop: 16, padding: '12px 16px', background: '#fff1f1', border: '1px solid #da1e28', borderLeft: '3px solid #da1e28', fontSize: 12, color: '#da1e28', letterSpacing: '0.16px' }}>
            <strong>Sleeping giant:</strong> Grenke AG has 39,400 resellers and €3B+ new business annually. If they add subscription logic to their leasing product, they have 1,000× topi's distribution overnight.
          </div>
        </Tip>
      </div>
    </div>
  )
}
