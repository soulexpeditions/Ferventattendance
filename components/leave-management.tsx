'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LeaveManagementProps {
  setAlert: (message: string) => void
}

export function LeaveManagement({ setAlert }: LeaveManagementProps) {
  const [leaveType, setLeaveType] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (leaveType && startDate) {
      const effectiveEndDate = leaveType === 'half-day' ? startDate : endDate
      setAlert(`Leave request submitted: ${leaveType} from ${startDate} to ${effectiveEndDate}`)
      setLeaveType('')
      setStartDate('')
      setEndDate('')
    } else {
      setAlert('Please fill in all required fields')
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="leave-type">Leave Type</Label>
              <Select value={leaveType} onValueChange={setLeaveType}>
                <SelectTrigger id="leave-type">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="family">Family Emergency</SelectItem>
                  <SelectItem value="vacation">Vacation</SelectItem>
                  <SelectItem value="parental">Maternity/Paternity Leave</SelectItem>
                  <SelectItem value="bereavement">Bereavement Leave</SelectItem>
                  <SelectItem value="study">Study Leave</SelectItem>
                  <SelectItem value="personal">Personal Day</SelectItem>
                  <SelectItem value="half-day">Half Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={leaveType === 'half-day' ? startDate : endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={leaveType === 'half-day'}
              />
            </div>
            <Button type="submit" className="w-full">Submit Leave Request</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Total Leaves</h3>
              <p className="text-2xl font-bold text-green-600">18 Days</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Pending Leaves</h3>
              <p className="text-2xl font-bold text-blue-600">12 Days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

