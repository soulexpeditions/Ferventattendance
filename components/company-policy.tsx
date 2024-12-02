'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileDown } from 'lucide-react'

interface CompanyPolicyProps {
  setAlert: (message: string) => void
}

export function CompanyPolicy({ setAlert }: CompanyPolicyProps) {
  const handleDownload = () => {
    // In a real application, this would be a real PDF URL
    const pdfUrl = '/company-policy.pdf'
    
    // Create a link element
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'company-policy.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setAlert('Company policy download started')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Company Policies and Guidelines</h2>
            <p className="text-muted-foreground mb-6">
              Our company policies outline the expectations, rules, and procedures that guide our work environment. 
              Please review these policies carefully and refer to them when needed.
            </p>
            <Button onClick={handleDownload} className="w-full sm:w-auto">
              <FileDown className="mr-2 h-4 w-4" /> Download Company Policy (PDF)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

