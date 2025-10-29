'use client'

import { useState } from 'react'
import { Settings, Palette, Type, Image as ImageIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useResumeStore } from '@/lib/store/resume-store'

const COLOR_SCHEMES = [
  {
    id: 'blue',
    name: 'Blue',
    primary: '#3b82f6',
    secondary: '#60a5fa',
    accent: '#2563eb',
    background: '#ffffff',
    sidebarBackground: '#1e40af',
    headerBackground: '#eff6ff',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textLight: '#ffffff',
    border: '#bfdbfe',
    divider: '#93c5fd',
    headingColor: '#1e3a8a',
    linkColor: '#3b82f6',
    iconColor: '#3b82f6'
  },
  {
    id: 'green',
    name: 'Green',
    primary: '#10b981',
    secondary: '#34d399',
    accent: '#059669',
    background: '#ffffff',
    sidebarBackground: '#047857',
    headerBackground: '#ecfdf5',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textLight: '#ffffff',
    border: '#a7f3d0',
    divider: '#6ee7b7',
    headingColor: '#065f46',
    linkColor: '#10b981',
    iconColor: '#10b981'
  },
  {
    id: 'purple',
    name: 'Purple',
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    accent: '#7c3aed',
    background: '#ffffff',
    sidebarBackground: '#6d28d9',
    headerBackground: '#f5f3ff',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textLight: '#ffffff',
    border: '#c4b5fd',
    divider: '#a78bfa',
    headingColor: '#5b21b6',
    linkColor: '#8b5cf6',
    iconColor: '#8b5cf6'
  },
  {
    id: 'red',
    name: 'Red',
    primary: '#ef4444',
    secondary: '#f87171',
    accent: '#dc2626',
    background: '#ffffff',
    sidebarBackground: '#b91c1c',
    headerBackground: '#fef2f2',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textLight: '#ffffff',
    border: '#fecaca',
    divider: '#fca5a5',
    headingColor: '#991b1b',
    linkColor: '#ef4444',
    iconColor: '#ef4444'
  },
  {
    id: 'orange',
    name: 'Orange',
    primary: '#f97316',
    secondary: '#fb923c',
    accent: '#ea580c',
    background: '#ffffff',
    sidebarBackground: '#c2410c',
    headerBackground: '#fff7ed',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textLight: '#ffffff',
    border: '#fed7aa',
    divider: '#fdba74',
    headingColor: '#9a3412',
    linkColor: '#f97316',
    iconColor: '#f97316'
  },
  {
    id: 'pink',
    name: 'Pink',
    primary: '#ec4899',
    secondary: '#f472b6',
    accent: '#db2777',
    background: '#ffffff',
    sidebarBackground: '#be185d',
    headerBackground: '#fdf2f8',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textLight: '#ffffff',
    border: '#fbcfe8',
    divider: '#f9a8d4',
    headingColor: '#9f1239',
    linkColor: '#ec4899',
    iconColor: '#ec4899'
  },
  {
    id: 'gray',
    name: 'Gray',
    primary: '#6b7280',
    secondary: '#9ca3af',
    accent: '#4b5563',
    background: '#ffffff',
    sidebarBackground: '#374151',
    headerBackground: '#f9fafb',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textLight: '#ffffff',
    border: '#d1d5db',
    divider: '#e5e7eb',
    headingColor: '#111827',
    linkColor: '#6b7280',
    iconColor: '#6b7280'
  },
]

const FONT_FAMILIES = [
  { id: 'inter', name: 'Inter (Modern)', value: 'Inter, sans-serif' },
  { id: 'roboto', name: 'Roboto', value: 'Roboto, sans-serif' },
  { id: 'lato', name: 'Lato', value: 'Lato, sans-serif' },
  { id: 'open-sans', name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { id: 'poppins', name: 'Poppins', value: 'Poppins, sans-serif' },
  { id: 'georgia', name: 'Georgia (Serif)', value: 'Georgia, serif' },
  { id: 'times', name: 'Times New Roman', value: '"Times New Roman", serif' },
  { id: 'mono', name: 'Monospace', value: 'monospace' },
]

interface SettingsDialogProps {
  children?: React.ReactNode
}

export function SettingsDialog({ children }: SettingsDialogProps) {
  const resumeData = useResumeStore((state) => state.resumeData)
  const updateMetadata = useResumeStore((state) => state.updateMetadata)

  const [selectedColor, setSelectedColor] = useState(
    resumeData.metadata?.colorScheme || 'blue'
  )
  const [selectedFont, setSelectedFont] = useState(
    resumeData.metadata?.fontFamily || 'inter'
  )
  const [photoUrl, setPhotoUrl] = useState(resumeData.basics.photoUrl || '')

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId)
    const colorScheme = COLOR_SCHEMES.find((c) => c.id === colorId)
    if (colorScheme) {
      // Extract only the color values, not the id and name
      const { id, name, ...colors } = colorScheme
      updateMetadata({
        colorScheme: colors,
      })
    }
  }

  const handleFontChange = (fontId: string) => {
    setSelectedFont(fontId)
    const font = FONT_FAMILIES.find((f) => f.id === fontId)
    if (font) {
      updateMetadata({
        fontFamily: font.value,
      })
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPhotoUrl(base64String)
        updateMetadata({ photoUrl: base64String })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Customize Resume</DialogTitle>
          <DialogDescription>
            Personalize your resume with custom colors, fonts, and styles
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="colors" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors" className="gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="fonts" className="gap-2">
              <Type className="h-4 w-4" />
              Fonts
            </TabsTrigger>
            <TabsTrigger value="photo" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              Photo
            </TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-4">
            <div>
              <Label className="mb-3 block">Color Scheme</Label>
              <div className="grid grid-cols-4 gap-3">
                {COLOR_SCHEMES.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorChange(color.id)}
                    className={`group relative flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all hover:border-primary ${
                      selectedColor === color.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                  >
                    <div className="flex gap-1">
                      <div
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: color.primary }}
                      />
                      <div
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: color.secondary }}
                      />
                    </div>
                    <span className="text-xs font-medium">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                The selected color scheme will be applied to headings, accents, and
                interactive elements in your resume template.
              </p>
            </div>
          </TabsContent>

          {/* Fonts Tab */}
          <TabsContent value="fonts" className="space-y-4">
            <div>
              <Label htmlFor="font-select" className="mb-3 block">
                Font Family
              </Label>
              <Select value={selectedFont} onValueChange={handleFontChange}>
                <SelectTrigger id="font-select">
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {FONT_FAMILIES.map((font) => (
                    <SelectItem key={font.id} value={font.id}>
                      <span style={{ fontFamily: font.value }}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="mb-2 text-sm font-medium">Preview:</p>
              <div
                className="space-y-2"
                style={{
                  fontFamily: FONT_FAMILIES.find((f) => f.id === selectedFont)?.value,
                }}
              >
                <h3 className="text-lg font-bold">Your Name</h3>
                <p className="text-sm">Software Engineer | Full Stack Developer</p>
                <p className="text-xs text-muted-foreground">
                  This is how your resume text will appear with the selected font.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Photo Tab */}
          <TabsContent value="photo" className="space-y-4">
            <div>
              <Label className="mb-3 block">Profile Photo</Label>
              <div className="flex flex-col items-center gap-4">
                {photoUrl && (
                  <div className="relative">
                    <img
                      src={photoUrl}
                      alt="Profile"
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      {photoUrl ? 'Change Photo' : 'Upload Photo'}
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </Button>
                  {photoUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setPhotoUrl('')
                        updateMetadata({ photoUrl: '' })
                      }}
                    >
                      Remove Photo
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                Upload a professional headshot. Recommended size: 400x400px. The photo
                will be displayed in templates that support profile images.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
