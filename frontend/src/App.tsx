import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import LoginPage      from '@/pages/LoginPage.tsx'
import RegisterPage   from '@/pages/RegisterPage.tsx'
import AssessmentPage from '@/pages/AssessmentPage.tsx'
import ResultsPage    from '@/pages/ResultsPage.tsx'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/assessment" element={<PrivateRoute><AssessmentPage /></PrivateRoute>} />
      <Route path="/results"    element={<PrivateRoute><ResultsPage /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
} 