'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BasicsForm } from './forms/basics-form'
import { SectionsManager } from './sections/sections-manager'
import { SectionEditor } from './sections/section-editor'
import { TemplateSelector } from './template-selector'
import { StyleCustomizer } from './style-customizer'

interface BuilderSidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

export function BuilderSidebar({ collapsed, onToggleCollapse }: BuilderSidebarProps) {
  const [activeTab, setActiveTab] = useState('content')

  if (collapsed) {
    return (
      <div className="relative border-r bg-card">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="absolute right-0 top-4 translate-x-1/2 rounded-full shadow-md"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="flex h-full w-12 flex-col items-center gap-4 py-4">
          {/* Collapsed state - just icons */}
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-screen w-[420px] flex-col border-r bg-card">
      {/* Collapse Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleCollapse}
        className="absolute right-0 top-4 z-10 translate-x-1/2 rounded-full shadow-md"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
        <div className="shrink-0 border-b px-4 pt-4 pb-0">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
          </TabsList>
        </div>

        {/* Content Tab - Basic Info */}
        <TabsContent value="content" className="m-0 flex-1 overflow-y-auto data-[state=active]:flex data-[state=active]:flex-col">
          <div className="p-4 pb-24">
            <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
            <BasicsForm />
          </div>
        </TabsContent>

        {/* Edit Tab - Edit Section Items */}
        <TabsContent value="edit" className="m-0 flex-1 overflow-y-auto data-[state=active]:flex data-[state=active]:flex-col">
          <div className="p-4 pb-24">
            <h2 className="mb-4 text-lg font-semibold">Edit Sections</h2>
            <SectionEditor />
          </div>
        </TabsContent>

        {/* Sections Tab - Manage Sections */}
        <TabsContent value="sections" className="m-0 flex-1 overflow-y-auto data-[state=active]:flex data-[state=active]:flex-col">
          <div className="p-4 pb-24">
            <h2 className="mb-4 text-lg font-semibold">Resume Sections</h2>
            <SectionsManager />
          </div>
        </TabsContent>

        {/* Style Tab - Comprehensive Styling */}
        <TabsContent value="style" className="m-0 flex-1 overflow-y-auto data-[state=active]:flex data-[state=active]:flex-col">
          <div className="p-4 pb-24">
            <h2 className="mb-4 text-lg font-semibold">Style Customization</h2>
            <StyleCustomizer />
          </div>
        </TabsContent>

        {/* Template Tab - Choose Template */}
        <TabsContent value="template" className="m-0 flex-1 overflow-y-auto data-[state=active]:flex data-[state=active]:flex-col">
          <div className="p-4 pb-24">
            <h2 className="mb-4 text-lg font-semibold">Choose Template</h2>
            <TemplateSelector />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
