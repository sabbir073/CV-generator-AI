'use client'

import { useState, useEffect } from 'react'
import { useResumeStore } from '@/lib/store/resume-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RotateCcw, Palette } from 'lucide-react'
import { toast } from 'sonner'

const DEFAULT_COLOR_PRESETS = [
  {
    name: 'Professional Blue',
    colors: {
      primary: '#2563eb',
      secondary: '#60a5fa',
      accent: '#3b82f6',
      background: '#ffffff',
      sidebarBackground: '#1e40af',
      headerBackground: '#f8fafc',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      textLight: '#ffffff',
      border: '#e5e7eb',
      divider: '#d1d5db',
      headingColor: '#111827',
      linkColor: '#2563eb',
      iconColor: '#3b82f6',
    },
  },
  {
    name: 'Modern Dark',
    colors: {
      primary: '#6366f1',
      secondary: '#818cf8',
      accent: '#a5b4fc',
      background: '#ffffff',
      sidebarBackground: '#1f2937',
      headerBackground: '#f9fafb',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textLight: '#f9fafb',
      border: '#e5e7eb',
      divider: '#d1d5db',
      headingColor: '#1f2937',
      linkColor: '#6366f1',
      iconColor: '#818cf8',
    },
  },
  {
    name: 'Elegant Green',
    colors: {
      primary: '#059669',
      secondary: '#34d399',
      accent: '#10b981',
      background: '#ffffff',
      sidebarBackground: '#064e3b',
      headerBackground: '#f0fdf4',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      textLight: '#ffffff',
      border: '#d1fae5',
      divider: '#a7f3d0',
      headingColor: '#064e3b',
      linkColor: '#059669',
      iconColor: '#10b981',
    },
  },
  {
    name: 'Corporate Purple',
    colors: {
      primary: '#7c3aed',
      secondary: '#a78bfa',
      accent: '#8b5cf6',
      background: '#ffffff',
      sidebarBackground: '#5b21b6',
      headerBackground: '#faf5ff',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      textLight: '#ffffff',
      border: '#e9d5ff',
      divider: '#d8b4fe',
      headingColor: '#5b21b6',
      linkColor: '#7c3aed',
      iconColor: '#8b5cf6',
    },
  },
  {
    name: 'Classic Red',
    colors: {
      primary: '#dc2626',
      secondary: '#f87171',
      accent: '#ef4444',
      background: '#ffffff',
      sidebarBackground: '#991b1b',
      headerBackground: '#fef2f2',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      textLight: '#ffffff',
      border: '#fecaca',
      divider: '#fca5a5',
      headingColor: '#991b1b',
      linkColor: '#dc2626',
      iconColor: '#ef4444',
    },
  },
  {
    name: 'Minimalist Gray',
    colors: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#4b5563',
      background: '#ffffff',
      sidebarBackground: '#1f2937',
      headerBackground: '#f9fafb',
      textPrimary: '#111827',
      textSecondary: '#6b7280',
      textLight: '#ffffff',
      border: '#e5e7eb',
      divider: '#d1d5db',
      headingColor: '#1f2937',
      linkColor: '#374151',
      iconColor: '#4b5563',
    },
  },
]

export function ColorCustomizer() {
  const metadata = useResumeStore((state) => state.resumeData.metadata)
  const updateMetadata = useResumeStore((state) => state.updateMetadata)

  const [colors, setColors] = useState(
    metadata?.colorScheme || DEFAULT_COLOR_PRESETS[0].colors
  )

  useEffect(() => {
    if (metadata?.colorScheme) {
      setColors(metadata.colorScheme)
    }
  }, [metadata?.colorScheme])

  const handleColorChange = (field: string, value: string) => {
    const newColors = { ...colors, [field]: value }
    setColors(newColors)
    updateMetadata({ colorScheme: newColors })
  }

  const applyPreset = (preset: typeof DEFAULT_COLOR_PRESETS[0]) => {
    setColors(preset.colors)
    updateMetadata({ colorScheme: preset.colors })
    toast.success(`Applied "${preset.name}" color scheme`)
  }

  const resetToDefault = () => {
    const defaultColors = DEFAULT_COLOR_PRESETS[0].colors
    setColors(defaultColors)
    updateMetadata({ colorScheme: defaultColors })
    toast.success('Reset to default colors')
  }

  return (
    <div className="space-y-6">
      {/* Color Presets */}
      <div>
        <Label className="mb-3 block text-base font-semibold">Quick Presets</Label>
        <div className="grid grid-cols-2 gap-3">
          {DEFAULT_COLOR_PRESETS.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => applyPreset(preset)}
              className="h-auto flex-col items-start gap-2 p-3"
            >
              <div className="flex w-full gap-1">
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: preset.colors.primary }}
                />
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: preset.colors.sidebarBackground }}
                />
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: preset.colors.accent }}
                />
              </div>
              <span className="text-xs font-medium">{preset.name}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Main Colors */}
      <Card className="p-4">
        <Label className="mb-3 block font-semibold">Main Colors</Label>
        <div className="space-y-3">
          <ColorInput
            label="Primary Color"
            value={colors.primary}
            onChange={(val) => handleColorChange('primary', val)}
          />
          <ColorInput
            label="Secondary Color"
            value={colors.secondary || '#60a5fa'}
            onChange={(val) => handleColorChange('secondary', val)}
          />
          <ColorInput
            label="Accent Color"
            value={colors.accent || '#3b82f6'}
            onChange={(val) => handleColorChange('accent', val)}
          />
        </div>
      </Card>

      {/* Background Colors */}
      <Card className="p-4">
        <Label className="mb-3 block font-semibold">Background Colors</Label>
        <div className="space-y-3">
          <ColorInput
            label="Page Background"
            value={colors.background || '#ffffff'}
            onChange={(val) => handleColorChange('background', val)}
          />
          <ColorInput
            label="Sidebar Background"
            value={colors.sidebarBackground || '#1e40af'}
            onChange={(val) => handleColorChange('sidebarBackground', val)}
          />
          <ColorInput
            label="Header Background"
            value={colors.headerBackground || '#f8fafc'}
            onChange={(val) => handleColorChange('headerBackground', val)}
          />
        </div>
      </Card>

      {/* Text Colors */}
      <Card className="p-4">
        <Label className="mb-3 block font-semibold">Text Colors</Label>
        <div className="space-y-3">
          <ColorInput
            label="Primary Text"
            value={colors.textPrimary || '#1f2937'}
            onChange={(val) => handleColorChange('textPrimary', val)}
          />
          <ColorInput
            label="Secondary Text"
            value={colors.textSecondary || '#6b7280'}
            onChange={(val) => handleColorChange('textSecondary', val)}
          />
          <ColorInput
            label="Light Text (for dark backgrounds)"
            value={colors.textLight || '#ffffff'}
            onChange={(val) => handleColorChange('textLight', val)}
          />
        </div>
      </Card>

      {/* Border & Other Colors */}
      <Card className="p-4">
        <Label className="mb-3 block font-semibold">Other Colors</Label>
        <div className="space-y-3">
          <ColorInput
            label="Border Color"
            value={colors.border || '#e5e7eb'}
            onChange={(val) => handleColorChange('border', val)}
          />
          <ColorInput
            label="Divider Color"
            value={colors.divider || '#d1d5db'}
            onChange={(val) => handleColorChange('divider', val)}
          />
          <ColorInput
            label="Heading Color"
            value={colors.headingColor || '#111827'}
            onChange={(val) => handleColorChange('headingColor', val)}
          />
          <ColorInput
            label="Link Color"
            value={colors.linkColor || '#2563eb'}
            onChange={(val) => handleColorChange('linkColor', val)}
          />
          <ColorInput
            label="Icon Color"
            value={colors.iconColor || '#3b82f6'}
            onChange={(val) => handleColorChange('iconColor', val)}
          />
        </div>
      </Card>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={resetToDefault}
        className="w-full gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Reset to Default Colors
      </Button>
    </div>
  )
}

interface ColorInputProps {
  label: string
  value: string
  onChange: (value: string) => void
}

function ColorInput({ label, value, onChange }: ColorInputProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <Label className="mb-1.5 block text-xs text-muted-foreground">{label}</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-16 cursor-pointer p-1"
          />
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 flex-1 font-mono text-xs"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  )
}
