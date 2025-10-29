'use client'

import { useState } from 'react'
import { useResumeStore } from '@/lib/store/resume-store'
import { ResumeSection } from '@/types/resume'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { Trash2, Eye, EyeOff } from 'lucide-react'
import { ExperienceForm } from '../forms/experience-form'
import { EducationForm } from '../forms/education-form'
import { ProjectsForm } from '../forms/projects-form'
import { SkillsForm } from '../forms/skills-form'
import { GenericSectionForm } from '../forms/generic-section-form'
import { toast } from 'sonner'

export function SectionEditor() {
  const sections = useResumeStore((state) => state.resumeData.sections)
  const updateSection = useResumeStore((state) => state.updateSection)
  const removeSection = useResumeStore((state) => state.removeSection)
  const toggleSectionVisibility = useResumeStore((state) => state.toggleSectionVisibility)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [sectionToDelete, setSectionToDelete] = useState<string | null>(null)

  const visibleSections = sections.filter((s) => s.visible)

  const handleDeleteClick = (sectionId: string) => {
    setSectionToDelete(sectionId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (sectionToDelete) {
      removeSection(sectionToDelete)
      toast.success('Section deleted successfully')
      setSectionToDelete(null)
    }
    setDeleteDialogOpen(false)
  }

  if (visibleSections.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No sections added yet. Go to "Sections" tab to add sections.
        </p>
      </div>
    )
  }

  const renderSectionForm = (section: ResumeSection) => {
    switch (section.type) {
      case 'experience':
        return <ExperienceForm section={section} />
      case 'education':
        return <EducationForm section={section} />
      case 'projects':
        return <ProjectsForm section={section} />
      case 'skills':
        return <SkillsForm section={section} />
      case 'certifications':
      case 'awards':
      case 'languages':
      case 'interests':
      case 'publications':
      case 'volunteer':
      case 'custom':
        return <GenericSectionForm section={section} />
      default:
        return <GenericSectionForm section={section} />
    }
  }

  return (
    <>
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this section and all its content. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-4">
        <Tabs defaultValue={visibleSections[0]?.id} className="w-full">
          <TabsList className="w-full flex-wrap h-auto">
            {visibleSections.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="flex-1">
                {section.titleOverride || section.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {visibleSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-4">
              <Card className="p-4">
                {/* Section Header */}
                <div className="mb-4 space-y-4 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      {section.titleOverride || section.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSectionVisibility(section.id)}
                        className="gap-2"
                      >
                        {section.visible ? (
                          <>
                            <Eye className="h-4 w-4" />
                            Visible
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4" />
                            Hidden
                          </>
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteClick(section.id)}
                        className="gap-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* Custom Title */}
                  <div className="space-y-2">
                    <Label>Custom Section Title (Optional)</Label>
                    <Input
                      value={section.titleOverride || ''}
                      onChange={(e) =>
                        updateSection(section.id, { titleOverride: e.target.value })
                      }
                      placeholder={section.title}
                    />
                  </div>
                </div>

                {/* Section Content Form */}
                {renderSectionForm(section)}
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  )
}
