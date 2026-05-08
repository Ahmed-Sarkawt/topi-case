import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TrendingUp, Euro, Trophy, Target, ChevronUp } from 'lucide-react'

const deals = [
  { id: 1, company: 'Müller GmbH', device: 'MacBook Pro 14"', value: 28400, bonus: 340, date: '2026-05-06', status: 'paid' },
  { id: 2, company: 'Schmidt & Partner', device: 'Dell XPS 15 ×5', value: 12750, bonus: 180, date: '2026-05-04', status: 'pending' },
  { id: 3, company: 'Technik Berger', device: 'Surface Pro 10 ×3', value: 8100, bonus: 140, date: '2026-04-29', status: 'paid' },
  { id: 4, company: 'Bayern Logistics', device: 'ThinkPad X1 ×8', value: 41200, bonus: 450, date: '2026-04-22', status: 'paid' },
  { id: 5, company: 'Nordpunkt AG', device: 'MacBook Air M3 ×4', value: 6800, bonus: 120, date: '2026-04-18', status: 'paid' },
]

const leaderboard = [
  { rank: 1, name: 'Rep A', deals: 12, earned: 1840 },
  { rank: 2, name: 'Rep B', deals: 9, earned: 1320 },
  { rank: 3, name: 'You', deals: 5, earned: 1230, isMe: true },
  { rank: 4, name: 'Rep D', deals: 7, earned: 980 },
  { rank: 5, name: 'Rep E', deals: 4, earned: 760 },
]

const tiers = [
  { label: 'Tier 1', range: '< €5K', bonus: '€20–50', threshold: 1 },
  { label: 'Tier 2', range: '€5K–€20K', bonus: '€100–250', threshold: 5000 },
  { label: 'Tier 3', range: '€20K–€50K', bonus: '€300–450', threshold: 20000 },
  { label: 'Tier 4', range: '> €50K', bonus: '€500–1,000', threshold: 50000 },
]

export default function SpiffDashboard() {
  const totalEarned = deals.reduce((s, d) => s + d.bonus, 0)
  const pendingBonus = deals.filter(d => d.status === 'pending').reduce((s, d) => s + d.bonus, 0)
  const quarterTarget = 2000
  const progress = Math.round((totalEarned / quarterTarget) * 100)

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">SPIFF Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Q2 2026 · Your seller incentive tracker</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Earned Q2</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">€{totalEarned.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">€{pendingBonus} pending</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg"><Euro size={18} className="text-blue-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Deals Closed</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><ChevronUp size={12} />2 vs last quarter</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg"><TrendingUp size={18} className="text-green-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Attach Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">18%</p>
                <p className="text-xs text-gray-400 mt-1">of your B2B deals</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg"><Target size={18} className="text-purple-600" /></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Leaderboard</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">#3</p>
                <p className="text-xs text-gray-400 mt-1">of 24 reps this quarter</p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg"><Trophy size={18} className="text-yellow-600" /></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quarter progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Quarter Target Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-bold">€{totalEarned.toLocaleString()}</span>
            <span className="text-sm text-gray-400">target €{quarterTarget.toLocaleString()}</span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-gray-400 mt-2">{progress}% of quarterly target · {5} deals qualifying</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Deals table */}
        <div className="col-span-2">
          <Tabs defaultValue="deals">
            <TabsList className="mb-4">
              <TabsTrigger value="deals">Recent Deals</TabsTrigger>
              <TabsTrigger value="tiers">SPIFF Tiers</TabsTrigger>
            </TabsList>
            <TabsContent value="deals">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Deal Value</TableHead>
                      <TableHead>Bonus</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deals.map(d => (
                      <TableRow key={d.id}>
                        <TableCell className="font-medium">{d.company}</TableCell>
                        <TableCell className="text-gray-500 text-sm">{d.device}</TableCell>
                        <TableCell>€{d.value.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold text-green-700">+€{d.bonus}</TableCell>
                        <TableCell className="text-gray-400 text-sm">{d.date}</TableCell>
                        <TableCell>
                          <Badge variant={d.status === 'paid' ? 'default' : 'secondary'}>
                            {d.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
            <TabsContent value="tiers">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tier</TableHead>
                      <TableHead>Deal Size</TableHead>
                      <TableHead>Bonus Range</TableHead>
                      <TableHead>Your Deals</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tiers.map((t, i) => (
                      <TableRow key={i} className={i === 2 ? 'bg-blue-50' : ''}>
                        <TableCell className="font-semibold">{t.label}</TableCell>
                        <TableCell>{t.range}</TableCell>
                        <TableCell className="font-semibold text-blue-700">{t.bonus}</TableCell>
                        <TableCell>{[0, 2, 2, 1][i]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Leaderboard */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold uppercase tracking-wide text-gray-500">Leaderboard <span className="text-gray-300 font-normal normal-case">anonymised</span></CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaderboard.map(r => (
              <div key={r.rank} className={`flex items-center gap-3 p-2 rounded-lg ${r.isMe ? 'bg-blue-50 border border-blue-100' : ''}`}>
                <span className={`text-sm font-bold w-6 text-center ${r.rank === 1 ? 'text-yellow-500' : 'text-gray-400'}`}>#{r.rank}</span>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${r.isMe ? 'text-blue-700' : 'text-gray-700'}`}>{r.name}{r.isMe ? ' (you)' : ''}</p>
                  <p className="text-xs text-gray-400">{r.deals} deals</p>
                </div>
                <span className="text-sm font-bold text-gray-700">€{r.earned.toLocaleString()}</span>
              </div>
            ))}
            <p className="text-xs text-gray-400 pt-2 border-t">Prize pool top 3 reps: €2,000 · Paid end of Q2</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
