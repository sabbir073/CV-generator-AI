import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Sparkles, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Resume Builder</h1>
          </div>
          <Link href="/builder">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Build Your Perfect Resume with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Power
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create professional resumes in minutes. Privacy-first, no account required.
              Powered by Claude AI for intelligent optimization.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/builder">
              <Button size="lg" className="gap-2">
                <FileText className="h-5 w-5" />
                Start Building
              </Button>
            </Link>
            <Link href="/import">
              <Button size="lg" variant="outline" className="gap-2">
                <Sparkles className="h-5 w-5" />
                Import Existing Resume
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2 rounded-lg border bg-card p-6">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h3 className="font-semibold">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Optimize your resume for specific jobs with Claude AI
              </p>
            </div>
            <div className="space-y-2 rounded-lg border bg-card p-6">
              <Shield className="h-8 w-8 text-green-600" />
              <h3 className="font-semibold">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                No database, no account. Your data stays with you
              </p>
            </div>
            <div className="space-y-2 rounded-lg border bg-card p-6">
              <FileText className="h-8 w-8 text-purple-600" />
              <h3 className="font-semibold">5 Templates</h3>
              <p className="text-sm text-muted-foreground">
                Choose from modern, classic, minimal, creative, or ATS-friendly
              </p>
            </div>
            <div className="space-y-2 rounded-lg border bg-card p-6">
              <Zap className="h-8 w-8 text-orange-600" />
              <h3 className="font-semibold">Instant Export</h3>
              <p className="text-sm text-muted-foreground">
                Download high-quality PDF resumes instantly
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 Resume Builder. Built with Next.js and Claude AI.
        </div>
      </footer>
    </div>
  )
}
