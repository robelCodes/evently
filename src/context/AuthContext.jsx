import { createContext, useContext, useState } from "react"

const AuthContext = createContext()

const DEFAULT_USER = {
  id: "user1",
  name: "Robel Isaias",
  email: "robel@example.com",
  phone: "1234567890",
  preferences: {
    theme: "light",
    notifications: true,
  },
  favoriteEvents: [],
  joinedDate: "2024-01-01",
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    
    const saved = localStorage.getItem("evently_user")
    return saved ? JSON.parse(saved) : DEFAULT_USER
  })

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem("evently_user", JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)