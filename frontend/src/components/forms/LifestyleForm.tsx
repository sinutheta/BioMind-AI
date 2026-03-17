import { LifestyleInput } from '@/types'
import { Button } from '@/components/ui/Button'

export const defaultLifestyle: LifestyleInput = {
  sleep_hours: 7, stress_level: 5,
  exercise_days_per_week: 3, is_smoker: false,
  alcohol_units_per_week: 0, diet_quality: 'average',
  water_intake_liters: 2,
}

interface Props {
  value:     LifestyleInput
  onChange:  (v: LifestyleInput) => void
  onSubmit:  () => void
  onBack:    () => void
  loading:   boolean
}

export function LifestyleForm({ value, onChange, onSubmit, onBack, loading }: Props) {
  const set = (key: keyof LifestyleInput) => (v: any) => onChange({ ...value, [key]: v })

  const sleepWarning = value.sleep_hours < 6
  const stressWarning = value.stress_level >= 8

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Your Lifestyle</h2>
        <p className="text-sm text-gray-500 mt-1">These factors directly adjust your risk scores</p>
      </div>

      {/* Sleep */}
      <div className={`rounded-xl p-4 space-y-2 border-2 ${sleepWarning ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-transparent'}`}>
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>Sleep per night</span>
          <span className={`font-bold ${sleepWarning ? 'text-red-600' : 'text-blue-600'}`}>
            {value.sleep_hours} hrs {sleepWarning ? '⚠️' : ''}
          </span>
        </div>
        <input type="range" min={0} max={12} step={0.5} value={value.sleep_hours}
          onChange={e => set('sleep_hours')(Number(e.target.value))}
          className="w-full accent-blue-600" />
        {sleepWarning && <p className="text-xs text-red-600 font-medium">Less than 6 hrs significantly increases your risk score</p>}
      </div>

      {/* Stress */}
      <div className={`rounded-xl p-4 space-y-2 border-2 ${stressWarning ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-transparent'}`}>
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>Stress level</span>
          <span className={`font-bold ${stressWarning ? 'text-orange-600' : 'text-blue-600'}`}>
            {value.stress_level}/10 {stressWarning ? '⚠️' : ''}
          </span>
        </div>
        <input type="range" min={1} max={10} value={value.stress_level}
          onChange={e => set('stress_level')(Number(e.target.value))}
          className="w-full accent-blue-600" />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Very calm</span><span>Moderate</span><span>Very stressed</span>
        </div>
      </div>

      {/* Exercise */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>Exercise days per week</span>
          <span className="text-blue-600 font-bold">{value.exercise_days_per_week} days</span>
        </div>
        <input type="range" min={0} max={7} value={value.exercise_days_per_week}
          onChange={e => set('exercise_days_per_week')(Number(e.target.value))}
          className="w-full accent-blue-600" />
      </div>

      {/* Water */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm font-medium text-gray-700">
          <span>Water intake</span>
          <span className="text-blue-600 font-bold">{value.water_intake_liters}L / day</span>
        </div>
        <input type="range" min={0} max={5} step={0.5} value={value.water_intake_liters}
          onChange={e => set('water_intake_liters')(Number(e.target.value))}
          className="w-full accent-blue-600" />
      </div>

      {/* Diet quality */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Diet quality</p>
        <div className="grid grid-cols-4 gap-2">
          {(['poor', 'average', 'good', 'excellent'] as const).map(d => (
            <button key={d} type="button" onClick={() => set('diet_quality')(d)}
              className={`py-2 rounded-xl border-2 text-sm font-medium capitalize transition-all
                ${value.diet_quality === d ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Smoker + Alcohol */}
      <div className="grid grid-cols-2 gap-4">
        <button type="button" onClick={() => set('is_smoker')(!value.is_smoker)}
          className={`p-4 rounded-xl border-2 text-sm font-medium transition-all text-left
            ${value.is_smoker ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
          <div className="text-2xl mb-1">🚬</div>
          <div>Smoker</div>
          <div className="text-xs font-normal mt-0.5 opacity-70">{value.is_smoker ? 'Yes (+0.4× risk)' : 'No'}</div>
        </button>

        <div className="bg-gray-50 rounded-xl p-4 border-2 border-transparent">
          <div className="text-2xl mb-1">🍺</div>
          <div className="text-sm font-medium text-gray-700 mb-2">
            Alcohol <span className="text-blue-600 font-bold">{value.alcohol_units_per_week} units/wk</span>
          </div>
          <input type="range" min={0} max={40} value={value.alcohol_units_per_week}
            onChange={e => set('alcohol_units_per_week')(Number(e.target.value))}
            className="w-full accent-blue-600" />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button onClick={onSubmit} loading={loading} size="lg">
          Analyse My Health →
        </Button>
      </div>
    </div>
  )
}