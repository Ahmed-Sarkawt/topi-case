import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle, AlertCircle, XCircle, Copy, Mail, FileDown, Calculator } from 'lucide-react'

const catalogue = [
  { id: 1, name: 'MacBook Pro 14" M3 Pro', category: 'Laptop', rrp: 2499 },
  { id: 2, name: 'MacBook Air M3', category: 'Laptop', rrp: 1299 },
  { id: 3, name: 'Dell XPS 15', category: 'Laptop', rrp: 1799 },
  { id: 4, name: 'ThinkPad X1 Carbon Gen 12', category: 'Laptop', rrp: 1649 },
  { id: 5, name: 'Surface Pro 10', category: 'Tablet', rrp: 1199 },
  { id: 6, name: 'iPad Pro 13" M4', category: 'Tablet', rrp: 1299 },
  { id: 7, name: 'LG UltraFine 27"', category: 'Monitor', rrp: 699 },
  { id: 8, name: 'iPhone 16 Pro', category: 'Phone', rrp: 1199 },
]

const RATES = { 6: 0.189, 12: 0.098, 24: 0.052, 36: 0.036 }

function getPrequal(value) {
  if (value < 5000) return { label: 'Likely Approve', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 border-green-200' }
  if (value <= 50000) return { label: 'Likely Approve', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 border-green-200' }
  if (value <= 100000) return { label: 'Needs Review', icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200' }
  return { label: 'Contact Support', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50 border-red-200' }
}

export default function QuoteGenerator() {
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [manualValue, setManualValue] = useState('')
  const [company, setCompany] = useState('')
  const [copied, setCopied] = useState(false)

  const dealValue = useMemo(() => {
    if (manualValue) return parseFloat(manualValue) || 0
    if (selectedProduct) return selectedProduct.rrp * quantity
    return 0
  }, [manualValue, selectedProduct, quantity])

  const quotes = useMemo(() =>
    [6, 12, 24, 36].map(term => ({
      term,
      monthly: Math.round(dealValue * RATES[term]),
      total: Math.round(dealValue * RATES[term] * term),
    })),
    [dealValue]
  )

  const prequal = useMemo(() => getPrequal(dealValue), [dealValue])
  const PrequalIcon = prequal.icon

  const filteredCatalogue = catalogue.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleCopy = () => {
    const text = `topi Quote — ${company || 'Customer'}\nDevice: ${selectedProduct?.name || 'Custom'}\nDeal value: €${dealValue.toLocaleString()}\n\n` +
      quotes.map(q => `${q.term} months: €${q.monthly.toLocaleString()}/mo (€${q.total.toLocaleString()} total)`).join('\n') +
      `\n\nPre-qualification: ${prequal.label}\nGenerated: ${new Date().toLocaleDateString('de-DE')}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Quote Generator</h1>
        <p className="text-sm text-gray-500 mt-1">Generate a topi financing quote in real time — share or send instantly</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Input panel */}
        <div className="space-y-5">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm font-semibold uppercase tracking-wide text-gray-500">Deal Details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Customer Company</Label>
                <Input placeholder="e.g. Müller GmbH" value={company} onChange={e => setCompany(e.target.value)} className="bg-white" />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Search Device Catalogue</Label>
                <Input placeholder="Search by name or category…" value={search} onChange={e => { setSearch(e.target.value); setManualValue('') }} className="bg-white" />
                {search && (
                  <div className="mt-1 border rounded-lg bg-white shadow-sm divide-y max-h-40 overflow-y-auto">
                    {filteredCatalogue.length === 0
                      ? <p className="p-3 text-sm text-gray-400">No results</p>
                      : filteredCatalogue.map(p => (
                        <button key={p.id} onClick={() => { setSelectedProduct(p); setSearch(p.name); setManualValue('') }}
                          className="w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{p.name}</p>
                            <p className="text-xs text-gray-400">{p.category}</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-600">€{p.rrp.toLocaleString()}</span>
                        </button>
                      ))
                    }
                  </div>
                )}
              </div>

              {selectedProduct && (
                <div>
                  <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Quantity</Label>
                  <Input type="number" min="1" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} className="bg-white w-24" />
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">or enter manually</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div>
                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Deal Value (€)</Label>
                <Input type="number" placeholder="e.g. 25000" value={manualValue}
                  onChange={e => { setManualValue(e.target.value); setSelectedProduct(null); setSearch('') }}
                  className="bg-white" />
              </div>
            </CardContent>
          </Card>

          {/* Pre-qual */}
          {dealValue > 0 && (
            <div className={`border rounded-lg p-4 flex items-center gap-3 ${prequal.bg}`}>
              <PrequalIcon size={18} className={prequal.color} />
              <div>
                <p className={`text-sm font-bold ${prequal.color}`}>Pre-qualification: {prequal.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">Based on deal value of €{dealValue.toLocaleString()} · v1 rules-based assessment</p>
              </div>
            </div>
          )}
        </div>

        {/* Output panel */}
        <div className="space-y-4">
          {dealValue > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600">{company || 'Customer'} — {selectedProduct?.name || 'Custom deal'}</p>
                  <p className="text-xs text-gray-400">Deal value: €{dealValue.toLocaleString()} · Generated {new Date().toLocaleDateString('de-DE')}</p>
                </div>
                <Badge variant="outline" className="text-xs">30-day validity</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {quotes.map(q => (
                  <Card key={q.term} className={q.term === 36 ? 'border-blue-300 ring-1 ring-blue-200' : ''}>
                    <CardContent className="pt-4 pb-4">
                      {q.term === 36 && <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">Most popular</p>}
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">{q.term} months</p>
                      <p className="text-3xl font-black text-gray-900">€{q.monthly.toLocaleString()}</p>
                      <p className="text-xs text-gray-400 mt-1">per month</p>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-500">Total: €{q.total.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">vs €{dealValue.toLocaleString()} upfront</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="pt-4 pb-4">
                  <p className="text-xs text-gray-400 mb-1">Recommended (36 months)</p>
                  <p className="text-white text-sm font-medium">
                    Instead of paying <span className="font-bold text-white">€{dealValue.toLocaleString()}</span> upfront,
                    your customer pays <span className="font-bold text-blue-300">€{quotes[3]?.monthly.toLocaleString()}/month</span> — converting CapEx to OpEx.
                  </p>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <button onClick={handleCopy}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${copied ? 'bg-green-50 border-green-300 text-green-700' : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'}`}>
                  {copied ? <><CheckCircle size={14} /> Copied!</> : <><Copy size={14} /> Copy Quote</>}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-blue-300">
                  <Mail size={14} /> Send via Email
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700">
                  <FileDown size={14} /> PDF
                </button>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div className="p-4 bg-gray-100 rounded-full mb-4"><Calculator size={28} className="text-gray-400" /></div>
              <p className="text-gray-500 font-medium">Enter a deal value to generate a quote</p>
              <p className="text-gray-400 text-sm mt-1">Search the catalogue or enter a custom amount</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
