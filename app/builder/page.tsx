'use client'

import { useState } from 'react'
import { BuilderSidebar } from '@/components/builder/builder-sidebar'
import { BuilderPreview } from '@/components/builder/builder-preview'
import { BuilderHeader } from '@/components/builder/builder-header'
import { useAutoSave } from '@/hooks/use-auto-save'

export default function BuilderPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { isDirty } = useAutoSave({ enabled: true })

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <BuilderHeader isDirty={isDirty} />

      {/* Main Content: Sidebar + Preview */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Form Editor */}
        <BuilderSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Right Side - Resume Preview */}
        <BuilderPreview />
      </div>
    </div>
  )
}
