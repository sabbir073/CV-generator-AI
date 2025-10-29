'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useResumeStore } from '@/lib/store/resume-store'

export default function ImportPage() {
  const router = useRouter()
  const loadResumeData = useResumeStore((state) => state.loadResumeData)

  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [extractedPreview, setExtractedPreview] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setUploadStatus('idle')
      setErrorMessage('')
      setExtractedPreview('')
    } else {
      setErrorMessage('Please select a valid PDF file')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadStatus('idle')
    setErrorMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/parse/pdf', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to parse PDF')
      }

      // Load the parsed data into the store
      loadResumeData(result.data)
      setExtractedPreview(result.extractedText || '')
      setUploadStatus('success')

      // Redirect to builder after 2 seconds
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to upload PDF')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Import Resume from PDF</h1>
          <p className="text-muted-foreground">
            Upload your existing resume and we'll extract the information using AI
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload PDF Resume</CardTitle>
            <CardDescription>
              Select a PDF file to import. Our AI will parse and structure your resume data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload Area */}
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 transition-colors hover:border-muted-foreground/50">
              <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-sm font-medium text-primary hover:underline">
                  Choose a PDF file
                </span>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="mt-2 text-xs text-muted-foreground">
                PDF files only, max 10MB
              </p>
            </div>

            {/* Selected File */}
            {file && (
              <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
                <FileText className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                {uploadStatus === 'idle' && (
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="min-w-[120px]"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Parsing...
                      </>
                    ) : (
                      'Import Resume'
                    )}
                  </Button>
                )}
              </div>
            )}

            {/* Success Status */}
            {uploadStatus === 'success' && (
              <div className="flex items-center gap-3 rounded-lg border border-green-500 bg-green-50 p-4 dark:bg-green-950">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                <div className="flex-1">
                  <p className="font-medium text-green-900 dark:text-green-100">
                    Resume imported successfully!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Redirecting to builder...
                  </p>
                </div>
              </div>
            )}

            {/* Error Status */}
            {uploadStatus === 'error' && (
              <div className="flex items-center gap-3 rounded-lg border border-red-500 bg-red-50 p-4 dark:bg-red-950">
                <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                <div className="flex-1">
                  <p className="font-medium text-red-900 dark:text-red-100">
                    Failed to import resume
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {errorMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Extracted Preview */}
            {extractedPreview && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <p className="mb-2 text-sm font-medium">Extracted Text Preview:</p>
                <p className="text-xs text-muted-foreground">{extractedPreview}...</p>
              </div>
            )}

            {/* Back Button */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => router.push('/')}>
                Back to Builder
              </Button>
              {uploadStatus === 'idle' && file && !isUploading && (
                <Button variant="ghost" onClick={() => setFile(null)}>
                  Clear File
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-8 rounded-lg border bg-card p-6">
          <h3 className="mb-3 font-semibold">How it works</h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Upload your resume in PDF format</li>
            <li>2. Our AI extracts text and identifies sections</li>
            <li>3. Data is parsed into a structured format</li>
            <li>4. You can edit and customize the imported data</li>
            <li>5. Export with your preferred template</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
