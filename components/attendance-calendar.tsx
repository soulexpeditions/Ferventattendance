'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { UserCheck, UserMinus } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface AttendanceRecord {
  date: Date
  status: 'present' | 'absent' | 'leave' | 'holiday' | 'half-day' | 'approved'
  checkInTime?: string
}

interface AttendanceCalendarProps {
  setAlert: (message: string) => void
}

export function AttendanceCalendar({ setAlert }: AttendanceCalendarProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [currentMonth] = useState(new Date())

  useEffect(() => {
    // Initialize mock data
    const today = new Date()
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
    const mockAttendance: AttendanceRecord[] = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth(), i + 1)
      const dayOfWeek = date.getDay()
      
      if (dayOfWeek === 0) {
        return { date, status: 'holiday' } // Sunday
      }
      
      // Randomly assign statuses for demonstration
      const statuses: AttendanceRecord['status'][] = ['present', 'absent', 'leave', 'holiday', 'half-day', 'approved']
      return { date, status: statuses[Math.floor(Math.random() * statuses.length)] }
    })

    setAttendanceRecords(mockAttendance)
  }, [])

  const handleCheckIn = () => {
    const now = new Date()
    const checkInTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setAttendanceRecords(prevRecords => 
      prevRecords.map(record => 
        record.date.toDateString() === now.toDateString()
          ? { ...record, status: 'present', checkInTime }
          : record
      )
    )
    setIsCheckedIn(true)
    setAlert(`Checked in successfully at ${checkInTime}`)
  }

  const handleCheckOut = () => {
    setIsCheckedIn(false)
    setAlert('Checked out successfully')
  }

  const renderCalendar = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    const daysInMonth = lastDay.getDate()
    
    const calendar = []
    
    calendar.push(
      <div key="header" className="grid grid-cols-7 gap-4 mb-2 px-2">
        {days.map((day) => (
          <div key={day} className="text-sm font-medium text-center truncate">
            {day}
          </div>
        ))}
      </div>
    )
    
    let currentWeek = []
    const firstWeekDay = firstDay.getDay() || 7
    
    for (let i = 1; i < firstWeekDay; i++) {
      currentWeek.push(<div key={`empty-${i}`} className="h-24 bg-gray-50 rounded-lg" />)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      const record = attendanceRecords.find(r => r.date.toDateString() === date.toDateString())
      const dayOfWeek = date.getDay()
      
      currentWeek.push(
        <div
          key={day}
          className={cn(
            "h-24 p-2 rounded-lg",
            record?.status === 'present' && "bg-green-400",
            record?.status === 'absent' && "bg-red-700",
            record?.status === 'leave' && "bg-purple-400",
            record?.status === 'holiday' && "bg-blue-50",
            record?.status === 'half-day' && "bg-orange-400",
            record?.status === 'approved' && "bg-yellow-300",
            !record && dayOfWeek !== 0 && "bg-gray-50"
          )}
        >
          <div className="text-lg font-semibold mb-1">{day}</div>
          {record && (
            <div className="text-xs font-medium">
              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              {record.checkInTime && ` - ${record.checkInTime}`}
            </div>
          )}
        </div>
      )
      
      if (currentWeek.length === 7) {
        calendar.push(
          <div key={`week-${day}`} className="grid grid-cols-7 gap-4 mb-2">
            {currentWeek}
          </div>
        )
        currentWeek = []
      }
    }
    
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(<div key={`empty-end-${currentWeek.length}`} className="h-24 bg-gray-50 rounded-lg" />)
      }
      calendar.push(
        <div key="last-week" className="grid grid-cols-7 gap-4 mb-2">
          {currentWeek}
        </div>
      )
    }
    
    return calendar
  }

  const calculateLeaveStats = () => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth()

    const leaveStats = attendanceRecords.reduce((acc, record) => {
      if (record.date.getFullYear() === currentYear) {
        if (record.status === 'leave') {
          acc.leavesYear++
          if (record.date.getMonth() === currentMonth) {
            acc.leavesMonth++
          }
        } else if (record.status === 'half-day') {
          acc.halfDaysYear++
          if (record.date.getMonth() === currentMonth) {
            acc.halfDaysMonth++
          }
        }
      }
      return acc
    }, { leavesMonth: 0, leavesYear: 0, halfDaysMonth: 0, halfDaysYear: 0 })

    return leaveStats
  }

  const leaveStats = calculateLeaveStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          onClick={handleCheckIn} 
          disabled={isCheckedIn}
          className="bg-green-500 hover:bg-green-600"
        >
          <UserCheck className="mr-2 h-4 w-4" /> Check In
        </Button>
        <Button 
          onClick={handleCheckOut} 
          disabled={!isCheckedIn}
          className="bg-red-500 hover:bg-red-600"
        >
          <UserMinus className="mr-2 h-4 w-4" /> Check Out
        </Button>
      </div>

      <div className="space-y-4">
        {renderCalendar()}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Total Leaves Available</div>
              <div className="text-2xl font-bold text-green-600">18 Days</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Pending Leaves</div>
              <div className="text-2xl font-bold text-blue-600">3 Days</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Leaves Availed</div>
              <div className="text-md font-bold">
                Month: {leaveStats.leavesMonth} | Year: {leaveStats.leavesYear}
              </div>
              <div className="text-sm font-medium mt-2">Half Days Availed</div>
              <div className="text-md font-bold">
                Month: {leaveStats.halfDaysMonth} | Year: {leaveStats.halfDaysYear}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

