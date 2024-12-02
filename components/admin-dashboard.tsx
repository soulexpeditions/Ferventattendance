'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LeaveRequest {
  id: number
  employeeName: string
  type: string
  startDate: string
  endDate: string
  status: 'pending' | 'approved' | 'rejected'
}

export function AdminDashboard() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Fetch leave requests here
    // This is a placeholder for demonstration
    setLeaveRequests([
      { id: 1, employeeName: 'John Doe', type: 'Vacation', startDate: '2023-06-15', endDate: '2023-06-20', status: 'pending' },
      { id: 2, employeeName: 'Jane Smith', type: 'Sick Leave', startDate: '2023-06-10', endDate: '2023-06-11', status: 'approved' },
      { id: 3, employeeName: 'Bob Johnson', type: 'Personal Day', startDate: '2023-06-22', endDate: '2023-06-22', status: 'rejected' },
    ])
  }, [])

  const handleApprove = (id: number) => {
    setLeaveRequests(leaveRequests.map(request =>
      request.id === id ? { ...request, status: 'approved' } : request
    ))
  }

  const handleReject = (id: number) => {
    setLeaveRequests(leaveRequests.map(request =>
      request.id === id ? { ...request, status: 'rejected' } : request
    ))
  }

  const filteredRequests = leaveRequests.filter(request => 
    filter === 'all' || request.status === filter
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map(request => (
              <TableRow key={request.id}>
                <TableCell>{request.employeeName}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>
                  {request.status === 'pending' && (
                    <>
                      <Button onClick={() => handleApprove(request.id)} className="mr-2">Approve</Button>
                      <Button onClick={() => handleReject(request.id)} variant="destructive">Reject</Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

