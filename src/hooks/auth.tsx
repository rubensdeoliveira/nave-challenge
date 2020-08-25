import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface User {
  id: string
  email: string
  token: string
}

interface SingInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  signIn(credentials: SingInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<User>(() => {
    const userResponse = localStorage.getItem('@GoBarber:user')

    if (userResponse) {
      const user = JSON.parse(userResponse)

      api.defaults.headers.authorization = `Bearer ${user.token}`

      return user
    }

    return {} as User
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('users/login', {
      email,
      password,
    })

    const user = response.data

    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${user.token}`

    setData(user)
  }, [])

  const signOut = useCallback(async () => {
    localStorage.removeItem('@GoBarber:user')

    setData({} as User)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
