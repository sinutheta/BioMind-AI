import { useState } from 'react'
import { SymptomInput } from '@/types'
import { Button } from '@/components/ui/Button'

const SYMPTOMS = [
  { key: 'itching',                    label: 'Itching',                    icon: '🤌' },
  { key: 'skin_rash',                  label: 'Skin Rash',                  icon: '🩹' },
  { key: 'nodal_skin_eruptions',       label: 'Nodal Skin Eruptions',       icon: '🔵' },
  { key: 'continuous_sneezing',        label: 'Continuous Sneezing',        icon: '🤧' },
  { key: 'shivering',                  label: 'Shivering',                  icon: '🥶' },
  { key: 'chills',                     label: 'Chills',                     icon: '❄️' },
  { key: 'joint_pain',                 label: 'Joint Pain',                 icon: '🦴' },
  { key: 'stomach_pain',               label: 'Stomach Pain',               icon: '🫃' },
  { key: 'acidity',                    label: 'Acidity',                    icon: '🔥' },
  { key: 'ulcers_on_tongue',           label: 'Ulcers on Tongue',           icon: '👅' },
  { key: 'muscle_wasting',             label: 'Muscle Wasting',             icon: '💪' },
  { key: 'vomiting',                   label: 'Vomiting',                   icon: '🤮' },
  { key: 'burning_micturition',        label: 'Burning Urination',          icon: '🔥' },
  { key: 'spotting_urination',         label: 'Spotting Urination',         icon: '🚿' },
  { key: 'fatigue',                    label: 'Fatigue',                    icon: '😴' },
  { key: 'weight_gain',                label: 'Weight Gain',                icon: '🏋️' },
  { key: 'anxiety',                    label: 'Anxiety',                    icon: '😰' },
  { key: 'cold_hands_and_feet',        label: 'Cold Hands & Feet',          icon: '🧊' },
  { key: 'mood_swings',                label: 'Mood Swings',                icon: '🎭' },
  { key: 'weight_loss',                label: 'Weight Loss',                icon: '⚖️' },
  { key: 'restlessness',               label: 'Restlessness',               icon: '😤' },
  { key: 'lethargy',                   label: 'Lethargy',                   icon: '😪' },
  { key: 'patches_in_throat',          label: 'Patches in Throat',          icon: '👄' },
  { key: 'irregular_sugar_level',      label: 'Irregular Sugar Level',      icon: '🩸' },
  { key: 'cough',                      label: 'Cough',                      icon: '😮‍💨' },
  { key: 'fever',                      label: 'High Fever',                 icon: '🌡️' },
  { key: 'sunken_eyes',                label: 'Sunken Eyes',                icon: '👁️' },
  { key: 'shortness_of_breath',        label: 'Shortness of Breath',        icon: '😮' },
  { key: 'sweating',                   label: 'Sweating',                   icon: '💧' },
  { key: 'dehydration',                label: 'Dehydration',                icon: '🏜️' },
  { key: 'indigestion',                label: 'Indigestion',                icon: '🫁' },
  { key: 'headache',                   label: 'Headache',                   icon: '🤯' },
  { key: 'yellowish_skin',             label: 'Yellowish Skin',             icon: '🟡' },
  { key: 'dark_urine',                 label: 'Dark Urine',                 icon: '🟤' },
  { key: 'nausea',                     label: 'Nausea',                     icon: '🤢' },
  { key: 'loss_of_appetite',           label: 'Loss of Appetite',           icon: '🍽️' },
  { key: 'pain_behind_eyes',           label: 'Pain Behind Eyes',           icon: '👀' },
  { key: 'back_pain',                  label: 'Back Pain',                  icon: '🔙' },
  { key: 'constipation',               label: 'Constipation',               icon: '😣' },
  { key: 'abdominal_pain',             label: 'Abdominal Pain',             icon: '🫃' },
  { key: 'diarrhea',                   label: 'Diarrhea',                   icon: '🚽' },
  { key: 'mild_fever',                 label: 'Mild Fever',                 icon: '🌡️' },
  { key: 'yellow_urine',               label: 'Yellow Urine',               icon: '💛' },
  { key: 'yellowing_of_eyes',          label: 'Yellowing of Eyes',          icon: '👁️' },
  { key: 'acute_liver_failure',        label: 'Liver Failure Signs',        icon: '🫀' },
  { key: 'fluid_overload',             label: 'Fluid Overload',             icon: '💦' },
  { key: 'swelling_of_stomach',        label: 'Stomach Swelling',           icon: '🫁' },
  { key: 'swelled_lymph_nodes',        label: 'Swelled Lymph Nodes',        icon: '🔵' },
  { key: 'malaise',                    label: 'Malaise',                    icon: '😩' },
  { key: 'blurred_vision',             label: 'Blurred Vision',             icon: '👓' },
  { key: 'phlegm',                     label: 'Phlegm',                     icon: '🟢' },
  { key: 'sore_throat',                label: 'Sore Throat',                icon: '🤒' },
  { key: 'redness_of_eyes',            label: 'Red Eyes',                   icon: '🔴' },
  { key: 'sinus_pressure',             label: 'Sinus Pressure',             icon: '😫' },
  { key: 'runny_nose',                 label: 'Runny Nose',                 icon: '🤧' },
  { key: 'congestion',                 label: 'Congestion',                 icon: '😶‍🌫️' },
  { key: 'chest_pain',                 label: 'Chest Pain',                 icon: '💔' },
  { key: 'weakness_in_limbs',          label: 'Weakness in Limbs',          icon: '🦾' },
  { key: 'fast_heart_rate',            label: 'Fast Heart Rate',            icon: '💓' },
  { key: 'pain_during_bowel_movements',label: 'Pain During Bowel Movements',icon: '😣' },
  { key: 'pain_in_anal_region',        label: 'Anal Pain',                  icon: '🩺' },
  { key: 'bloody_stool',               label: 'Bloody Stool',               icon: '🩸' },
  { key: 'irritation_in_anus',         label: 'Anal Irritation',            icon: '🩺' },
  { key: 'neck_pain',                  label: 'Neck Pain',                  icon: '🧣' },
  { key: 'dizziness',                  label: 'Dizziness',                  icon: '💫' },
  { key: 'cramps',                     label: 'Cramps',                     icon: '😖' },
  { key: 'bruising',                   label: 'Bruising',                   icon: '🟣' },
  { key: 'obesity',                    label: 'Obesity',                    icon: '⚖️' },
  { key: 'swollen_legs',               label: 'Swollen Legs',               icon: '🦵' },
  { key: 'swollen_blood_vessels',      label: 'Swollen Blood Vessels',      icon: '🩸' },
  { key: 'puffy_face_and_eyes',        label: 'Puffy Face & Eyes',          icon: '😶' },
  { key: 'enlarged_thyroid',           label: 'Enlarged Thyroid',           icon: '🔵' },
  { key: 'brittle_nails',              label: 'Brittle Nails',              icon: '💅' },
  { key: 'swollen_extremities',        label: 'Swollen Extremities',        icon: '🦵' },
  { key: 'excessive_hunger',           label: 'Excessive Hunger',           icon: '🍔' },
  { key: 'drying_and_tingling_lips',   label: 'Tingling Lips',              icon: '👄' },
  { key: 'slurred_speech',             label: 'Slurred Speech',             icon: '🗣️' },
  { key: 'knee_pain',                  label: 'Knee Pain',                  icon: '🦵' },
  { key: 'hip_joint_pain',             label: 'Hip Pain',                   icon: '🦴' },
  { key: 'muscle_weakness',            label: 'Muscle Weakness',            icon: '💪' },
  { key: 'stiff_neck',                 label: 'Stiff Neck',                 icon: '🧍' },
  { key: 'swelling_joints',            label: 'Swelling Joints',            icon: '🦴' },
  { key: 'movement_stiffness',         label: 'Movement Stiffness',         icon: '🚶' },
  { key: 'spinning_movements',         label: 'Spinning/Vertigo',           icon: '🌀' },
  { key: 'loss_of_balance',            label: 'Loss of Balance',            icon: '🤸' },
  { key: 'unsteadiness',               label: 'Unsteadiness',               icon: '🚶' },
  { key: 'weakness_of_one_body_side',  label: 'One-Sided Weakness',         icon: '🦾' },
  { key: 'loss_of_smell',              label: 'Loss of Smell',              icon: '👃' },
  { key: 'bladder_discomfort',         label: 'Bladder Discomfort',         icon: '🫧' },
  { key: 'foul_smell_of_urine',        label: 'Foul Urine Smell',           icon: '👃' },
  { key: 'continuous_feel_of_urine',   label: 'Continuous Urine Urge',      icon: '🚿' },
  { key: 'passage_of_gases',           label: 'Passage of Gases',           icon: '💨' },
  { key: 'internal_itching',           label: 'Internal Itching',           icon: '🤌' },
  { key: 'depression',                 label: 'Depression',                 icon: '😔' },
  { key: 'irritability',               label: 'Irritability',               icon: '😠' },
  { key: 'muscle_pain',                label: 'Muscle Pain',                icon: '💢' },
  { key: 'altered_sensorium',          label: 'Altered Sensorium',          icon: '🧠' },
  { key: 'red_spots_over_body',        label: 'Red Spots',                  icon: '🔴' },
  { key: 'belly_pain',                 label: 'Belly Pain',                 icon: '🤕' },
  { key: 'abnormal_menstruation',      label: 'Abnormal Menstruation',      icon: '🩸' },
  { key: 'dischromic_patches',         label: 'Dischromic Patches',         icon: '🟤' },
  { key: 'watering_from_eyes',         label: 'Watering Eyes',              icon: '😢' },
  { key: 'increased_appetite',         label: 'Increased Appetite',         icon: '🍽️' },
  { key: 'polyuria',                   label: 'Polyuria',                   icon: '🚰' },
  { key: 'family_history',             label: 'Family History of Disease',  icon: '👨‍👩‍👧' },
  { key: 'mucoid_sputum',              label: 'Mucoid Sputum',              icon: '🟢' },
  { key: 'rusty_sputum',               label: 'Rusty Sputum',               icon: '🟤' },
  { key: 'lack_of_concentration',      label: 'Lack of Concentration',      icon: '🧠' },
  { key: 'visual_disturbances',        label: 'Visual Disturbances',        icon: '👓' },
  { key: 'blood_in_sputum',            label: 'Blood in Sputum',            icon: '🩸' },
  { key: 'prominent_veins_on_calf',    label: 'Prominent Calf Veins',       icon: '🦵' },
  { key: 'palpitations',               label: 'Palpitations',               icon: '💗' },
  { key: 'painful_walking',            label: 'Painful Walking',            icon: '🚶' },
  { key: 'pus_filled_pimples',         label: 'Pus Filled Pimples',         icon: '🔴' },
  { key: 'blackheads',                 label: 'Blackheads',                 icon: '⚫' },
  { key: 'skin_peeling',               label: 'Skin Peeling',               icon: '🫧' },
  { key: 'silver_like_dusting',        label: 'Silver Skin Dusting',        icon: '✨' },
  { key: 'small_dents_in_nails',       label: 'Nail Dents',                 icon: '💅' },
  { key: 'inflammatory_nails',         label: 'Inflamed Nails',             icon: '🔥' },
  { key: 'blister',                    label: 'Blisters',                   icon: '💊' },
  { key: 'red_sore_around_nose',       label: 'Red Sore Around Nose',       icon: '👃' },
  { key: 'yellow_crust_ooze',          label: 'Yellow Crust/Ooze',          icon: '🟡' },
  { key: 'body_ache',                  label: 'Body Ache',                  icon: '💪' },
  { key: 'frequent_urination',         label: 'Frequent Urination',         icon: '🚿' },
  { key: 'excessive_thirst',           label: 'Excessive Thirst',           icon: '🥤' },
]

export const defaultSymptoms: SymptomInput = {
  itching: false, skin_rash: false, nodal_skin_eruptions: false,
  continuous_sneezing: false, shivering: false, chills: false,
  joint_pain: false, stomach_pain: false, acidity: false,
  ulcers_on_tongue: false, muscle_wasting: false, vomiting: false,
  burning_micturition: false, spotting_urination: false, fatigue: false,
  weight_gain: false, anxiety: false, cold_hands_and_feet: false,
  mood_swings: false, weight_loss: false, restlessness: false,
  lethargy: false, patches_in_throat: false, irregular_sugar_level: false,
  cough: false, fever: false, sunken_eyes: false, shortness_of_breath: false,
  sweating: false, dehydration: false, indigestion: false, headache: false,
  yellowish_skin: false, dark_urine: false, nausea: false,
  loss_of_appetite: false, pain_behind_eyes: false, back_pain: false,
  constipation: false, abdominal_pain: false, diarrhea: false,
  mild_fever: false, yellow_urine: false, yellowing_of_eyes: false,
  acute_liver_failure: false, fluid_overload: false,
  swelling_of_stomach: false, swelled_lymph_nodes: false, malaise: false,
  blurred_vision: false, phlegm: false, sore_throat: false,
  redness_of_eyes: false, sinus_pressure: false, runny_nose: false,
  congestion: false, chest_pain: false, weakness_in_limbs: false,
  fast_heart_rate: false, pain_during_bowel_movements: false,
  pain_in_anal_region: false, bloody_stool: false, irritation_in_anus: false,
  neck_pain: false, dizziness: false, cramps: false, bruising: false,
  obesity: false, swollen_legs: false, swollen_blood_vessels: false,
  puffy_face_and_eyes: false, enlarged_thyroid: false, brittle_nails: false,
  swollen_extremities: false, excessive_hunger: false,
  drying_and_tingling_lips: false, slurred_speech: false, knee_pain: false,
  hip_joint_pain: false, muscle_weakness: false, stiff_neck: false,
  swelling_joints: false, movement_stiffness: false, spinning_movements: false,
  loss_of_balance: false, unsteadiness: false, weakness_of_one_body_side: false,
  loss_of_smell: false, bladder_discomfort: false, foul_smell_of_urine: false,
  continuous_feel_of_urine: false, passage_of_gases: false,
  internal_itching: false, depression: false, irritability: false,
  muscle_pain: false, altered_sensorium: false, red_spots_over_body: false,
  belly_pain: false, abnormal_menstruation: false, dischromic_patches: false,
  watering_from_eyes: false, increased_appetite: false, polyuria: false,
  family_history: false, mucoid_sputum: false, rusty_sputum: false,
  lack_of_concentration: false, visual_disturbances: false,
  blood_in_sputum: false, prominent_veins_on_calf: false,
  palpitations: false, painful_walking: false, pus_filled_pimples: false,
  blackheads: false, skin_peeling: false, silver_like_dusting: false,
  small_dents_in_nails: false, inflammatory_nails: false, blister: false,
  red_sore_around_nose: false, yellow_crust_ooze: false,
  body_ache: false, frequent_urination: false, excessive_thirst: false,
  skin_rash2: false, severity: 5, duration_days: 1,
}

interface Props {
  value: SymptomInput
  onChange: (v: SymptomInput) => void
  onNext: () => void
}

export function SymptomForm({ value, onChange, onNext }: Props) {
  const [search, setSearch] = useState('')

  const toggle = (key: string) =>
    onChange({ ...value, [key]: !value[key as keyof SymptomInput] })

  const count = SYMPTOMS.filter(s => value[s.key as keyof SymptomInput]).length

  const filtered = search.trim() === ''
    ? SYMPTOMS
    : SYMPTOMS.filter(s =>
        s.label.toLowerCase().includes(search.toLowerCase())
      )

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">What symptoms do you have?</h2>
        <p className="text-sm text-gray-500 mt-1">Select all that you are currently experiencing</p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search symptoms... e.g. fever, rash, pain"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">🔍</span>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {search && (
        <p className="text-xs text-gray-400">
          {filtered.length} symptom{filtered.length !== 1 ? 's' : ''} found for "{search}"
        </p>
      )}

      {/* Symptom grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-96 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-gray-400 text-sm">
            No symptoms found for "{search}"
          </div>
        ) : filtered.map(({ key, label, icon }) => {
          const active = Boolean(value[key as keyof SymptomInput])
          return (
            <button
              key={key} type="button" onClick={() => toggle(key)}
              className={`flex items-center gap-2 p-2.5 rounded-xl border-2 text-xs font-medium transition-all text-left
                ${active
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              <span className="text-base flex-shrink-0">{icon}</span>
              <span className="leading-tight">{label}</span>
            </button>
          )
        })}
      </div>

      {count > 0 && (
        <div className="bg-blue-50 rounded-xl p-5 space-y-5 border border-blue-100">
          <div>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Severity of worst symptom</span>
              <span className="text-blue-600 font-bold">{value.severity}/10</span>
            </div>
            <input type="range" min={1} max={10} value={value.severity}
              onChange={e => onChange({ ...value, severity: Number(e.target.value) })}
              className="w-full accent-blue-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Mild</span><span>Moderate</span><span>Severe</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>How long?</span>
              <span className="text-blue-600 font-bold">{value.duration_days} day{value.duration_days > 1 ? 's' : ''}</span>
            </div>
            <input type="range" min={1} max={30} value={value.duration_days}
              onChange={e => onChange({ ...value, duration_days: Number(e.target.value) })}
              className="w-full accent-blue-600" />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-2">
        <span className="text-sm text-gray-400">
          {count === 0 ? 'No symptoms selected — that\'s fine' : `${count} symptom${count > 1 ? 's' : ''} selected`}
        </span>
        <Button onClick={onNext}>Next: Clinical Data →</Button>
      </div>
    </div>
  )
}