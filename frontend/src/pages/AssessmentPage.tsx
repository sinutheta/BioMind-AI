import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SymptomForm, defaultSymptoms }   from '@/components/forms/SymptomForm'
import { ClinicalForm, defaultClinical }  from '@/components/forms/ClinicalForm'
import { LifestyleForm, defaultLifestyle } from '@/components/forms/LifestyleForm'
import { Card, CardBody } from '@/components/ui/Card'
import { predictApi } from '@/lib/api'
import type { SymptomInput, ClinicalInput, LifestyleInput } from '@/types'

const STEPS = ['Symptoms', 'Clinical', 'Lifestyle']

export default function AssessmentPage() {
  const navigate  = useNavigate()
  const [step, setStep]           = useState(0)
  const [symptoms, setSymptoms]   = useState<SymptomInput>(defaultSymptoms)
  const [clinical, setClinical]   = useState<ClinicalInput>(defaultClinical)
  const [lifestyle, setLifestyle] = useState<LifestyleInput>(defaultLifestyle)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await predictApi.predict({ symptoms, clinical, lifestyle })
      navigate('/results', { state: { result } })
    } catch (e: any) {
      setError(e?.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🧬 BioMind AI</h1>
          <p className="text-gray-500 mt-1">Complete all 3 steps to get your personalised risk report</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all
                ${i < step  ? 'bg-blue-600 text-white'
                : i === step ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                :              'bg-gray-200 text-gray-500'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-sm font-medium ${i === step ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-1 rounded-full mx-2 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <Card>
          <CardBody className="p-6">
            {step === 0 && <SymptomForm  value={symptoms}  onChange={setSymptoms}  onNext={() => setStep(1)} />}
            {step === 1 && <ClinicalForm value={clinical}  onChange={setClinical}  onNext={() => setStep(2)} onBack={() => setStep(0)} />}
            {step === 2 && <LifestyleForm value={lifestyle} onChange={setLifestyle} onSubmit={handleSubmit}  onBack={() => setStep(1)} loading={loading} />}
          </CardBody>
        </Card>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}