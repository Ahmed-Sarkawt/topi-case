import { useState } from 'react'
import {
  CHALLENGES, COMPANY, FUNDING, PARTNERS, PRICING,
  COMPETITORS, MARKET_NUMBERS, TRENDS, PRODUCT_ARCHITECTURE, PAIN_POINTS
} from '../data'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Tip } from './Tip'

const TABS = [
  { id: 'product', label: 'Product & Customer' },
  { id: 'company', label: 'Company & Business' },
  { id: 'competitors', label: 'Competitors' },
  { id: 'trends', label: 'Market Trends' },
  { id: 'opportunities', label: 'Opportunities' },
]

function Tab({ active, onClick, label }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 18px',
      border: 'none',
      borderBottom: active ? '2px solid #0f62fe' : '2px solid transparent',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: active ? 600 : 400,
      background: active ? '#f4f4f4' : 'transparent',
      color: active ? '#0f62fe' : '#525252',
      letterSpacing: '0.16px',
      transition: 'color 0.1s',
    }}>
      {label}
    </button>
  )
}

const layerTips = {
  'Checkout & Credit Engine': 'This is topi\'s most valuable and defensible piece of technology. When a business customer reaches the checkout on a reseller\'s website, topi\'s engine: (1) pulls their bank account data via open banking, (2) checks payment history with payment processors, (3) runs fraud detection, and (4) makes a credit decision — all within seconds. Traditional bank leasing takes days. topi takes minutes. This is what makes the B2B2B model work.',
  'Omnichannel Sales Support': 'Omnichannel means the same product works in all sales channels. A reseller can offer topi financing whether the customer is: buying online (API at e-commerce checkout), speaking to a sales rep (telesales generates a payment link), or visiting a physical store (POS integration). One integration for the reseller covers all their sales channels.',
  'topi Portal': 'This is the dashboard that business customers see after they subscribe. Think of it like your bank\'s online portal — you can see your devices, invoices, payment schedule, and make decisions about upgrading or returning devices. The key gap: the current upgrade notification only goes out 4 weeks before the contract ends, which is too late for the customer to make an informed decision.',
  'Device Lifecycle Ops': 'After a contract ends, topi needs to get the device back, wipe all data (using NIST-certified methods — the same standard the US government uses), refurbish it, and sell it as a used device. This "circular" approach recovers residual value from returned devices. Every device that gets refurbished and resold earns topi additional revenue beyond the subscription income.',
  'topi Care / Care+': 'This is topi\'s insurance product — like extended warranty but better. If you accidentally drop your laptop or spill coffee on it, topi Care covers the replacement up to 2 times per year. The critical UX issue: you MUST select it at checkout. You can\'t add it later. And you can\'t cancel it mid-contract. This is a significant customer pain point.',
  'Partner Integrations': 'topi has built specific integrations with key platforms in the German IT distribution ecosystem. ITscope is a catalog platform used by thousands of IT resellers. SYNAXON is a purchasing network with 3,200 member resellers. Michael AG is an IT distributor with ERP integration. These integrations mean topi appears inside the tools resellers already use — they don\'t have to switch to a new system.',
}

const partnerTypeTips = {
  'Retailer': 'A retailer sells hardware directly to end consumers and businesses from physical or online stores. These are the most visible partners — brands like Cyberport, MediaMarkt, and Conrad. When you see topi at a retailer checkout, that\'s this integration.',
  'IT Reseller': 'An IT reseller buys hardware in bulk from manufacturers and resells it to businesses, usually with added services like setup, support, and networking. Bechtle is Germany\'s largest IT reseller. These partners are especially valuable because their customers are businesses with larger hardware budgets.',
  'Network': 'A purchasing network is a group of smaller resellers who pool their buying power. SYNAXON has 3,200 member IT resellers. By integrating with SYNAXON once, topi gains access to all 3,200 members — massively efficient distribution.',
  'Distributor': 'A distributor sits between manufacturers and resellers. They buy in huge quantities from brands like Lenovo and Apple, then sell to thousands of resellers. Integrating with a distributor like Michael AG means topi\'s financing option appears in the distributor\'s ERP system, which resellers use to generate quotes.',
  'Platform': 'A platform (like ITscope) is a marketplace or software tool that resellers use to browse and compare hardware products, generate quotes, and place orders. Appearing as a financing option inside these platforms is powerful because it reaches resellers who aren\'t direct topi partners.',
  'OEM': 'OEM = Original Equipment Manufacturer — companies like Lenovo, Apple, and Samsung that make the actual hardware. Lenovo\'s LGFS (Lenovo Global Financial Services) partnership means topi is Lenovo\'s approved financing partner in Germany and the UK. Lenovo can point resellers to topi, and topi can unlock Lenovo rebates for resellers — a powerful incentive.',
  'Retailer (DEFUNCT)': 'Gravis was topi\'s very first partner when it launched in 2022. Gravis operated 43 Apple Authorized Reseller stores in Germany. But in March 2024, Gravis filed for insolvency (bankruptcy) and closed all stores. This was a significant early setback — topi lost its most visible partner. All 43 stores closed within months.',
}

function ProductTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip title="Product Architecture" explain="Think of topi's product as a stack of layers, like a building. The foundation (credit engine) is what makes everything possible — without fast credit decisions, none of the other layers work. Each layer adds a capability that the reseller or customer benefits from. Understanding all 6 layers helps you understand what PM work lives in each area and what's missing.">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>Product Architecture</h3>
        </Tip>
        <p style={{ fontSize: 12, color: '#525252', marginBottom: 20, letterSpacing: '0.16px' }}>6-layer platform stack — from credit to circular remarketing</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {PRODUCT_ARCHITECTURE.map((p, i) => (
            <Tip key={p.layer} title={p.layer} explain={layerTips[p.layer] || p.what} block>
              <div style={{
                display: 'flex', gap: 16, padding: '14px 16px',
                background: i % 2 === 0 ? '#f4f4f4' : '#ffffff',
                borderLeft: '3px solid #e0e0e0',
              }}>
                <div style={{
                  width: 28, height: 28,
                  background: '#0f62fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600, color: '#ffffff', flexShrink: 0,
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{p.layer}</div>
                  <div style={{ fontSize: 12, color: '#525252', marginTop: 3, letterSpacing: '0.16px' }}>{p.what}</div>
                  <div style={{ fontSize: 11, color: '#0f62fe', marginTop: 4, letterSpacing: '0.16px' }}>→ {p.keyDetail}</div>
                </div>
              </div>
            </Tip>
          ))}
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip title="Live pricing" explain="These are real prices scraped from Cyberport's website (topi's most prominent consumer-facing partner) in May 2026. They show what business customers actually pay per month for their devices. topi.eu lists 4 available term lengths: 6, 12, 24, and 36 months — Cyberport only publicly shows 36-month pricing, which is the most common B2B choice.">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>Live Pricing (Cyberport, May 2026)</h3>
        </Tip>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 12, color: '#525252', margin: 0, letterSpacing: '0.16px' }}>Showing 36-month examples · topi.eu offers:</p>
          {['6 months', '12 months', '24 months', '36 months'].map((t, i) => (
            <Tip key={t} explain={
              t === '6 months' ? 'The shortest available term — highest monthly payment but maximum flexibility.' :
              t === '12 months' ? 'One-year term. Higher monthly than 24/36 but allows annual hardware refresh.' :
              t === '24 months' ? 'Two-year term. A middle ground — lower monthly than 12-month, still allows for a mid-cycle refresh.' :
              '36-month (3-year) term — the most common B2B choice. Lowest monthly payment.'
            } title={t}>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: '3px 10px',
                background: i === 3 ? '#0f62fe' : '#e0e0e0',
                color: i === 3 ? '#ffffff' : '#161616',
                letterSpacing: '0.16px',
              }}>{t}</span>
            </Tip>
          ))}
          <span style={{ fontSize: 11, color: '#8c8c8c', letterSpacing: '0.16px' }}>· public pricing only available for 36-month</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#161616' }}>
                {[
                  ['Device', 'The specific hardware model included in the subscription.'],
                  ['Monthly', 'The fixed monthly payment the business customer makes.'],
                  ['36-month Total', 'Total cost over the subscription period.'],
                  ['RRP', 'Recommended Retail Price — what the device would cost to buy outright.'],
                  ['vs RRP', 'The percentage premium vs. buying outright.'],
                ].map(([h, tip]) => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#f4f4f4', textTransform: 'uppercase', letterSpacing: '0.32px' }}>
                    <Tip title={h} explain={tip}>{h}</Tip>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRICING.map((p, i) => {
                const total = parseFloat(p.total.replace('€', '').replace(/,/g, ''))
                const rrp = parseFloat(p.rrp.replace(/[~€]/g, '').replace(/,/g, ''))
                const diff = ((total / rrp - 1) * 100).toFixed(0)
                return (
                  <tr key={p.device} style={{ borderBottom: '1px solid #e0e0e0', background: i % 2 === 0 ? '#f4f4f4' : '#ffffff' }}>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>
                      <Tip explain={`This is the ${p.device}, rented on a 36-month subscription for ${p.monthly}/month.`}>{p.device}</Tip>
                    </td>
                    <td style={{ padding: '12px 14px', fontWeight: 600, color: '#0f62fe', fontSize: 15, letterSpacing: '0.16px' }}>
                      <Tip explain={`${p.monthly} per month is the all-inclusive monthly payment.`}>{p.monthly}</Tip>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#161616', letterSpacing: '0.16px' }}>
                      <Tip explain={`36 × ${p.monthly} = ${p.total} total paid over the life of the subscription.`}>{p.total}</Tip>
                    </td>
                    <td style={{ padding: '12px 14px', color: '#525252', letterSpacing: '0.16px' }}>
                      <Tip explain={`If the customer bought this device outright in a store today, they'd pay ${p.rrp}.`}>{p.rrp}</Tip>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <Tip explain={diff > 0 ? `+${diff}% means the total subscription cost is ${diff}% more expensive than buying outright.` : `${diff}% means the total subscription is actually ${Math.abs(diff)}% cheaper than buying outright.`}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', background: diff > 0 ? '#fff1f1' : '#defbe6', color: diff > 0 ? '#da1e28' : '#24a148', letterSpacing: '0.16px' }}>{diff > 0 ? '+' : ''}{diff}%</span>
                      </Tip>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 14, padding: '10px 14px', background: '#edf5ff', border: '1px solid #0f62fe', fontSize: 12, color: '#0043ce', letterSpacing: '0.16px' }}>
          💡 <Tip explain="OpEx = Operating Expense (monthly costs like rent, salaries, software). CapEx = Capital Expenditure (big one-time purchases like buying equipment). Converting a €2,000 laptop purchase into a €57/month subscription turns a CapEx into OpEx — this is often worth paying a small premium for.">
            Premium is low-single-digit % over RRP — positioned as "convenience + tax efficiency", not "cheap financing". OpEx framing (100% tax-deductible) is the real CFO argument.
          </Tip>
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip title="Customer Pain Points" explain="These are real problems that real customers have reported, found through Trustpilot reviews, product observation, and research.">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>Customer Pain Points</h3>
        </Tip>
        <p style={{ fontSize: 12, color: '#525252', marginBottom: 20, letterSpacing: '0.16px' }}>From Trustpilot analysis, product observations, and research signals · 89 public reviews total</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {PAIN_POINTS.map((p, i) => (
            <div key={i} style={{
              display: 'flex', gap: 12, padding: '12px 14px',
              background: '#f4f4f4',
              borderLeft: `3px solid ${p.severity === 'High' ? '#da1e28' : p.severity === 'Medium' ? '#f1c21b' : '#0f62fe'}`,
              border: '1px solid #e0e0e0',
              borderLeft: `3px solid ${p.severity === 'High' ? '#da1e28' : p.severity === 'Medium' ? '#f1c21b' : '#0f62fe'}`,
            }}>
              <Tip title={`${p.severity} Severity`} explain={
                p.severity === 'High' ? 'High severity means this pain point is causing customers to leave negative reviews, choose competitors, or request refunds.' :
                p.severity === 'Medium' ? 'Medium severity means this frustrates customers and reduces satisfaction.' :
                'Low severity means it\'s a minor inconvenience.'
              }>
                <span style={{
                  fontSize: 9, fontWeight: 700, padding: '3px 7px', height: 'fit-content', marginTop: 2,
                  background: p.severity === 'High' ? '#da1e28' : p.severity === 'Medium' ? '#f1c21b' : '#0f62fe',
                  color: p.severity === 'Medium' ? '#161616' : '#ffffff',
                  whiteSpace: 'nowrap', letterSpacing: '0.32px',
                }}>{p.severity.toUpperCase()}</span>
              </Tip>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, padding: '2px 7px', background: '#e0e0e0', color: '#161616', fontWeight: 600, letterSpacing: '0.16px' }}>{p.who}</span>
                  <Tip title={p.pain} explain={p.detail}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{p.pain}</span>
                  </Tip>
                </div>
                <div style={{ fontSize: 12, color: '#525252', marginTop: 4, letterSpacing: '0.16px' }}>{p.detail}</div>
                <div style={{ marginTop: 8 }}>
                  <Tip explain={p.mentions != null ? `${p.mentions} out of ${p.totalReviewed} public reviews explicitly mentioned this problem.` : `No customer review data available. Source: ${p.source}.`} title="Evidence">
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: '2px 8px',
                      background: p.mentions != null ? '#ffd200' : '#e0e0e0',
                      color: p.mentions != null ? '#161616' : '#525252',
                      display: 'inline-flex', alignItems: 'center', gap: 4, letterSpacing: '0.16px',
                    }}>
                      {p.mentions != null ? `${p.mentions} of ${p.totalReviewed} reviews` : p.source}
                    </span>
                  </Tip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompanyTab() {
  const roundTips = {
    'Pre-seed': 'Pre-seed is the very first funding round — usually from the founders\' own savings, friends, family, and a few angel investors.',
    'Series A': 'Series A is the first major institutional funding round — usually from professional Venture Capital (VC) firms.',
    'Debt Facility': 'A debt facility is a pool of borrowing capacity — like a credit line.',
    'ACQUISITION': 'This is when PEAC Solutions bought 100% of topi. Co-founder Estelle Merle was removed from the MD role on September 17, 2025.',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip title="Funding History" explain="This timeline shows how topi raised money over its short life. Each funding round represents a milestone.">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 20, letterSpacing: '0.16px' }}>Funding & Ownership History</h3>
        </Tip>
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 1, background: '#e0e0e0' }} />
          {FUNDING.map((f, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
              <div style={{ position: 'absolute', left: -20, top: 4, width: 12, height: 12, background: f.round === 'ACQUISITION' ? '#da1e28' : '#0f62fe', border: '2px solid #ffffff' }} />
              <Tip title={`${f.round} — ${f.date}`} explain={roundTips[f.round] || f.note} block>
                <div style={{ background: '#f4f4f4', padding: '14px 16px', border: '1px solid #e0e0e0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', marginRight: 8, background: f.round === 'ACQUISITION' ? '#fff1f1' : '#edf5ff', color: f.round === 'ACQUISITION' ? '#da1e28' : '#0f62fe', letterSpacing: '0.32px' }}>{f.round}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{f.amount}</span>
                    </div>
                    <span style={{ fontSize: 12, color: '#525252', letterSpacing: '0.16px' }}>{f.date}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#525252', marginTop: 6, letterSpacing: '0.16px' }}>{f.investors}</div>
                  {f.note && <div style={{ fontSize: 11, color: '#0f62fe', marginTop: 4, letterSpacing: '0.16px' }}>→ {f.note}</div>}
                </div>
              </Tip>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip title="Partner Ecosystem" explain="topi's growth is entirely dependent on these partners.">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>Partner Ecosystem</h3>
        </Tip>
        <p style={{ fontSize: 12, color: '#525252', marginBottom: 20, letterSpacing: '0.16px' }}>11 active partners across retail, IT distribution, and OEM channels</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
          {PARTNERS.map(p => (
            <Tip key={p.name} title={p.name} explain={`${p.note || ''} Partner type: ${p.type}. ${partnerTypeTips[p.type] || ''}`} block>
              <div style={{ padding: '12px 14px', background: p.name.includes('⚠️') ? '#fff8e1' : '#f4f4f4', border: `1px solid ${p.name.includes('⚠️') ? '#ffd200' : '#e0e0e0'}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{p.name}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 10, padding: '2px 6px', background: '#edf5ff', color: '#0f62fe', fontWeight: 600, letterSpacing: '0.16px' }}>{p.type}</span>
                  <span style={{ fontSize: 10, padding: '2px 6px', background: '#e0e0e0', color: '#161616', letterSpacing: '0.16px' }}>{p.country}</span>
                </div>
                {p.note && <div style={{ fontSize: 11, color: '#525252', marginTop: 6, letterSpacing: '0.16px' }}>{p.note}</div>}
              </div>
            </Tip>
          ))}
        </div>
      </div>

      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip title="Market Size & Growth" explain="These numbers show the total size of the markets topi operates in.">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 20, letterSpacing: '0.16px' }}>Market Size & Growth</h3>
        </Tip>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {MARKET_NUMBERS.map(m => (
            <Tip key={m.label} title={m.label} explain={m.sub} block>
              <div style={{ padding: '16px', background: '#f4f4f4', border: '1px solid #e0e0e0' }}>
                <div style={{ fontSize: 24, fontWeight: 300, color: '#0f62fe', letterSpacing: '-0.4px' }}>{m.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#161616', marginTop: 4, letterSpacing: '0.16px' }}>{m.label}</div>
                <div style={{ fontSize: 11, color: '#525252', marginTop: 3, letterSpacing: '0.16px' }}>{m.sub}</div>
              </div>
            </Tip>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompetitorsTab() {
  const tierColors = { 1: '#da1e28', 2: '#f1c21b', 3: '#0f62fe', 4: '#525252' }
  const tierTips = {
    1: 'Tier 1 = Direct Twins. These companies have the same business model as topi.',
    2: 'Tier 2 = Adjacent Operators. These companies are in the same general space but address it differently.',
    3: 'Tier 3 = Incumbent Lessors. Large, established companies that have been doing equipment leasing for decades.',
    4: 'Tier 4 = OEM Programs. Hardware manufacturers who offer their own financing programs.',
  }
  const threatTips = {
    CRITICAL: 'CRITICAL means this competitor could harm topi existentially.',
    HIGH: 'HIGH means actively growing into topi\'s territory within 1–2 years.',
    MEDIUM: 'MEDIUM means competes in the same space but addresses it differently.',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip title="Competitive Landscape" explain="This is a 4-tier map of everyone who competes with topi in different ways.">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>Competitive Landscape</h3>
        </Tip>
        <p style={{ fontSize: 12, color: '#525252', marginBottom: 20, letterSpacing: '0.16px' }}>6-tier map — from structural twins to sleeping giants</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {COMPETITORS.map(c => (
            <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto', gap: 16, padding: '16px 20px', background: '#f4f4f4', border: '1px solid #e0e0e0', alignItems: 'start', marginBottom: 1 }}>
              <div>
                <Tip title={c.name} explain={c.notes}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{c.name}</div>
                </Tip>
                <div style={{ fontSize: 11, color: '#525252', marginTop: 3, letterSpacing: '0.16px' }}>{c.hq}</div>
                <Tip title={`Tier ${c.tier}: ${c.tierLabel}`} explain={tierTips[c.tier] || ''}>
                  <span style={{ display: 'inline-block', marginTop: 6, fontSize: 10, fontWeight: 600, padding: '2px 8px', background: (tierColors[c.tier] || '#525252') + '14', color: tierColors[c.tier] || '#525252', letterSpacing: '0.32px' }}>
                    Tier {c.tier}: {c.tierLabel}
                  </span>
                </Tip>
              </div>
              <div>
                <Tip explain={`${c.name}'s business model: ${c.model}`}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{c.model}</div>
                </Tip>
                <Tip explain={`${c.name} has raised ${c.funding} in total funding.`}>
                  <div style={{ fontSize: 12, color: '#525252', marginTop: 4, letterSpacing: '0.16px' }}>{c.funding} · {c.scale}</div>
                </Tip>
                <div style={{ fontSize: 12, color: '#525252', marginTop: 6, letterSpacing: '0.16px' }}>{c.notes}</div>
              </div>
              <Tip title={`${c.threat} threat`} explain={threatTips[c.threat] || ''}>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '4px 10px', display: 'block', textAlign: 'center',
                  background: c.threat === 'CRITICAL' ? '#fff1f1' : c.threat === 'HIGH' ? '#fff8e1' : '#edf5ff',
                  color: c.threat === 'CRITICAL' ? '#da1e28' : c.threat === 'HIGH' ? '#c2410c' : '#0f62fe',
                  border: `1px solid ${c.threat === 'CRITICAL' ? '#da1e28' : c.threat === 'HIGH' ? '#f1c21b' : '#0f62fe'}`,
                  letterSpacing: '0.32px',
                }}>
                  {c.threat}
                </span>
              </Tip>
            </div>
          ))}
        </div>
      </div>

      <Tip title="The Grenke Problem" explain="Here's why Grenke is CRITICAL: topi's competitive advantage is that it's the modern, digital, API-first way to offer hardware subscriptions through resellers. But Grenke already has 39,400 resellers — they just don't have the subscription product yet. If Grenke's digital team spends one quarter building a 'subscribe instead of lease' feature in their existing GRENKEONLINE portal, every single one of their 39,400 reseller partners gets it automatically." block>
        <div style={{ background: '#fff1f1', border: '1px solid #da1e28', borderLeft: '3px solid #da1e28', padding: '20px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#da1e28', marginBottom: 8, letterSpacing: '0.16px' }}>The Grenke Problem</div>
          <p style={{ fontSize: 13, color: '#da1e28', lineHeight: 1.7, margin: 0, letterSpacing: '0.16px' }}>
            Grenke AG operates 39,400 reseller relationships and generated €3.05B in new business in 2024. If Grenke's digital team ships a subscription layer, they have 1,000× topi's distribution at launch with no customer acquisition cost. The only defensible moat is speed: deepen reseller lock-in before this gap closes.
          </p>
        </div>
      </Tip>
    </div>
  )
}

function TrendsTab() {
  const urgencyColor = { 'Now': '#da1e28', '6–12 months': '#f1c21b', '12–18 months': '#f1c21b', 'Ongoing': '#24a148' }
  const urgencyTextColor = { 'Now': '#ffffff', '6–12 months': '#161616', '12–18 months': '#161616', 'Ongoing': '#ffffff' }
  const urgencyTips = {
    'Now': 'NOW means this trend is already affecting topi\'s business today.',
    '6–12 months': 'This trend will materially affect topi\'s competitive position within 6–12 months.',
    '12–18 months': 'This is on the horizon but not urgent today.',
    'Ongoing': 'This is a slow-moving, long-term structural change.',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
      {TRENDS.map(t => (
        <div key={t.title} style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <Tip title={t.title} explain={t.detail}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{t.title}</div>
              </div>
            </Tip>
            <Tip title={`Urgency: ${t.urgency}`} explain={urgencyTips[t.urgency] || ''}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', whiteSpace: 'nowrap', marginLeft: 8, background: urgencyColor[t.urgency] || '#525252', color: urgencyTextColor[t.urgency] || '#ffffff', letterSpacing: '0.32px' }}>
                {t.urgency}
              </span>
            </Tip>
          </div>
          <p style={{ fontSize: 13, color: '#525252', lineHeight: 1.65, margin: 0, letterSpacing: '0.16px' }}>{t.detail}</p>
          <Tip title="What this means for topi" explain={t.implication} block>
            <div style={{ marginTop: 14, padding: '10px 12px', background: '#edf5ff', border: '1px solid #0f62fe', fontSize: 12, color: '#0043ce', letterSpacing: '0.16px' }}>
              <strong>Topi implication:</strong> {t.implication}
            </div>
          </Tip>
        </div>
      ))}
    </div>
  )
}

function OpportunitiesTab() {
  const allInitiatives = CHALLENGES.flatMap(c =>
    c.initiatives.map(i => ({ ...i, challengeId: c.id, challengeTitle: c.title }))
  ).sort((a, b) => b.ice - a.ice)

  const challengeColor = { penetration: '#0f62fe', retention: '#da1e28', largedeals: '#525252' }
  const effortBg = { Low: '#defbe6', Medium: '#fff8e1', High: '#fff1f1' }
  const effortColor = { Low: '#24a148', Medium: '#c2410c', High: '#da1e28' }
  const effortTips = {
    Low: 'Low effort = can be done quickly without significant engineering work.',
    Medium: 'Medium effort = requires 1–4 weeks of engineering or significant cross-functional coordination.',
    High: 'High effort = requires significant engineering work (months), new infrastructure, or major organizational changes.',
  }
  const quarterTips = {
    Q1: 'Q1 = January–March. These are the highest-priority initiatives that should start immediately.',
    Q2: 'Q2 = April–June. These require some preparation or engineering work.',
    Q3: 'Q3 = July–September. These are larger, more complex initiatives.',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0' }}>
        <Tip title="All Initiatives Ranked" explain="This is every recommended initiative across all three challenges, sorted from highest to lowest ICE score.">
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#161616', marginBottom: 4, letterSpacing: '0.16px' }}>All Initiatives — Ranked by ICE Score</h3>
        </Tip>
        <p style={{ fontSize: 12, color: '#525252', marginBottom: 20, letterSpacing: '0.16px' }}>Impact × Confidence × Ease — higher = do first</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {allInitiatives.map((item, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 80px 70px 60px 60px', gap: 12, padding: '12px 16px', background: i % 2 === 0 ? '#f4f4f4' : '#ffffff', alignItems: 'center', border: '1px solid #e0e0e0', marginBottom: 1 }}>
              <Tip explain={`Rank #${i + 1} by ICE score.`}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#8c8c8c', textAlign: 'center', letterSpacing: '0.16px' }}>{i + 1}</div>
              </Tip>
              <div>
                <Tip title={item.name} explain={`${item.name} — ICE score: ${item.ice}.`}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{item.name}</div>
                </Tip>
                <Tip explain={`This initiative addresses the "${item.challengeTitle}" challenge.`}>
                  <span style={{ fontSize: 10, padding: '1px 6px', marginTop: 4, display: 'inline-block', background: (challengeColor[item.challengeId] || '#525252') + '14', color: challengeColor[item.challengeId] || '#525252', fontWeight: 600, letterSpacing: '0.16px' }}>
                    {item.challengeTitle}
                  </span>
                </Tip>
              </div>
              <Tip title={`ICE Score: ${item.ice}`} explain={`ICE = Impact × Confidence × Ease. This initiative scored ${item.ice}.`}>
                <div style={{ fontSize: 22, fontWeight: 300, color: '#0f62fe', textAlign: 'center', letterSpacing: '-0.4px' }}>{item.ice}</div>
              </Tip>
              <Tip title={`Effort: ${item.effort}`} explain={effortTips[item.effort]}>
                <span style={{ fontSize: 11, padding: '3px 8px', textAlign: 'center', background: effortBg[item.effort], color: effortColor[item.effort], fontWeight: 600, letterSpacing: '0.16px' }}>{item.effort}</span>
              </Tip>
              <Tip title={item.q} explain={quarterTips[item.q]}>
                <span style={{ fontSize: 12, color: '#161616', fontWeight: 600, letterSpacing: '0.16px' }}>{item.q}</span>
              </Tip>
              <Tip explain={`Initiative type: ${item.type}.`}>
                <span style={{ fontSize: 10, padding: '2px 6px', background: '#e0e0e0', color: '#525252', letterSpacing: '0.16px' }}>{item.type}</span>
              </Tip>
            </div>
          ))}
        </div>
      </div>

      {CHALLENGES.map(c => (
        <div key={c.id} style={{ background: '#ffffff', padding: 24, border: '1px solid #e0e0e0', borderTop: `3px solid ${challengeColor[c.id]}` }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 22 }}>{c.icon}</span>
            <Tip title={c.title} explain={c.summary}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#161616', letterSpacing: '0.16px' }}>{c.title}</div>
            </Tip>
          </div>
          <Tip title="Analogy" explain="Analogies are a PM superpower in interviews." block>
            <div style={{ padding: '12px 14px', background: '#f4f4f4', border: '1px solid #e0e0e0', marginBottom: 16, fontSize: 12, color: '#525252', lineHeight: 1.6, letterSpacing: '0.16px' }}>
              <strong>Analogy:</strong> {c.analogy}
            </div>
          </Tip>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {c.rootCauses.map((cause, i) => (
              <Tip key={i} title={`Root Cause ${i + 1}`} explain={`Root causes are the underlying reasons why the metric is where it is. "${cause}"`} block>
                <div style={{ display: 'flex', gap: 10, padding: '8px 12px', background: '#fff8e1', border: '1px solid #ffd200', borderLeft: '3px solid #f1c21b' }}>
                  <span style={{ color: '#c2410c', fontWeight: 600, fontSize: 12, letterSpacing: '0.16px' }}>Root cause {i + 1}</span>
                  <span style={{ fontSize: 12, color: '#161616', letterSpacing: '0.16px' }}>{cause}</span>
                </div>
              </Tip>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={160} style={{ marginTop: 16 }}>
            <BarChart data={c.initiatives} margin={{ left: 0, right: 20 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#525252', fontFamily: 'IBM Plex Sans' }} />
              <YAxis tick={{ fontSize: 10, fill: '#8c8c8c', fontFamily: 'IBM Plex Sans' }} domain={[0, 650]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 0, border: '1px solid #e0e0e0' }} formatter={v => [`ICE ${v}`, 'Score']} />
              <Bar dataKey="ice" fill={challengeColor[c.id]} radius={0} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  )
}

export default function Analysis() {
  const [tab, setTab] = useState('product')
  return (
    <div style={{ padding: '32px 40px 60px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <Tip title="Deep Analysis" explain="This section lets you explore the full research across five dimensions.">
          <h1 style={{ fontSize: 32, fontWeight: 300, color: '#161616', margin: 0, letterSpacing: 0 }}>Deep Analysis</h1>
        </Tip>
        <p style={{ fontSize: 14, color: '#525252', marginTop: 6, letterSpacing: '0.16px' }}>Full research exploration — product, business, competitive, and market context</p>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', marginBottom: 28, flexWrap: 'wrap' }}>
        {TABS.map(t => <Tab key={t.id} active={tab === t.id} onClick={() => setTab(t.id)} label={t.label} />)}
      </div>
      {tab === 'product' && <ProductTab />}
      {tab === 'company' && <CompanyTab />}
      {tab === 'competitors' && <CompetitorsTab />}
      {tab === 'trends' && <TrendsTab />}
      {tab === 'opportunities' && <OpportunitiesTab />}
    </div>
  )
}
