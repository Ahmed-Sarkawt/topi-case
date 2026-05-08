import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Mail, Clock, CheckCircle, Send, Search } from 'lucide-react'

const customers = [
  { id: 1, company: 'Müller GmbH', contact: 'Klaus Müller', lastDeal: '2024-11-12', contractEnd: '2027-11-12', monthsLeft: 18, devices: 4, segment: 'month-30' },
  { id: 2, company: 'TechVision Berlin', contact: 'Anna Becker', lastDeal: '2024-06-03', contractEnd: '2027-06-03', monthsLeft: 13, devices: 12, segment: 'renewal' },
  { id: 3, company: 'Nordpunkt AG', contact: 'Stefan Wolff', lastDeal: '2023-09-18', contractEnd: '2026-09-18', monthsLeft: 4, devices: 6, segment: 'renewal' },
  { id: 4, company: 'Berger Consulting', contact: 'Lena Berger', lastDeal: null, lastContact: '2025-01-10', devices: 0, segment: 'dormant' },
  { id: 5, company: 'Bayern Logistics', contact: 'Frank Weber', lastDeal: '2025-02-20', contractEnd: '2028-02-20', monthsLeft: 21, devices: 8, segment: 'upsell' },
  { id: 6, company: 'Rhein Digital', contact: 'Maria Schmidt', lastDeal: null, lastContact: '2024-08-15', devices: 0, segment: 'dormant' },
]

const templates = {
  'month-30': {
    label: 'Month 30 Upgrade',
    subject: "Your devices are 30 months in — time to think about what's next",
    preview: `Hi {{contact}},\n\nYou've been running your {{devices}} devices on topi for 30 months. That means you're 6 months away from end of contract — the perfect time to plan your next step.\n\nWith topi, you can:\n• Upgrade to the latest hardware seamlessly\n• Keep the same monthly rate\n• Avoid a large CAPEX at contract end\n\nYour current setup: {{devices}} devices at {{monthly}}/month.\n\nWant to see what a renewal or upgrade would look like? I can put together a quote in 5 minutes.\n\nBest,\n{{rep_name}}`,
    badge: 'High intent',
    color: 'bg-blue-50 border-blue-200',
  },
  'renewal': {
    label: 'Renewal Window',
    subject: "Your topi contract is ending in {{months}} months — let's plan ahead",
    preview: `Hi {{contact}},\n\nYour topi contract for {{devices}} devices ends in {{months}} months. I wanted to reach out now so we can explore your options without any time pressure.\n\nRenewal options:\n• Same devices, same rate — easiest path\n• Upgrade to newer models — often the same monthly cost\n• Add devices to your existing plan\n\nLet me know if you'd like to jump on a 15-minute call or if I should just send over some options.\n\nBest,\n{{rep_name}}`,
    badge: 'Renewal',
    color: 'bg-yellow-50 border-yellow-200',
  },
  'dormant': {
    label: 'Re-engage Dormant',
    subject: 'Quick question about your hardware setup at {{company}}',
    preview: `Hi {{contact}},\n\nWe worked together a while back, and I wanted to check in.\n\nA lot has changed — many of our partners are now financing hardware they used to buy outright, and it's making a real difference to their cash flow.\n\nI know you haven't financed with us recently. Would it be worth a 10-minute conversation to see if the timing is better now?\n\nNo pressure — just a quick check-in.\n\nBest,\n{{rep_name}}`,
    badge: 'Re-engage',
    color: 'bg-gray-50 border-gray-200',
  },
  'upsell': {
    label: 'Upsell / Expand',
    subject: 'Could you add more devices to your topi plan?',
    preview: `Hi {{contact}},\n\nYou've been running {{devices}} devices on topi — hope it's been smooth.\n\nI'm reaching out because a few of our partners in similar setups have recently added devices mid-contract. If you're planning any hardware purchases this year, it's worth knowing that you can add to an existing plan at a comparable rate.\n\nWould a quick quote be useful?\n\nBest,\n{{rep_name}}`,
    badge: 'Expand',
    color: 'bg-green-50 border-green-200',
  },
}

const segmentColor = { 'month-30': 'bg-blue-100 text-blue-700', 'renewal': 'bg-yellow-100 text-yellow-700', 'dormant': 'bg-gray-100 text-gray-600', 'upsell': 'bg-green-100 text-green-700' }
const segmentLabel = { 'month-30': 'Month 30', 'renewal': 'Renewal', 'dormant': 'Dormant', 'upsell': 'Upsell' }

export default function EmailCampaignKit() {
  const [selected, setSelected] = useState(customers[0])
  const [search, setSearch] = useState('')
  const [sent, setSent] = useState([])

  const filtered = customers.filter(c => c.company.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase()))
  const tpl = templates[selected.segment] || templates['dormant']

  const fillTemplate = (text) => text
    .replace(/{{contact}}/g, selected.contact.split(' ')[0])
    .replace(/{{company}}/g, selected.company)
    .replace(/{{devices}}/g, selected.devices || '—')
    .replace(/{{months}}/g, selected.monthsLeft || '—')
    .replace(/{{monthly}}/g, '€980')
    .replace(/{{rep_name}}/g, 'Alex')

  const handleSend = () => {
    setSent(s => [...s, selected.id])
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Email Campaign Kit</h1>
        <p className="text-sm text-gray-500 mt-1">Pre-built templates for reseller outreach — one click to personalise and send</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Customers', value: customers.length, icon: Mail },
          { label: 'Renewal window', value: customers.filter(c => c.segment === 'renewal').length, icon: Clock },
          { label: 'Month 30 ready', value: customers.filter(c => c.segment === 'month-30').length, icon: CheckCircle },
          { label: 'Sent this week', value: sent.length, icon: Send },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="pt-5 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg"><Icon size={16} className="text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{value}</p><p className="text-xs text-gray-400">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Customer list */}
        <div className="col-span-2 space-y-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search customers…" className="pl-8 bg-white" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Card className="overflow-hidden">
            <div className="divide-y">
              {filtered.map(c => (
                <button key={c.id} onClick={() => setSelected(c)}
                  className={`w-full text-left p-3 hover:bg-gray-50 transition-colors flex items-start gap-3 ${selected.id === c.id ? 'bg-blue-50' : ''}`}>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                    {c.company[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-800 truncate">{c.company}</p>
                      {sent.includes(c.id) && <CheckCircle size={12} className="text-green-500 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-400">{c.contact}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${segmentColor[c.segment]}`}>{segmentLabel[c.segment]}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Email preview */}
        <div className="col-span-3">
          <Card className={`border-2 ${tpl.color}`}>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">{tpl.badge}</Badge>
                    <Badge variant="outline">{selected.company}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">Subject: {fillTemplate(tpl.subject)}</p>
                </div>
                <button
                  onClick={handleSend}
                  disabled={sent.includes(selected.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${sent.includes(selected.id) ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                  {sent.includes(selected.id) ? <><CheckCircle size={14} /> Sent</> : <><Send size={14} /> Send Email</>}
                </button>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{fillTemplate(tpl.preview)}</pre>
            </CardContent>
          </Card>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {Object.entries(templates).map(([key, t]) => (
              <button key={key} onClick={() => setSelected({ ...selected, segment: key })}
                className={`text-left p-3 rounded-lg border transition-colors hover:border-blue-300 ${selected.segment === key ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <p className="text-sm font-semibold text-gray-800">{t.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.subject.slice(0, 48)}…</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
