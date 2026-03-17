import { cn } from '@/lib/utils'

type Severity = 'low' | 'moderate' | 'high' | 'critical'

const map: Record<Severity, string> = {
  low:      'bg-green-100 text-green-700 border-green-200',
  moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  high:     'bg-orange-100 text-orange-700 border-orange-200',
  critical: 'bg-red-100 text-red-700 border-red-200',
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize', map[severity])}>
      {severity === 'critical' && '🚨 '}{severity}
    </span>
  )
}