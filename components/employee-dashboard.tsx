'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarIcon, UserIcon, ClipboardListIcon, BookIcon } from 'lucide-react'
import { AttendanceCalendar } from "./attendance-calendar"
import { LeaveManagement } from "./leave-management"
import { EmployeeProfile } from "./employee-profile"
import { CompanyPolicy } from "./company-policy"

type View = 'attendance' | 'leave' | 'profile' | 'policy'

export function EmployeeDashboard() {
  const [currentView, setCurrentView] = useState<View>('attendance')
  const [alert, setAlert] = useState<string | null>(null)

  const renderView = () => {
    switch (currentView) {
      case 'attendance':
        return <AttendanceCalendar setAlert={setAlert} />
      case 'leave':
        return <LeaveManagement setAlert={setAlert} />
      case 'profile':
        return <EmployeeProfile setAlert={setAlert} />
      case 'policy':
        return <CompanyPolicy setAlert={setAlert} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {alert && (
        <Alert className="mb-4">
          <AlertDescription>{alert}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-center space-x-4 mb-6">
        <Button 
          onClick={() => setCurrentView('attendance')}
          variant={currentView === 'attendance' ? 'default' : 'outline'}
        >
          <CalendarIcon className="mr-2 h-4 w-4" /> Attendance
        </Button>
        <Button 
          onClick={() => setCurrentView('leave')}
          variant={currentView === 'leave' ? 'default' : 'outline'}
        >
          <ClipboardListIcon className="mr-2 h-4 w-4" /> Leave Management
        </Button>
        <Button 
          onClick={() => setCurrentView('profile')}
          variant={currentView === 'profile' ? 'default' : 'outline'}
        >
          <UserIcon className="mr-2 h-4 w-4" /> Profile
        </Button>
        <Button 
          onClick={() => setCurrentView('policy')}
          variant={currentView === 'policy' ? 'default' : 'outline'}
        >
          <BookIcon className="mr-2 h-4 w-4" /> Company Policy
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentView === 'attendance' && 'Attendance Tracker'}
            {currentView === 'leave' && 'Leave Management'}
            {currentView === 'profile' && 'Employee Profile'}
            {currentView === 'policy' && 'Company Policy'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderView()}
        </CardContent>
      </Card>
    </div>
  )
}

