'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from 'lucide-react'

interface EmployeeProfileProps {
  setAlert: (message: string) => void
}

interface EmployeeData {
  firstName: string
  lastName: string
  workEmail: string
  personalEmail: string
  phone: string
  dateOfBirth: string
  bloodGroup: string
  localAddress: string
  permanentAddress: string
  department: string
  position: string
  joinDate: string
}

type UserRole = 'employee' | 'admin' | 'superadmin'

export function EmployeeProfile({ setAlert }: EmployeeProfileProps) {
  const [isFirstLogin, setIsFirstLogin] = useState(true)
  const [userRole, setUserRole] = useState<UserRole>('employee')
  const [profile, setProfile] = useState<EmployeeData>({
    firstName: '',
    lastName: '',
    workEmail: '',
    personalEmail: '',
    phone: '',
    dateOfBirth: '',
    bloodGroup: '',
    localAddress: '',
    permanentAddress: '',
    department: '',
    position: '',
    joinDate: ''
  })

  useEffect(() => {
    // Simulating API call to get user data
    // In a real application, you would fetch this data from your backend
    setTimeout(() => {
      setProfile({
        firstName: 'John',
        lastName: 'Doe',
        workEmail: 'john.doe@company.com',
        personalEmail: '',
        phone: '',
        dateOfBirth: '',
        bloodGroup: '',
        localAddress: '',
        permanentAddress: '',
        department: 'IT',
        position: 'Software Developer',
        joinDate: '2023-01-01'
      })
      setIsFirstLogin(false) // Set to true for testing first login scenario
      setUserRole('employee') // Set to 'admin' or 'superadmin' for testing those roles
    }, 1000)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile)
    setAlert('Profile updated successfully')
    if (isFirstLogin) {
      setIsFirstLogin(false)
    }
  }

  const handleFileUpload = (documentType: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf') {
        // Here you would typically upload the file to your server
        console.log(`Uploading ${documentType}:`, file.name)
        setAlert(`${documentType} uploaded successfully`)
      } else {
        setAlert('Please upload a PDF file')
      }
    }
  }

  const canEdit = isFirstLogin || userRole === 'admin' || userRole === 'superadmin'

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                disabled={!canEdit}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                disabled={!canEdit}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="workEmail">Work Email</Label>
            <Input
              id="workEmail"
              name="workEmail"
              type="email"
              value={profile.workEmail}
              onChange={handleInputChange}
              disabled={!canEdit}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalEmail">Personal Email</Label>
            <Input
              id="personalEmail"
              name="personalEmail"
              type="email"
              value={profile.personalEmail}
              onChange={handleInputChange}
              disabled={!canEdit}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              disabled={!canEdit}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={profile.dateOfBirth}
              onChange={handleInputChange}
              disabled={!canEdit}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <Input
              id="bloodGroup"
              name="bloodGroup"
              value={profile.bloodGroup}
              onChange={handleInputChange}
              disabled={!canEdit}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="localAddress">Local Address</Label>
            <Textarea
              id="localAddress"
              name="localAddress"
              value={profile.localAddress}
              onChange={handleInputChange}
              disabled={!canEdit}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="permanentAddress">Permanent Address</Label>
            <Textarea
              id="permanentAddress"
              name="permanentAddress"
              value={profile.permanentAddress}
              onChange={handleInputChange}
              disabled={!canEdit}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              name="department"
              value={profile.department}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              value={profile.position}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="joinDate">Join Date</Label>
            <Input
              id="joinDate"
              name="joinDate"
              type="date"
              value={profile.joinDate}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
          {canEdit && (
            <Button type="submit" className="w-full">
              {isFirstLogin ? 'Complete Profile' : 'Update Profile'}
            </Button>
          )}
          {!canEdit && (
            <p className="text-sm text-muted-foreground text-center">
              Contact an administrator to update your profile information.
            </p>
          )}
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
          <div className="space-y-4">
            {['PAN Card', 'Aadhaar Card', 'Cancelled Cheque', 'Passport (First and Last Page)'].map((doc) => (
              <div key={doc} className="flex items-center justify-between">
                <span>{doc}</span>
                <label htmlFor={`upload-${doc.toLowerCase().replace(/\s+/g, '-')}`} className="cursor-pointer">
                  <Input
                    id={`upload-${doc.toLowerCase().replace(/\s+/g, '-')}`}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload(doc)}
                  />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload PDF
                  </Button>
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

