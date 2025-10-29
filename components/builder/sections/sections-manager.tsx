'use client'

import { useResumeStore } from '@/lib/store/resume-store'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SectionType } from '@/types/resume'

export function SectionsManager() {
  const sections = useResumeStore((state) => state.resumeData.sections)
  const addSection = useResumeStore((state) => state.addSection)

  const sectionTypes: { type: SectionType; label: string }[] = [
    { type: 'experience', label: 'Work Experience' },
    { type: 'education', label: 'Education' },
    { type: 'projects', label: 'Projects' },
    { type: 'skills', label: 'Skills' },
    { type: 'certifications', label: 'Certifications' },
    { type: 'awards', label: 'Awards' },
    { type: 'languages', label: 'Languages' },
    { type: 'interests', label: 'Interests' },
    { type: 'publications', label: 'Publications' },
    { type: 'volunteer', label: 'Volunteer' },
    { type: 'custom', label: 'Custom Section' },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <h3 className="mb-3 font-medium">Current Sections</h3>
        {sections.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sections added yet.</p>
        ) : (
          <div className="space-y-2">
            {sections.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between rounded border p-2"
              >
                <span className="text-sm">{section.title}</span>
                <span className="text-xs text-muted-foreground">
                  {section.items.length} items
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Add Section</h3>
        <div className="grid grid-cols-2 gap-2">
          {sectionTypes.map((type) => (
            <Button
              key={type.type}
              variant="outline"
              size="sm"
              onClick={() => addSection(type.type)}
              className="gap-2 justify-start"
            >
              <Plus className="h-3 w-3" />
              {type.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
