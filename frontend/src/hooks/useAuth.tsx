import React, { createContext, useContext, useState, type ReactNode } from 'react'
import { authApi } from '@/lib/api'

interface AuthUser { id: number; name: string; email: string }

interface AuthContextType {
  user: AuthUser | null
  login:    (email: string, password: string) => Promise<void>
  register: (email: string, name: string, password: string) => Promise<void>
  logout:   () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const s = localStorage.getItem('meditwin_user')
      return s ? (JSON.parse(s) as AuthUser) : null
    } catch { return null }
  })

  const login = async (email: string, password: string): Promise<void> => {
    const data = await authApi.login({ email, password }) as { access_token: string; user_id: number; name: string }
    localStorage.setItem('meditwin_token', data.access_token)
    const u: AuthUser = { id: data.user_id, name: data.name, email }
    localStorage.setItem('meditwin_user', JSON.stringify(u))
    setUser(u)
  }

  const register = async (email: string, name: string, password: string): Promise<void> => {
    const data = await authApi.register({ email, name, password }) as { access_token: string; user_id: number; name: string }
    localStorage.setItem('meditwin_token', data.access_token)
    const u: AuthUser = { id: data.user_id, name: data.name, email }
    localStorage.setItem('meditwin_user', JSON.stringify(u))
    setUser(u)
  }

  const logout = (): void => {
    localStorage.removeItem('meditwin_token')
    localStorage.removeItem('meditwin_user')
    setUser(null)
  }

  return (
    <React.Fragment>
      <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  )
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}