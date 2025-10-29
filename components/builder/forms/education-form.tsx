'use client'

import { useResumeStore } from '@/lib/store/resume-store'
import { ResumeSection, ResumeItem } from '@/types/resume'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, X, GripVertical } from 'lucide-react'
import { useState } from 'react'

interface EducationFormProps {
  section: ResumeSection
}

export function EducationForm({ section }: EducationFormProps) {
  const addItem = useResumeStore((state) => state.addItem)
  const updateItem = useResumeStore((state) => state.updateItem)
  const removeItem = useResumeStore((state) => state.removeItem)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const handleAddEducation = () => {
    const newItem: Partial<ResumeItem> = {
      heading: '',
      subheading: '',
      location: '',
      startDate: '',
      endDate: '',
      score: '',
      descriptionBullets: [],
    }
    addItem(section.id, newItem)
  }

  const toggleExpand = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const addBulletPoint = (itemId: string) => {
    const item = section.items.find((i) => i.id === itemId)
    if (item) {
      updateItem(section.id, itemId, {
        descriptionBullets: [...(item.descriptionBullets || []), ''],
      })
    }
  }

  const updateBulletPoint = (itemId: string, index: number, value: string) => {
    const item = section.items.find((i) => i.id === itemId)
    if (item && item.descriptionBullets) {
      const bullets = [...item.descriptionBullets]
      bullets[index] = value
      updateItem(section.id, itemId, { descriptionBullets: bullets })
    }
  }

  const removeBulletPoint = (itemId: string, index: number) => {
    const item = section.items.find((i) => i.id === itemId)
    if (item && item.descriptionBullets) {
      const bullets = item.descriptionBullets.filter((_, i) => i !== index)
      updateItem(section.id, itemId, { descriptionBullets: bullets })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Education Items</h3>
        <Button onClick={handleAddEducation} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {section.items.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          No education added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {section.items.map((item) => {
            const isExpanded = expandedItems.has(item.id)

            return (
              <Card key={item.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <GripVertical className="h-5 w-5 text-muted-foreground mt-1 cursor-move" />
                    <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                      <h4 className="font-medium">{item.heading || 'Untitled School'}</h4>
                      {item.subheading && (
                        <p className="text-sm text-muted-foreground">{item.subheading}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => toggleExpand(item.id)}>
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(section.id, item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    <div className="space-y-2">
                      <Label>School/University Name</Label>
                      <Input
                        value={item.heading || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { heading: e.target.value })
                        }
                        placeholder="e.g., University of California"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Degree/Program</Label>
                      <Input
                        value={item.subheading || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { subheading: e.target.value })
                        }
                        placeholder="e.g., Bachelor of Science in Computer Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={item.location || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { location: e.target.value })
                        }
                        placeholder="e.g., Berkeley, CA"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={item.startDate || ''}
                          onChange={(e) =>
                            updateItem(section.id, item.id, { startDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={item.endDate || ''}
                          onChange={(e) =>
                            updateItem(section.id, item.id, { endDate: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>GPA / Grade (Optional)</Label>
                      <Input
                        value={item.score || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { score: e.target.value })
                        }
                        placeholder="e.g., 3.8 GPA"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Achievements / Coursework (Optional)</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addBulletPoint(item.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Bullet
                        </Button>
                      </div>
                      {item.descriptionBullets && item.descriptionBullets.length > 0 && (
                        <div className="space-y-2">
                          {item.descriptionBullets.map((bullet, index) => (
                            <div key={index} className="flex gap-2">
                              <Textarea
                                value={bullet}
                                onChange={(e) =>
                                  updateBulletPoint(item.id, index, e.target.value)
                                }
                                placeholder="e.g., Dean's List all semesters"
                                rows={2}
                                className="resize-none"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeBulletPoint(item.id, index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
