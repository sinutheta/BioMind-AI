import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card, CardBody } from '@/components/ui/Card'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate     = useNavigate()
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async () => {
    if (!name || !email || !password) { setError('All fields required'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true); setError('')
    try {
      await register(email, name, password)
      navigate('/assessment')
    } catch (e: any) {
      const msg = e?.response?.data?.detail || 'Registration failed'
      setError(msg)
      console.log('Registration error:', e?.response?.data)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🧬 BioMind AI</h1>
          <p className="text-gray-500 mt-1">Create your account</p>
        </div>
        <Card>
          <CardBody className="p-6 space-y-4">
            <Input label="Full Name" value={name}     onChange={e => setName(e.target.value)}     placeholder="Your name" />
            <Input label="Email"     type="email" value={email} onChange={e => setEmail(e.target.value)}    placeholder="you@email.com" />
            <Input label="Password"  type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" />
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <Button className="w-full" onClick={handleSubmit} loading={loading} size="lg">
              Create Account
            </Button>
            <p className="text-center text-sm text-gray-500">
              Have an account? <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}