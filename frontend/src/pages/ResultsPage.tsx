import { useLocation, useNavigate } from 'react-router-dom'
import { RadialBarChart, RadialBar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { SeverityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { PredictResponse } from '@/types'

const SEVERITY_COLOR: Record<string, string> = {
  low: '#22c55e', moderate: '#eab308', high: '#f97316', critical: '#ef4444'
}

export default function ResultsPage() {
  const { state }  = useLocation()
  const navigate   = useNavigate()
  const result: PredictResponse = state?.result

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No results found.</p>
          <Button onClick={() => navigate('/assessment')}>Take Assessment</Button>
        </div>
      </div>
    )
  }

  const scoreEntries = Object.entries(result.scores).sort((a, b) => b[1].score - a[1].score)
  const lifestyleFactors = [
    ...Object.entries(result.lifestyle.factors).map(([k, v]) => ({
      name: k.replace(/_/g, ' '), value: +(v * 100).toFixed(0), type: 'risk'
    })),
    ...Object.entries(result.lifestyle.protective).map(([k, v]) => ({
      name: k.replace(/_/g, ' '), value: +(Math.abs(v) * 100).toFixed(0), type: 'protect'
    })),
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Health Risk Report</h1>
            <p className="text-gray-500 text-sm mt-1">Lifestyle modifier: <span className="font-semibold text-orange-600">{result.lifestyle.modifier}×</span></p>
          </div>
          <Button variant="outline" onClick={() => navigate('/assessment')}>New Assessment</Button>
        </div>

        {/* Red flag alerts */}
        {result.red_flags.length > 0 && (
          <div className="bg-red-600 text-white rounded-2xl p-5 space-y-2">
            <p className="font-bold text-lg">🚨 Critical Alerts</p>
            {result.red_flags.map((f, i) => <p key={i} className="text-sm opacity-90">{f}</p>)}
          </div>
        )}

        {/* Risk scores grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scoreEntries.map(([disease, detail]) => (
            <Card key={disease}>
              <CardBody className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900 capitalize">{disease.replace(/_/g, ' ')}</p>
                    <p className="text-xs text-gray-400 capitalize">{detail.category} disease</p>
                  </div>
                  <SeverityBadge severity={detail.severity} />
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="60%" outerRadius="100%"
                      data={[{ value: detail.score, fill: SEVERITY_COLOR[detail.severity] }]}
                      startAngle={180} endAngle={0}>
                      <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#f3f4f6' }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-center -mt-8 text-2xl font-bold" style={{ color: SEVERITY_COLOR[detail.severity] }}>
                  {detail.score.toFixed(0)}<span className="text-sm font-normal text-gray-400">/100</span>
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Lifestyle impact */}
        {lifestyleFactors.length > 0 && (
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Lifestyle Impact on Your Score</h2>
              <p className="text-xs text-gray-400 mt-0.5">Total modifier: {result.lifestyle.modifier}× — how your habits are shifting your risk</p>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={lifestyleFactors} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" unit="%" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
                  <Tooltip formatter={(v: any) => `${v}%`} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {lifestyleFactors.map((f, i) => (
                      <Cell key={i} fill={f.type === 'risk' ? '#ef4444' : '#22c55e'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block"/> Risk raising</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block"/> Protective</span>
              </div>
            </CardBody>
          </Card>
        )}

        {/* LLM Explanation */}
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">AI Health Insight</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{result.explanation}</p>

            <div>
              <p className="font-semibold text-gray-800 mb-2">Top Recommendations</p>
              <ul className="space-y-2">
                {result.recommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-500 font-bold mt-0.5">{i + 1}.</span> {r}
                  </li>
                ))}
              </ul>
            </div>

            {result.see_doctor_if.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-semibold text-amber-800 mb-2">See a doctor if...</p>
                <ul className="space-y-1">
                  {result.see_doctor_if.map((s, i) => (
                    <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                      <span className="mt-0.5">⚠️</span> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardBody>
        </Card>

      </div>
    </div>
  )
}