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

interface ExperienceFormProps {
  section: ResumeSection
}

export function ExperienceForm({ section }: ExperienceFormProps) {
  const addItem = useResumeStore((state) => state.addItem)
  const updateItem = useResumeStore((state) => state.updateItem)
  const removeItem = useResumeStore((state) => state.removeItem)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const handleAddExperience = () => {
    const newItem: Partial<ResumeItem> = {
      heading: '',
      subheading: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      descriptionBullets: [''],
      techStack: [],
    }
    addItem(section.id, newItem)

    // Auto-expand the new item
    const items = section.items
    if (items.length > 0) {
      const lastItem = items[items.length - 1]
      setExpandedItems(new Set([...expandedItems, lastItem.id]))
    }
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

  const updateTechStack = (itemId: string, value: string) => {
    const tags = value.split(',').map((t) => t.trim()).filter(Boolean)
    updateItem(section.id, itemId, { techStack: tags })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Experience Items</h3>
        <Button onClick={handleAddExperience} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {section.items.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          No experience added yet. Click "Add Experience" to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {section.items.map((item) => {
            const isExpanded = expandedItems.has(item.id)

            return (
              <Card key={item.id} className="p-4">
                {/* Header - Always Visible */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <GripVertical className="h-5 w-5 text-muted-foreground mt-1 cursor-move" />
                    <div className="flex-1 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                      <h4 className="font-medium">
                        {item.heading || 'Untitled Position'}
                      </h4>
                      {item.subheading && (
                        <p className="text-sm text-muted-foreground">{item.subheading}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(item.id)}
                    >
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

                {/* Expanded Form */}
                {isExpanded && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <Label htmlFor={`company-${item.id}`}>Company Name</Label>
                      <Input
                        id={`company-${item.id}`}
                        value={item.heading || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { heading: e.target.value })
                        }
                        placeholder="e.g., TechCorp Inc."
                      />
                    </div>

                    {/* Job Title */}
                    <div className="space-y-2">
                      <Label htmlFor={`title-${item.id}`}>Job Title</Label>
                      <Input
                        id={`title-${item.id}`}
                        value={item.subheading || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { subheading: e.target.value })
                        }
                        placeholder="e.g., Senior Software Engineer"
                      />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor={`location-${item.id}`}>Location</Label>
                      <Input
                        id={`location-${item.id}`}
                        value={item.location || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { location: e.target.value })
                        }
                        placeholder="e.g., San Francisco, CA"
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`start-${item.id}`}>Start Date</Label>
                        <Input
                          id={`start-${item.id}`}
                          type="month"
                          value={item.startDate || ''}
                          onChange={(e) =>
                            updateItem(section.id, item.id, { startDate: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`end-${item.id}`}>End Date</Label>
                        <Input
                          id={`end-${item.id}`}
                          type="month"
                          value={item.current ? '' : item.endDate || ''}
                          onChange={(e) =>
                            updateItem(section.id, item.id, {
                              endDate: e.target.value,
                              current: false,
                            })
                          }
                          disabled={item.current}
                        />
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={item.current || false}
                            onChange={(e) =>
                              updateItem(section.id, item.id, {
                                current: e.target.checked,
                                endDate: e.target.checked ? 'Present' : '',
                              })
                            }
                          />
                          Currently working here
                        </label>
                      </div>
                    </div>

                    {/* Description Bullets */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Key Achievements / Responsibilities</Label>
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
                      {item.descriptionBullets && item.descriptionBullets.length > 0 ? (
                        <div className="space-y-2">
                          {item.descriptionBullets.map((bullet, index) => (
                            <div key={index} className="flex gap-2">
                              <Textarea
                                value={bullet}
                                onChange={(e) =>
                                  updateBulletPoint(item.id, index, e.target.value)
                                }
                                placeholder="e.g., Led development of microservices architecture..."
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
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No bullets added. Click "Add Bullet" to add achievements.
                        </p>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <Label htmlFor={`tech-${item.id}`}>Technologies Used</Label>
                      <Input
                        id={`tech-${item.id}`}
                        value={item.techStack?.join(', ') || ''}
                        onChange={(e) => updateTechStack(item.id, e.target.value)}
                        placeholder="e.g., React, Node.js, PostgreSQL (comma-separated)"
                      />
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-primary/10 px-2 py-1 text-xs text-primary"
                            >
                              {tech}
                            </span>
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
