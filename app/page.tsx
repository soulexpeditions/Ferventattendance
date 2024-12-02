'use client'

import { useState } from 'react'
import { EmployeeDashboard } from "@/components/employee-dashboard"
import { LoginForm } from "@/components/login-form"

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (email: string, password: string) => {
    // In a real application, you would validate credentials against a backend
    if (email && password) {
      setIsAuthenticated(true)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <EmployeeDashboard />
      </div>
    </div>
  )
}

