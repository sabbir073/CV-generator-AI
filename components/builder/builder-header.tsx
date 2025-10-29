'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Download,
  Sparkles,
  FileUp,
  Settings,
  Save,
  Home,
  Loader2,
  RotateCcw
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'
import { useResumeStore } from '@/lib/store/resume-store'
import { AIImproveDialog } from './ai-improve-dialog'
import { SettingsDialog } from './settings-dialog'
import { toast } from 'sonner'

interface BuilderHeaderProps {
  isDirty: boolean
}

export function BuilderHeader({ isDirty }: BuilderHeaderProps) {
  const router = useRouter()
  const [isExporting, setIsExporting] = useState(false)
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const resumeData = useResumeStore((state) => state.resumeData)
  const selectedTemplateId = useResumeStore((state) => state.selectedTemplateId)
  const resetResume = useResumeStore((state) => state.resetResume)

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      // Get the resume preview HTML
      const previewElement = document.getElementById('resume-preview')
      if (!previewElement) {
        toast.error('Resume preview not found')
        return
      }

      // Get all stylesheets from the page
      const styleSheets = Array.from(document.styleSheets)
      let allStyles = ''

      try {
        styleSheets.forEach((styleSheet) => {
          try {
            if (styleSheet.cssRules) {
              Array.from(styleSheet.cssRules).forEach((rule) => {
                allStyles += rule.cssText + '\n'
              })
            }
          } catch (e) {
            // Skip external stylesheets that can't be accessed due to CORS
            console.warn('Could not access stylesheet:', e)
          }
        })
      } catch (e) {
        console.warn('Error extracting styles:', e)
      }

      // Get CSS variables from the resume theme wrapper
      const themeWrapper = previewElement.closest('.resume-theme-wrapper')
      const computedStyle = themeWrapper ? window.getComputedStyle(themeWrapper) : null

      // Extract CSS variables (colors, typography, spacing)
      const cssVariables = computedStyle ? {
        // Colors
        '--resume-primary': computedStyle.getPropertyValue('--resume-primary'),
        '--resume-secondary': computedStyle.getPropertyValue('--resume-secondary'),
        '--resume-accent': computedStyle.getPropertyValue('--resume-accent'),
        '--resume-background': computedStyle.getPropertyValue('--resume-background'),
        '--resume-sidebar-bg': computedStyle.getPropertyValue('--resume-sidebar-bg'),
        '--resume-header-bg': computedStyle.getPropertyValue('--resume-header-bg'),
        '--resume-text-primary': computedStyle.getPropertyValue('--resume-text-primary'),
        '--resume-text-secondary': computedStyle.getPropertyValue('--resume-text-secondary'),
        '--resume-text-light': computedStyle.getPropertyValue('--resume-text-light'),
        '--resume-border': computedStyle.getPropertyValue('--resume-border'),
        '--resume-divider': computedStyle.getPropertyValue('--resume-divider'),
        '--resume-heading': computedStyle.getPropertyValue('--resume-heading'),
        '--resume-link': computedStyle.getPropertyValue('--resume-link'),
        '--resume-icon': computedStyle.getPropertyValue('--resume-icon'),
        // Typography
        '--resume-font-family': computedStyle.getPropertyValue('--resume-font-family'),
        '--resume-heading-size': computedStyle.getPropertyValue('--resume-heading-size'),
        '--resume-subheading-size': computedStyle.getPropertyValue('--resume-subheading-size'),
        '--resume-body-size': computedStyle.getPropertyValue('--resume-body-size'),
        '--resume-small-size': computedStyle.getPropertyValue('--resume-small-size'),
        '--resume-line-height': computedStyle.getPropertyValue('--resume-line-height'),
        '--resume-letter-spacing': computedStyle.getPropertyValue('--resume-letter-spacing'),
        // Spacing
        '--resume-section-spacing': computedStyle.getPropertyValue('--resume-section-spacing'),
        '--resume-item-spacing': computedStyle.getPropertyValue('--resume-item-spacing'),
        '--resume-padding': computedStyle.getPropertyValue('--resume-padding'),
      } : {}

      const cssVarsString = Object.entries(cssVariables)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}: ${value};`)
        .join('\n    ')

      // Get the full HTML with all styles
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      print-color-adjust: exact !important;
      -webkit-print-color-adjust: exact !important;
    }

    /* CSS Variables from theme */
    :root {
      ${cssVarsString}
    }

    body {
      font-family: var(--resume-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif);
      letter-spacing: var(--resume-letter-spacing, 0px);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      margin: 0;
      padding: 0;
    }

    /* Page break settings - First page: no top margin, other pages: normal margins */
    @page {
      margin: 10mm 8mm 10mm 8mm; /* top, right, bottom, left - reduced side margins */
      size: A4 portrait;
    }

    @page :first {
      margin-top: 0; /* No top margin on first page */
      margin-bottom: 10mm; /* Footer margin on first page */
      margin-left: 8mm; /* Less side margin */
      margin-right: 8mm; /* Less side margin */
    }

    /* Prevent page breaks inside important elements */
    .break-inside-avoid {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    /* TYPOGRAPHY - Apply to all templates */
    h1, .text-5xl, .text-4xl, .text-3xl {
      font-size: var(--resume-heading-size, 24px) !important;
      line-height: var(--resume-line-height, 1.5) !important;
    }

    h2, .text-2xl, .text-xl {
      font-size: var(--resume-subheading-size, 18px) !important;
      line-height: var(--resume-line-height, 1.5) !important;
    }

    h3, .text-lg {
      font-size: calc(var(--resume-body-size, 14px) * 1.1) !important;
      line-height: var(--resume-line-height, 1.5) !important;
    }

    p, .text-base {
      font-size: var(--resume-body-size, 14px) !important;
      line-height: var(--resume-line-height, 1.5) !important;
    }

    .text-sm {
      font-size: calc(var(--resume-body-size, 14px) * 0.9) !important;
    }

    .text-xs {
      font-size: var(--resume-small-size, 12px) !important;
    }

    /* SPACING - Apply to all templates */
    section, .mb-12, .mb-10, .mb-8, .mb-6 {
      margin-bottom: var(--resume-section-spacing, 24px) !important;
    }

    .space-y-8 > * + *, .space-y-6 > * + *, .space-y-4 > * + * {
      margin-top: var(--resume-item-spacing, 12px) !important;
    }

    .p-16, .p-12, .p-8 {
      padding: var(--resume-padding, 16px) !important;
    }

    .px-16, .px-12, .px-8 {
      padding-left: var(--resume-padding, 16px) !important;
      padding-right: var(--resume-padding, 16px) !important;
    }

    .py-16, .py-12, .py-8 {
      padding-top: var(--resume-padding, 16px) !important;
      padding-bottom: var(--resume-padding, 16px) !important;
    }

    /* Theme overrides for templates - Comprehensive color mapping */

    /* PRIMARY COLORS */
    .bg-blue-600, .bg-blue-500, .bg-indigo-600, .bg-indigo-500, .bg-purple-600, .bg-purple-500,
    .bg-teal-600, .bg-teal-500, .bg-green-600, .bg-green-500, .bg-emerald-600, .bg-emerald-500 {
      background-color: var(--resume-primary) !important;
    }
    .text-blue-600, .text-blue-500, .text-indigo-600, .text-indigo-500, .text-purple-600, .text-purple-500,
    .text-teal-600, .text-teal-500, .text-green-600, .text-green-500, .text-emerald-600, .text-emerald-500 {
      color: var(--resume-primary) !important;
    }

    /* SECONDARY COLORS */
    .bg-blue-400, .bg-blue-300, .bg-indigo-400, .bg-indigo-300, .bg-purple-400, .bg-purple-300,
    .bg-teal-400, .bg-teal-300, .bg-green-400, .bg-green-300 {
      background-color: var(--resume-secondary) !important;
    }
    .text-blue-400, .text-blue-300, .text-indigo-400, .text-indigo-300, .text-purple-400, .text-purple-300,
    .text-teal-400, .text-teal-300 {
      color: var(--resume-secondary) !important;
    }

    /* ACCENT COLORS (amber, orange, yellow) */
    .bg-amber-600, .bg-amber-500, .bg-amber-400, .bg-orange-600, .bg-orange-500, .bg-orange-400,
    .bg-yellow-600, .bg-yellow-500, .bg-yellow-400 {
      background-color: var(--resume-accent) !important;
    }
    .text-amber-600, .text-amber-500, .text-amber-400, .text-orange-600, .text-orange-500, .text-orange-400,
    .text-yellow-600, .text-yellow-500 {
      color: var(--resume-accent) !important;
    }
    .border-amber-600, .border-amber-500, .border-amber-400, .border-orange-500, .border-yellow-500 {
      border-color: var(--resume-accent) !important;
    }

    /* LIGHT BACKGROUNDS */
    .bg-gray-50, .bg-gray-100, .bg-slate-50, .bg-slate-100, .bg-blue-50, .bg-indigo-50 {
      background-color: var(--resume-header-bg) !important;
    }

    /* DARK BACKGROUNDS */
    .bg-gray-900, .bg-gray-800, .bg-gray-700, .bg-slate-900, .bg-slate-800,
    .bg-blue-900, .bg-blue-800, .bg-indigo-900, .bg-indigo-800 {
      background-color: var(--resume-sidebar-bg) !important;
    }

    /* TEXT COLORS */
    .text-gray-900, .text-gray-800, .text-black, .text-slate-900 { color: var(--resume-heading) !important; }
    .text-gray-700, .text-slate-700 { color: var(--resume-text-primary) !important; }
    .text-gray-600, .text-gray-500, .text-gray-400, .text-slate-600, .text-slate-500 {
      color: var(--resume-text-secondary) !important;
    }
    .text-white, .text-gray-50, .text-gray-100 { color: var(--resume-text-light) !important; }

    /* BORDERS */
    .border-gray-200, .border-gray-300, .border-slate-200, .border-slate-300 {
      border-color: var(--resume-border) !important;
    }
    .border-t-gray-200, .border-t-gray-300, .border-b-gray-200, .border-b-gray-300 {
      border-top-color: var(--resume-divider) !important;
      border-bottom-color: var(--resume-divider) !important;
    }

    /* LINKS */
    a { color: var(--resume-link) !important; }

    /* PAGE BACKGROUND */
    .bg-white { background-color: var(--resume-background) !important; }

    /* GRADIENTS */
    .bg-gradient-to-r, .bg-gradient-to-b, .bg-gradient-to-br {
      background-image: none !important;
      background-color: var(--resume-sidebar-bg) !important;
    }

    /* Extracted styles from Tailwind and other sources */
    ${allStyles}
  </style>
</head>
<body>
  ${previewElement.innerHTML}
</body>
</html>
`

      const response = await fetch('/api/export/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html,
          pageSize: resumeData.metadata?.pageSize || 'A4'
        }),
      })

      if (!response.ok) {
        throw new Error('PDF generation failed')
      }

      // Download the PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${resumeData.basics.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('PDF exported successfully!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleAIImprove = () => {
    setIsAIDialogOpen(true)
  }

  const handleImportPDF = () => {
    router.push('/import')
  }

  const handleResetClick = () => {
    setResetDialogOpen(true)
  }

  const handleResetConfirm = () => {
    resetResume()
    toast.success('Resume reset to default data successfully!')
    setResetDialogOpen(false)
  }

  return (
    <>
      <AIImproveDialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen} />

      <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your current data and reset the resume to default sample data.
              This action cannot be undone. Make sure you have exported your current resume if you want to keep it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <header className="border-b bg-card px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Resume Builder</h1>
          </Link>
          {isDirty && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Save className="h-3 w-3" />
              <span>Saving...</span>
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportPDF}
            className="gap-2"
          >
            <FileUp className="h-4 w-4" />
            Import PDF
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleAIImprove}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            AI Improve
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleResetClick}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={handleExportPDF}
            disabled={isExporting}
            className="gap-2"
          >
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export PDF
              </>
            )}
          </Button>

          <SettingsDialog>
            <Button variant="ghost" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
            </Button>
          </SettingsDialog>
        </div>
      </div>
    </header>
    </>
  )
}
