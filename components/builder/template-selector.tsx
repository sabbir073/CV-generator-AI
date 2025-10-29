'use client'

import { useResumeStore } from '@/lib/store/resume-store'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'

const templates = [
  // WITH PROFILE PHOTO
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    description: 'Dark sidebar with photo, gold accents',
    category: 'with-photo' as const,
  },
  {
    id: 'creative-portfolio',
    name: 'Creative Portfolio',
    description: 'Circular photo, colorful sections',
    category: 'with-photo' as const,
  },
  {
    id: 'modern-professional-plus',
    name: 'Modern Professional Plus',
    description: 'Top banner with photo, teal accents',
    category: 'with-photo' as const,
  },
  {
    id: 'designer-showcase',
    name: 'Designer Showcase',
    description: 'Large photo header, grid layout',
    category: 'with-photo' as const,
  },
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    description: 'Geometric photo, blue tech theme',
    category: 'with-photo' as const,
  },
  {
    id: 'corporate-excellence',
    name: 'Corporate Excellence',
    description: 'Professional headshot, navy/gray',
    category: 'with-photo' as const,
  },
  {
    id: 'minimalist-portrait',
    name: 'Minimalist Portrait',
    description: 'Simple photo, maximum white space',
    category: 'with-photo' as const,
  },
  {
    id: 'bold-statement',
    name: 'Bold Statement',
    description: 'Oversized photo, bold typography',
    category: 'with-photo' as const,
  },
  {
    id: 'elegant-classic',
    name: 'Elegant Classic',
    description: 'Circular photo, serif fonts, timeless',
    category: 'with-photo' as const,
  },
  {
    id: 'dynamic-professional',
    name: 'Dynamic Professional',
    description: 'Angular photo, energetic design',
    category: 'with-photo' as const,
  },

  // WITHOUT PROFILE PHOTO
  {
    id: 'ultra-minimal',
    name: 'Ultra Minimal',
    description: 'Maximum white space, gray/black',
    category: 'without-photo' as const,
  },
  {
    id: 'geometric-modern',
    name: 'Geometric Modern',
    description: 'Geometric shapes, teal accents',
    category: 'without-photo' as const,
  },
  {
    id: 'timeline-cv',
    name: 'Timeline CV',
    description: 'Vertical timeline, purple accents',
    category: 'without-photo' as const,
  },
  {
    id: 'split-column',
    name: 'Split Column',
    description: 'Two equal columns, green accents',
    category: 'without-photo' as const,
  },
  {
    id: 'gradient-header',
    name: 'Gradient Header',
    description: 'Large gradient header, modern',
    category: 'without-photo' as const,
  },
  {
    id: 'sidebar-accent',
    name: 'Sidebar Accent',
    description: 'Colored sidebar, coral theme',
    category: 'without-photo' as const,
  },
  {
    id: 'boxed-sections',
    name: 'Boxed Sections',
    description: 'Each section in colored box',
    category: 'without-photo' as const,
  },
  {
    id: 'modern-lines',
    name: 'Modern Lines',
    description: 'Horizontal lines, navy theme',
    category: 'without-photo' as const,
  },
  {
    id: 'minimalist-grid',
    name: 'Minimalist Grid',
    description: 'Grid-based layout, yellow accents',
    category: 'without-photo' as const,
  },
  {
    id: 'professional-clean',
    name: 'Professional Clean',
    description: 'Traditional modern, ATS-friendly',
    category: 'without-photo' as const,
  },

  // LEGACY TEMPLATES (original 5)
  {
    id: 'modern-professional',
    name: 'Modern Professional (Legacy)',
    description: 'Clean design with colorful accents',
    category: 'legacy' as const,
  },
  {
    id: 'classic-elegant-legacy',
    name: 'Classic Elegant (Legacy)',
    description: 'Traditional layout with serif fonts',
    category: 'legacy' as const,
  },
  {
    id: 'minimal',
    name: 'Minimal (Legacy)',
    description: 'Ultra-clean with lots of white space',
    category: 'legacy' as const,
  },
  {
    id: 'creative',
    name: 'Creative (Legacy)',
    description: 'Unique layout with bold typography',
    category: 'legacy' as const,
  },
  {
    id: 'ats-friendly',
    name: 'ATS Friendly (Legacy)',
    description: 'Simple, machine-readable format',
    category: 'legacy' as const,
  },
]

export function TemplateSelector() {
  const selectedTemplateId = useResumeStore((state) => state.selectedTemplateId)
  const setTemplate = useResumeStore((state) => state.setTemplate)

  const withPhotoTemplates = templates.filter((t) => t.category === 'with-photo')
  const withoutPhotoTemplates = templates.filter((t) => t.category === 'without-photo')
  const legacyTemplates = templates.filter((t) => t.category === 'legacy')

  return (
    <div className="space-y-6">
      {/* With Photo Section */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
            📸
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            With Profile Photo ({withPhotoTemplates.length})
          </h3>
        </div>
        <div className="space-y-2">
          {withPhotoTemplates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer p-3 transition-all hover:border-primary hover:shadow-md ${
                selectedTemplateId === template.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : ''
              }`}
              onClick={() => setTemplate(template.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                {selectedTemplateId === template.id && (
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Without Photo Section */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center text-white text-xs font-bold">
            📄
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Without Profile Photo ({withoutPhotoTemplates.length})
          </h3>
        </div>
        <div className="space-y-2">
          {withoutPhotoTemplates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer p-3 transition-all hover:border-primary hover:shadow-md ${
                selectedTemplateId === template.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : ''
              }`}
              onClick={() => setTemplate(template.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                {selectedTemplateId === template.id && (
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Legacy Templates Section */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold">
            ⭐
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            Legacy Templates ({legacyTemplates.length})
          </h3>
        </div>
        <div className="space-y-2">
          {legacyTemplates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer p-3 transition-all hover:border-primary hover:shadow-md ${
                selectedTemplateId === template.id
                  ? 'border-primary bg-primary/5 shadow-md'
                  : ''
              }`}
              onClick={() => setTemplate(template.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                {selectedTemplateId === template.id && (
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
