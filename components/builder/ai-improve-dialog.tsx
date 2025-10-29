'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store/resume-store'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

interface AIImproveDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AIImproveDialog({ open, onOpenChange }: AIImproveDialogProps) {
  const resumeData = useResumeStore((state) => state.resumeData)
  const loadResumeData = useResumeStore((state) => state.loadResumeData)

  const [jobDescription, setJobDescription] = useState('')
  const [isImproving, setIsImproving] = useState(false)
  const [error, setError] = useState('')
  const [improvedData, setImprovedData] = useState<any>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleImprove = async () => {
    setIsImproving(true)
    setError('')

    try {
      const response = await fetch('/api/ai/improve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          jobDescription: jobDescription || undefined,
          improvementType: 'optimize',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to improve resume')
      }

      const result = await response.json()

      // Store the improved data and show confirmation screen
      setImprovedData(result.improvedData)
      setSuggestions(result.suggestions || [])
      setShowConfirmation(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error(err instanceof Error ? err.message : 'Failed to improve resume')
    } finally {
      setIsImproving(false)
    }
  }

  const handleApplyChanges = () => {
    if (improvedData) {
      loadResumeData(improvedData)
      toast.success('AI improvements applied successfully!')
      onOpenChange(false)
      // Reset state
      setShowConfirmation(false)
      setImprovedData(null)
      setSuggestions([])
      setJobDescription('')
    }
  }

  const handleReject = () => {
    setShowConfirmation(false)
    setImprovedData(null)
    setSuggestions([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {!showConfirmation ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Improve Resume with AI
              </DialogTitle>
              <DialogDescription>
                Let Claude AI optimize your resume for maximum impact. Optionally provide a job
                description to tailor your resume for a specific role.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-description">
                  Job Description (Optional)
                </Label>
                <Textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here to tailor your resume for this specific role..."
                  rows={8}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Providing a job description helps AI tailor your resume to match the role's requirements.
                </p>
              </div>

              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isImproving}
                >
                  Cancel
                </Button>
                <Button onClick={handleImprove} disabled={isImproving} className="gap-2">
                  {isImproving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Improving...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Improve Resume
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                AI Improvements Ready
              </DialogTitle>
              <DialogDescription>
                Your resume has been optimized! Review the suggestions below.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {suggestions.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">AI Suggestions:</h4>
                  <ul className="space-y-2">
                    {suggestions.slice(0, 5).map((suggestion, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <span className="text-primary">•</span>
                        <span className="text-muted-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Your resume has been optimized for better impact and clarity.
                </p>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleReject}>
                  Reject Changes
                </Button>
                <Button onClick={handleApplyChanges} className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Apply Changes
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
