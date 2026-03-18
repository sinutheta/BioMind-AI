import { ClinicalInput } from '@/types'
import { Button } from '@/components/ui/Button'

export const defaultClinical: ClinicalInput = {
  age: 30, gender: 'male',
  systolic_bp: 120, diastolic_bp: 80,
  fasting_glucose: 90, total_cholesterol: 180,
  height_cm: 170, weight_kg: 70,
  family_diabetes: false, family_heart_disease: false, family_hypertension: false,
}

interface Props {
  value:    ClinicalInput
  onChange: (v: ClinicalInput) => void
  onNext:   () => void
  onBack:   () => void
}

function SliderField({ label, value, min, max, unit, onChange, hint }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
        <span>{label}</span>
        <span className="text-blue-600 font-bold">{value} <span className="font-normal text-gray-400">{unit}</span></span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-blue-600" />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  )
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!value)}
      className={`flex items-center gap-3 p-3 rounded-xl border-2 text-sm font-medium transition-all w-full text-left
        ${value ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
        ${value ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
        {value && <span className="text-white text-xs">✓</span>}
      </span>
      {label}
    </button>
  )
}

export function ClinicalForm({ value, onChange, onNext, onBack }: Props) {
  const bmi = value.height_cm > 0
    ? (value.weight_kg / Math.pow(value.height_cm / 100, 2)).toFixed(1)
    : '—'

  const set = (key: keyof ClinicalInput) => (v: any) => onChange({ ...value, [key]: v })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Clinical Measurements</h2>
        <p className="text-sm text-gray-500 mt-1">Values from your last checkup — estimates are fine</p>
      </div>

      {/* Age + Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <SliderField label="Age" value={value.age} min={1} max={100} unit="yrs"
            onChange={set('age')} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Gender</p>
          <div className="flex gap-2">
            {(['male', 'female', 'other'] as const).map(g => (
              <button key={g} type="button" onClick={() => set('gender')(g)}
                className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium capitalize transition-all
                  ${value.gender === g ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blood pressure */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        <p className="text-sm font-semibold text-gray-700">Blood Pressure</p>
        <SliderField label="Systolic (upper number)" value={value.systolic_bp}
          min={70} max={220} unit="mmHg" onChange={set('systolic_bp')}
          hint="Normal: 90–120 mmHg" />
        <SliderField label="Diastolic (lower number)" value={value.diastolic_bp}
          min={40} max={140} unit="mmHg" onChange={set('diastolic_bp')}
          hint="Normal: 60–80 mmHg" />
      </div>

      {/* Blood sugar + Cholesterol */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        <p className="text-sm font-semibold text-gray-700">Blood Work</p>
        <SliderField label="Fasting glucose" value={value.fasting_glucose}
          min={50} max={400} unit="mg/dL" onChange={set('fasting_glucose')}
          hint="Normal fasting: 70–99 mg/dL" />
        <SliderField label="Total cholesterol" value={value.total_cholesterol}
          min={50} max={500} unit="mg/dL" onChange={set('total_cholesterol')}
          hint="Healthy: below 200 mg/dL" />
      </div>

      {/* Height + Weight + BMI */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        <p className="text-sm font-semibold text-gray-700">Body Metrics</p>
        <SliderField label="Height" value={value.height_cm} min={100} max={230} unit="cm" onChange={set('height_cm')} />
        <SliderField label="Weight" value={value.weight_kg} min={30} max={250} unit="kg" onChange={set('weight_kg')} />
        <div className="flex items-center gap-3 pt-1">
          <span className="text-sm text-gray-500">BMI:</span>
          <span className="text-lg font-bold text-blue-600">{bmi}</span>
          <span className="text-xs text-gray-400">
            {Number(bmi) < 18.5 ? '(Underweight)' : Number(bmi) < 25 ? '(Normal)' : Number(bmi) < 30 ? '(Overweight)' : '(Obese)'}
          </span>
        </div>
      </div>

      {/* Family history */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">Family History</p>
        <div className="space-y-2">
          <Toggle label="Diabetes in family" value={value.family_diabetes} onChange={set('family_diabetes')} />
          <Toggle label="Heart disease in family" value={value.family_heart_disease} onChange={set('family_heart_disease')} />
          <Toggle label="High blood pressure in family" value={value.family_hypertension} onChange={set('family_hypertension')} />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button onClick={onNext}>Next: Lifestyle →</Button>
      </div>
    </div>
  )
}