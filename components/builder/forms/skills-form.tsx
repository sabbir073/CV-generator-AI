'use client'

import { useResumeStore } from '@/lib/store/resume-store'
import { ResumeSection, ResumeItem } from '@/types/resume'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, X } from 'lucide-react'

interface SkillsFormProps {
  section: ResumeSection
}

export function SkillsForm({ section }: SkillsFormProps) {
  const addItem = useResumeStore((state) => state.addItem)
  const updateItem = useResumeStore((state) => state.updateItem)
  const removeItem = useResumeStore((state) => state.removeItem)

  const handleAddSkillCategory = () => {
    const newItem: Partial<ResumeItem> = {
      heading: '',
      tags: [],
    }
    addItem(section.id, newItem)
  }

  const updateTags = (itemId: string, value: string) => {
    const tags = value.split(',').map((t) => t.trim()).filter(Boolean)
    updateItem(section.id, itemId, { tags })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Skill Categories</h3>
        <Button onClick={handleAddSkillCategory} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Organize your skills into categories (e.g., Frontend, Backend, Tools)
      </p>

      {section.items.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          No skill categories added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {section.items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <Label>Category Name</Label>
                      <Input
                        value={item.heading || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { heading: e.target.value })
                        }
                        placeholder="e.g., Frontend Development"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Skills (comma-separated)</Label>
                      <Input
                        value={item.tags?.join(', ') || ''}
                        onChange={(e) => updateTags(item.id, e.target.value)}
                        placeholder="React, JavaScript, TypeScript, HTML, CSS"
                      />
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(section.id, item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
