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

interface GenericSectionFormProps {
  section: ResumeSection
}

export function GenericSectionForm({ section }: GenericSectionFormProps) {
  const addItem = useResumeStore((state) => state.addItem)
  const updateItem = useResumeStore((state) => state.updateItem)
  const removeItem = useResumeStore((state) => state.removeItem)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const handleAddItem = () => {
    const newItem: Partial<ResumeItem> = {
      heading: '',
      subheading: '',
      startDate: '',
      description: '',
      link: '',
      level: '',
      tags: [],
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

  const updateTags = (itemId: string, value: string) => {
    const tags = value.split(',').map((t) => t.trim()).filter(Boolean)
    updateItem(section.id, itemId, { tags })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Items</h3>
        <Button onClick={handleAddItem} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {section.items.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">No items added yet.</p>
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
                      <h4 className="font-medium">{item.heading || 'Untitled Item'}</h4>
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
                      <Label>Title / Name</Label>
                      <Input
                        value={item.heading || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { heading: e.target.value })
                        }
                        placeholder="e.g., Certification Name, Language, Award"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Subtitle (Optional)</Label>
                      <Input
                        value={item.subheading || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { subheading: e.target.value })
                        }
                        placeholder="e.g., Issuing Organization"
                      />
                    </div>

                    {section.type === 'languages' && (
                      <div className="space-y-2">
                        <Label>Proficiency Level (Optional)</Label>
                        <Input
                          value={item.level || ''}
                          onChange={(e) =>
                            updateItem(section.id, item.id, { level: e.target.value })
                          }
                          placeholder="e.g., Native, Fluent, Intermediate"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Date (Optional)</Label>
                      <Input
                        type="month"
                        value={item.startDate || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { startDate: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Link (Optional)</Label>
                      <Input
                        value={item.link || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { link: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description (Optional)</Label>
                      <Textarea
                        value={item.description || ''}
                        onChange={(e) =>
                          updateItem(section.id, item.id, { description: e.target.value })
                        }
                        placeholder="Brief description..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tags (Optional, comma-separated)</Label>
                      <Input
                        value={item.tags?.join(', ') || ''}
                        onChange={(e) => updateTags(item.id, e.target.value)}
                        placeholder="tag1, tag2, tag3"
                      />
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-primary/10 px-2 py-1 text-xs text-primary"
                            >
                              {tag}
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
