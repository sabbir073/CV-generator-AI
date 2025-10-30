'use client'

import { useState, useEffect } from 'react'
import { useResumeStore } from '@/lib/store/resume-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RotateCcw, Palette, Type, Ruler } from 'lucide-react'
import { toast } from 'sonner'

export function StyleCustomizer() {
  const metadata = useResumeStore((state) => state.resumeData.metadata)
  const updateMetadata = useResumeStore((state) => state.updateMetadata)

  const [colors, setColors] = useState(
    metadata?.colorScheme || {
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
    }
  )

  const [typography, setTypography] = useState({
    fontFamily: metadata?.fontFamily || 'Inter, sans-serif',
    fontSize: metadata?.fontSize || 'medium',
    headingFontSize: metadata?.typography?.headingFontSize || 24,
    subheadingFontSize: metadata?.typography?.subheadingFontSize || 18,
    bodyFontSize: metadata?.typography?.bodyFontSize || 14,
    smallFontSize: metadata?.typography?.smallFontSize || 12,
    lineHeight: metadata?.typography?.lineHeight || 1.5,
    letterSpacing: metadata?.typography?.letterSpacing || 0,
  })

  const [spacing, setSpacing] = useState({
    sectionSpacing: metadata?.spacingSettings?.sectionSpacing || (metadata?.spacing === 'compact' ? 16 : metadata?.spacing === 'relaxed' ? 32 : 24),
    itemSpacing: metadata?.spacingSettings?.itemSpacing || 12,
    paddingTop: metadata?.spacingSettings?.paddingTop || 50,
    paddingBottom: metadata?.spacingSettings?.paddingBottom || 50,
    paddingLeft: metadata?.spacingSettings?.paddingLeft || 50,
    paddingRight: metadata?.spacingSettings?.paddingRight || 50,
  })

  // Sync with metadata changes from Settings dialog or other sources
  useEffect(() => {
    if (metadata?.colorScheme) {
      setColors({
        primary: metadata.colorScheme.primary || '#2563eb',
        secondary: metadata.colorScheme.secondary || '#60a5fa',
        accent: metadata.colorScheme.accent || '#3b82f6',
        background: metadata.colorScheme.background || '#ffffff',
        sidebarBackground: metadata.colorScheme.sidebarBackground || '#1e40af',
        headerBackground: metadata.colorScheme.headerBackground || '#f8fafc',
        textPrimary: metadata.colorScheme.textPrimary || '#1f2937',
        textSecondary: metadata.colorScheme.textSecondary || '#6b7280',
        textLight: metadata.colorScheme.textLight || '#ffffff',
        border: metadata.colorScheme.border || '#e5e7eb',
        divider: metadata.colorScheme.divider || '#d1d5db',
        headingColor: metadata.colorScheme.headingColor || '#111827',
        linkColor: metadata.colorScheme.linkColor || '#2563eb',
        iconColor: metadata.colorScheme.iconColor || '#3b82f6',
      })
    }
  }, [metadata?.colorScheme])

  useEffect(() => {
    if (metadata?.fontFamily) {
      setTypography(prev => ({ ...prev, fontFamily: metadata.fontFamily || prev.fontFamily }))
    }
    if (metadata?.fontSize) {
      setTypography(prev => ({ ...prev, fontSize: metadata.fontSize || prev.fontSize }))
    }
    if (metadata?.typography) {
      setTypography(prev => ({
        ...prev,
        headingFontSize: metadata.typography?.headingFontSize || prev.headingFontSize,
        subheadingFontSize: metadata.typography?.subheadingFontSize || prev.subheadingFontSize,
        bodyFontSize: metadata.typography?.bodyFontSize || prev.bodyFontSize,
        smallFontSize: metadata.typography?.smallFontSize || prev.smallFontSize,
        lineHeight: metadata.typography?.lineHeight || prev.lineHeight,
        letterSpacing: metadata.typography?.letterSpacing || prev.letterSpacing,
      }))
    }
  }, [metadata?.fontFamily, metadata?.fontSize, metadata?.typography])

  useEffect(() => {
    if (metadata?.spacingSettings) {
      setSpacing(prev => ({
        ...prev,
        sectionSpacing: metadata.spacingSettings?.sectionSpacing || prev.sectionSpacing,
        itemSpacing: metadata.spacingSettings?.itemSpacing || prev.itemSpacing,
        paddingTop: metadata.spacingSettings?.paddingTop || 50,
        paddingBottom: metadata.spacingSettings?.paddingBottom || 50,
        paddingLeft: metadata.spacingSettings?.paddingLeft || 50,
        paddingRight: metadata.spacingSettings?.paddingRight || 50,
      }))
    } else if (metadata?.spacing) {
      // Legacy support for old spacing field
      const sectionSpacing = metadata.spacing === 'compact' ? 16 : metadata.spacing === 'relaxed' ? 32 : 24
      setSpacing(prev => ({ ...prev, sectionSpacing }))
    }
  }, [metadata?.spacing, metadata?.spacingSettings])

  const handleColorChange = (field: string, value: string) => {
    const newColors = { ...colors, [field]: value }
    setColors(newColors)
    updateMetadata({ colorScheme: newColors })
  }

  const handleTypographyChange = (field: string, value: any) => {
    const newTypography = { ...typography, [field]: value }
    setTypography(newTypography)

    if (field === 'fontFamily') {
      updateMetadata({ fontFamily: value })
    } else if (field === 'fontSize') {
      updateMetadata({ fontSize: value })
    } else {
      // Save all typography settings to metadata
      const typographySettings = {
        headingFontSize: newTypography.headingFontSize,
        subheadingFontSize: newTypography.subheadingFontSize,
        bodyFontSize: newTypography.bodyFontSize,
        smallFontSize: newTypography.smallFontSize,
        lineHeight: newTypography.lineHeight,
        letterSpacing: newTypography.letterSpacing,
      }
      updateMetadata({ typography: typographySettings })
    }
  }

  const handleSpacingChange = (field: string, value: number) => {
    const newSpacing = { ...spacing, [field]: value }
    setSpacing(newSpacing)

    // Save all spacing settings to metadata
    const spacingSettings = {
      sectionSpacing: newSpacing.sectionSpacing,
      itemSpacing: newSpacing.itemSpacing,
      paddingTop: newSpacing.paddingTop,
      paddingBottom: newSpacing.paddingBottom,
      paddingLeft: newSpacing.paddingLeft,
      paddingRight: newSpacing.paddingRight,
    }
    updateMetadata({ spacingSettings })
  }

  const applySpacingPreset = (preset: {
    sectionSpacing: number
    itemSpacing: number
    paddingTop: number
    paddingBottom: number
    paddingLeft: number
    paddingRight: number
  }) => {
    setSpacing(preset)
    updateMetadata({ spacingSettings: preset })
  }

  const resetStyles = () => {
    const defaultColors = {
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
    }

    const defaultSpacing = {
      sectionSpacing: 24,
      itemSpacing: 12,
      paddingTop: 50,
      paddingBottom: 50,
      paddingLeft: 50,
      paddingRight: 50,
    }

    setColors(defaultColors)
    setSpacing(defaultSpacing)

    updateMetadata({
      colorScheme: defaultColors,
      fontFamily: 'Inter, sans-serif',
      fontSize: 'medium',
      spacing: 'normal',
      spacingSettings: defaultSpacing,
    })
    toast.success('Reset to default styles')
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colors" className="gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="gap-2">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="spacing" className="gap-2">
            <Ruler className="h-4 w-4" />
            Spacing
          </TabsTrigger>
        </TabsList>

        {/* COLORS TAB */}
        <TabsContent value="colors" className="space-y-4 mt-4">
          {/* Main Colors */}
          <Card className="p-4">
            <Label className="mb-3 block font-semibold">Main Colors</Label>
            <div className="space-y-3">
              <StyleColorInput
                label="Primary Color"
                description="Main brand/accent color"
                value={colors.primary}
                onChange={(val) => handleColorChange('primary', val)}
              />
              <StyleColorInput
                label="Secondary Color"
                description="Supporting color"
                value={colors.secondary || '#60a5fa'}
                onChange={(val) => handleColorChange('secondary', val)}
              />
              <StyleColorInput
                label="Accent Color"
                description="Highlight color"
                value={colors.accent || '#3b82f6'}
                onChange={(val) => handleColorChange('accent', val)}
              />
            </div>
          </Card>

          {/* Background Colors */}
          <Card className="p-4">
            <Label className="mb-3 block font-semibold">Background Colors</Label>
            <div className="space-y-3">
              <StyleColorInput
                label="Page Background"
                description="Main page background"
                value={colors.background || '#ffffff'}
                onChange={(val) => handleColorChange('background', val)}
              />
              <StyleColorInput
                label="Sidebar Background"
                description="Side panel background"
                value={colors.sidebarBackground || '#1e40af'}
                onChange={(val) => handleColorChange('sidebarBackground', val)}
              />
              <StyleColorInput
                label="Header Background"
                description="Header section background"
                value={colors.headerBackground || '#f8fafc'}
                onChange={(val) => handleColorChange('headerBackground', val)}
              />
            </div>
          </Card>

          {/* Text Colors */}
          <Card className="p-4">
            <Label className="mb-3 block font-semibold">Text Colors</Label>
            <div className="space-y-3">
              <StyleColorInput
                label="Primary Text"
                description="Main body text"
                value={colors.textPrimary || '#1f2937'}
                onChange={(val) => handleColorChange('textPrimary', val)}
              />
              <StyleColorInput
                label="Secondary Text"
                description="Supporting text, captions"
                value={colors.textSecondary || '#6b7280'}
                onChange={(val) => handleColorChange('textSecondary', val)}
              />
              <StyleColorInput
                label="Light Text"
                description="Text on dark backgrounds"
                value={colors.textLight || '#ffffff'}
                onChange={(val) => handleColorChange('textLight', val)}
              />
              <StyleColorInput
                label="Heading Color"
                description="Section headings"
                value={colors.headingColor || '#111827'}
                onChange={(val) => handleColorChange('headingColor', val)}
              />
            </div>
          </Card>

          {/* Other Colors */}
          <Card className="p-4">
            <Label className="mb-3 block font-semibold">Other Colors</Label>
            <div className="space-y-3">
              <StyleColorInput
                label="Link Color"
                description="Hyperlinks"
                value={colors.linkColor || '#2563eb'}
                onChange={(val) => handleColorChange('linkColor', val)}
              />
              <StyleColorInput
                label="Border Color"
                description="Border lines"
                value={colors.border || '#e5e7eb'}
                onChange={(val) => handleColorChange('border', val)}
              />
              <StyleColorInput
                label="Divider Color"
                description="Section dividers"
                value={colors.divider || '#d1d5db'}
                onChange={(val) => handleColorChange('divider', val)}
              />
              <StyleColorInput
                label="Icon Color"
                description="Icons and symbols"
                value={colors.iconColor || '#3b82f6'}
                onChange={(val) => handleColorChange('iconColor', val)}
              />
            </div>
          </Card>
        </TabsContent>

        {/* TYPOGRAPHY TAB */}
        <TabsContent value="typography" className="space-y-4 mt-4">
          <Card className="p-4">
            <Label className="mb-3 block font-semibold">Font Family</Label>
            <Select value={typography.fontFamily} onValueChange={(val) => handleTypographyChange('fontFamily', val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter, sans-serif">Inter (Modern Sans)</SelectItem>
                <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                <SelectItem value="Lato, sans-serif">Lato</SelectItem>
                <SelectItem value="Poppins, sans-serif">Poppins</SelectItem>
                <SelectItem value="'Playfair Display', serif">Playfair Display (Serif)</SelectItem>
                <SelectItem value="Georgia, serif">Georgia (Serif)</SelectItem>
                <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                <SelectItem value="'Courier New', monospace">Courier New (Mono)</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-4">
            <Label className="mb-3 block font-semibold">Font Sizes</Label>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm">Heading Size</Label>
                  <span className="text-xs text-muted-foreground">{typography.headingFontSize}px</span>
                </div>
                <Slider
                  value={[typography.headingFontSize]}
                  onValueChange={(val) => handleTypographyChange('headingFontSize', val[0])}
                  min={18}
                  max={36}
                  step={1}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm">Subheading Size</Label>
                  <span className="text-xs text-muted-foreground">{typography.subheadingFontSize}px</span>
                </div>
                <Slider
                  value={[typography.subheadingFontSize]}
                  onValueChange={(val) => handleTypographyChange('subheadingFontSize', val[0])}
                  min={14}
                  max={24}
                  step={1}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm">Body Text Size</Label>
                  <span className="text-xs text-muted-foreground">{typography.bodyFontSize}px</span>
                </div>
                <Slider
                  value={[typography.bodyFontSize]}
                  onValueChange={(val) => handleTypographyChange('bodyFontSize', val[0])}
                  min={10}
                  max={18}
                  step={1}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm">Small Text Size</Label>
                  <span className="text-xs text-muted-foreground">{typography.smallFontSize}px</span>
                </div>
                <Slider
                  value={[typography.smallFontSize]}
                  onValueChange={(val) => handleTypographyChange('smallFontSize', val[0])}
                  min={8}
                  max={14}
                  step={1}
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <Label className="mb-3 block font-semibold">Text Spacing</Label>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm">Line Height</Label>
                  <span className="text-xs text-muted-foreground">{typography.lineHeight}</span>
                </div>
                <Slider
                  value={[typography.lineHeight]}
                  onValueChange={(val) => handleTypographyChange('lineHeight', val[0])}
                  min={1}
                  max={2.5}
                  step={0.1}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-sm">Letter Spacing</Label>
                  <span className="text-xs text-muted-foreground">{typography.letterSpacing}px</span>
                </div>
                <Slider
                  value={[typography.letterSpacing]}
                  onValueChange={(val) => handleTypographyChange('letterSpacing', val[0])}
                  min={-2}
                  max={4}
                  step={0.5}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* SPACING TAB */}
        <TabsContent value="spacing" className="space-y-4 mt-4">
          <Card className="p-4">
            <Label className="mb-3 block font-semibold">Layout Spacing</Label>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Section Spacing</Label>
                    <p className="text-xs text-muted-foreground">Space between sections</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{spacing.sectionSpacing}px</span>
                </div>
                <Slider
                  value={[spacing.sectionSpacing]}
                  onValueChange={(val) => handleSpacingChange('sectionSpacing', val[0])}
                  min={0}
                  max={200}
                  step={5}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Item Spacing</Label>
                    <p className="text-xs text-muted-foreground">Space between items</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{spacing.itemSpacing}px</span>
                </div>
                <Slider
                  value={[spacing.itemSpacing]}
                  onValueChange={(val) => handleSpacingChange('itemSpacing', val[0])}
                  min={0}
                  max={200}
                  step={5}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Top Padding</Label>
                    <p className="text-xs text-muted-foreground">Padding from top</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{spacing.paddingTop}px</span>
                </div>
                <Slider
                  value={[spacing.paddingTop]}
                  onValueChange={(val) => handleSpacingChange('paddingTop', val[0])}
                  min={0}
                  max={200}
                  step={5}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Bottom Padding</Label>
                    <p className="text-xs text-muted-foreground">Padding from bottom</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{spacing.paddingBottom}px</span>
                </div>
                <Slider
                  value={[spacing.paddingBottom]}
                  onValueChange={(val) => handleSpacingChange('paddingBottom', val[0])}
                  min={0}
                  max={200}
                  step={5}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Left Padding</Label>
                    <p className="text-xs text-muted-foreground">Padding from left</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{spacing.paddingLeft}px</span>
                </div>
                <Slider
                  value={[spacing.paddingLeft]}
                  onValueChange={(val) => handleSpacingChange('paddingLeft', val[0])}
                  min={0}
                  max={200}
                  step={5}
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <Label className="text-sm">Right Padding</Label>
                    <p className="text-xs text-muted-foreground">Padding from right</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{spacing.paddingRight}px</span>
                </div>
                <Slider
                  value={[spacing.paddingRight]}
                  onValueChange={(val) => handleSpacingChange('paddingRight', val[0])}
                  min={0}
                  max={200}
                  step={5}
                />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <Label className="mb-3 block font-semibold">Quick Presets</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  applySpacingPreset({
                    sectionSpacing: 16,
                    itemSpacing: 8,
                    paddingTop: 30,
                    paddingBottom: 30,
                    paddingLeft: 30,
                    paddingRight: 30,
                  })
                  toast.success('Applied Compact spacing')
                }}
              >
                Compact
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  applySpacingPreset({
                    sectionSpacing: 24,
                    itemSpacing: 12,
                    paddingTop: 50,
                    paddingBottom: 50,
                    paddingLeft: 50,
                    paddingRight: 50,
                  })
                  toast.success('Applied Normal spacing')
                }}
              >
                Normal
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  applySpacingPreset({
                    sectionSpacing: 32,
                    itemSpacing: 16,
                    paddingTop: 70,
                    paddingBottom: 70,
                    paddingLeft: 70,
                    paddingRight: 70,
                  })
                  toast.success('Applied Relaxed spacing')
                }}
              >
                Relaxed
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={resetStyles}
        className="w-full gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Reset All Styles to Default
      </Button>
    </div>
  )
}

interface StyleColorInputProps {
  label: string
  description: string
  value: string
  onChange: (value: string) => void
}

function StyleColorInput({ label, description, value, onChange }: StyleColorInputProps) {
  // Ensure value is always defined to prevent controlled/uncontrolled switch
  const safeValue = value || '#000000'

  return (
    <div className="space-y-2">
      <div>
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        <Input
          type="color"
          value={safeValue}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-20 cursor-pointer p-1"
        />
        <Input
          type="text"
          value={safeValue}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 flex-1 font-mono text-xs"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
