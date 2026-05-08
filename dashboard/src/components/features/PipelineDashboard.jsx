import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { AlertCircle, CheckCircle2, Clock, TrendingUp, Euro, Activity } from 'lucide-react'

const deals = [
  { id: 1, company: 'Müller GmbH', rep: 'Klaus M.', device: 'MacBook Pro 14" ×4', value: 28400, monthly: 820, term: 36, stage: 'active', startDate: '2024-11-12', monthsIn: 18, monthsLeft: 18, alert: null },
  { id: 2, company: 'TechVision Berlin', rep: 'Anna B.', device: 'Dell XPS 15 ×12', value: 74100, monthly: 2140, term: 36, stage: 'renewal-window', startDate: '2024-06-03', monthsIn: 23, monthsLeft: 13, alert: 'Renewal window open' },
  { id: 3, company: 'Nordpunkt AG', rep: 'Stefan W.', device: 'Surface Pro 10 ×6', value: 19800, monthly: 572, term: 36, stage: 'month-30', startDate: '2023-09-18', monthsIn: 32, monthsLeft: 4, alert: 'Contract ending soon — contact now' },
  { id: 4, company: 'Bayern Logistics', rep: 'Frank W.', device: 'ThinkPad X1 ×8', value: 41200, monthly: 1188, term: 36, stage: 'active', startDate: '2025-02-20', monthsIn: 15, monthsLeft: 21, alert: null },
  { id: 5, company: 'Rhein Digital', rep: 'Maria S.', device: 'iPad Pro ×10', value: 12500, monthly: 361, term: 36, stage: 'checkout', startDate: null, monthsIn: 0, monthsLeft: 36, alert: 'Awaiting checkout completion' },
  { id: 6, company: 'Schmitt & Co', rep: 'Paul R.', device: 'MacBook Air M3 ×6', value: 16200, monthly: 468, term: 36, stage: 'month-30', startDate: '2023-11-01', monthsIn: 30, monthsLeft: 6, alert: 'Month 30 — prime upgrade window' },
  { id: 7, company: 'Franken AG', rep: 'Lena F.', device: 'Surface Laptop ×3', value: 7800, monthly: 225, term: 36, stage: 'active', startDate: '2025-04-01', monthsIn: 13, monthsLeft: 23, alert: null },
]

const stageConfig = {
  checkout:       { label: 'Checkout',        color: 'bg-purple-100 text-purple-700', dot: 'bg-purple-400' },
  active:         { label: 'Active',           color: 'bg-green-100 text-green-700',  dot: 'bg-green-400' },
  'renewal-window': { label: 'Renewal Window', color: 'bg-blue-100 text-blue-700',   dot: 'bg-blue-400' },
  'month-30':     { label: 'Month 30',         color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400' },
  expired:        { label: 'Expired',          color: 'bg-red-100 text-red-700',      dot: 'bg-red-400' },
}

export default function PipelineDashboard() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(deals[2])

  const filtered = filter === 'all' ? deals : deals.filter(d => d.stage === filter)
  const alerts = deals.filter(d => d.alert)

  const totalGMV = deals.reduce((s, d) => s + d.value, 0)
  const monthlyRecurring = deals.filter(d => d.stage !== 'checkout').reduce((s, d) => s + d.monthly, 0)

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pipeline Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time deal visibility — know exactly when and who to follow up with</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="pt-5 flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg"><Euro size={16} className="text-blue-600" /></div>
          <div><p className="text-2xl font-bold">€{(totalGMV / 1000).toFixed(0)}K</p><p className="text-xs text-gray-400">Total financed GMV</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-5 flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg"><Activity size={16} className="text-green-600" /></div>
          <div><p className="text-2xl font-bold">€{monthlyRecurring.toLocaleString()}</p><p className="text-xs text-gray-400">Monthly recurring</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-5 flex items-center gap-3">
          <div className="p-2 bg-yellow-50 rounded-lg"><AlertCircle size={16} className="text-yellow-600" /></div>
          <div><p className="text-2xl font-bold">{alerts.length}</p><p className="text-xs text-gray-400">Action required</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-5 flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg"><TrendingUp size={16} className="text-purple-600" /></div>
          <div><p className="text-2xl font-bold">{deals.length}</p><p className="text-xs text-gray-400">Active deals</p></div>
        </CardContent></Card>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-yellow-800 flex items-center gap-2"><AlertCircle size={14} /> Action Required</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {alerts.map(d => (
              <div key={d.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-yellow-100">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${stageConfig[d.stage].dot}`} />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{d.company}</p>
                    <p className="text-xs text-gray-500">{d.alert}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">€{d.monthly}/mo</span>
                  <button onClick={() => setSelected(d)} className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">View</button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Deal table */}
        <div className="col-span-2">
          <div className="flex gap-2 mb-3 flex-wrap">
            {['all', 'checkout', 'active', 'renewal-window', 'month-30'].map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${filter === s ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>
                {s === 'all' ? `All (${deals.length})` : `${stageConfig[s]?.label} (${deals.filter(d => d.stage === s).length})`}
              </button>
            ))}
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Monthly</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(d => {
                  const cfg = stageConfig[d.stage]
                  const prog = d.monthsIn / d.term * 100
                  return (
                    <TableRow key={d.id} className={`cursor-pointer ${selected.id === d.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`} onClick={() => setSelected(d)}>
                      <TableCell>
                        <p className="font-medium text-sm">{d.company}</p>
                        <p className="text-xs text-gray-400">{d.device}</p>
                      </TableCell>
                      <TableCell><span className={`text-xs px-2 py-0.5 rounded font-semibold ${cfg.color}`}>{cfg.label}</span></TableCell>
                      <TableCell className="w-32">
                        <Progress value={Math.min(prog, 100)} className="h-1.5 mb-1" />
                        <p className="text-xs text-gray-400">Month {d.monthsIn}/{d.term}</p>
                      </TableCell>
                      <TableCell className="font-semibold">€{d.monthly.toLocaleString()}</TableCell>
                      <TableCell>
                        {d.alert
                          ? <span className="text-xs text-yellow-600 font-medium flex items-center gap-1"><AlertCircle size={11} />Follow up</span>
                          : <span className="text-xs text-gray-300">—</span>}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Deal detail */}
        <Card>
          <CardHeader className="pb-3 border-b">
            <CardTitle className="text-sm font-bold">{selected.company}</CardTitle>
            <p className="text-xs text-gray-400">{selected.device}</p>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div>
              <Progress value={selected.monthsIn / selected.term * 100} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Month {selected.monthsIn}</span>
                <span>{selected.monthsLeft} months left</span>
              </div>
            </div>
            {[
              ['Deal value', `€${selected.value.toLocaleString()}`],
              ['Monthly', `€${selected.monthly.toLocaleString()}`],
              ['Term', `${selected.term} months`],
              ['Rep', selected.rep],
              ['Stage', stageConfig[selected.stage]?.label],
              ['Start date', selected.startDate || 'Not started'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center text-sm border-b pb-2 last:border-0">
                <span className="text-gray-400">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
            {selected.alert && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-yellow-800 flex items-center gap-1"><AlertCircle size={11} /> {selected.alert}</p>
              </div>
            )}
            <button className="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Send follow-up email
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
