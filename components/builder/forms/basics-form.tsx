'use client'

import { useState, useEffect } from 'react'
import { useResumeStore } from '@/lib/store/resume-store'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Plus, X, Upload, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'

export function BasicsForm() {
  const basics = useResumeStore((state) => state.resumeData.basics)
  const updateBasics = useResumeStore((state) => state.updateBasics)
  const metadata = useResumeStore((state) => state.resumeData.metadata)
  const updateMetadata = useResumeStore((state) => state.updateMetadata)

  const [photoUrl, setPhotoUrl] = useState(metadata?.photoUrl || '')

  const handleAddSocial = () => {
    const newSocial = {
      id: Math.random().toString(36).substring(2, 11),
      label: '',
      url: '',
      icon: '',
    }
    updateBasics({
      socials: [...basics.socials, newSocial],
    })
  }

  const handleRemoveSocial = (id: string) => {
    updateBasics({
      socials: basics.socials.filter((s) => s.id !== id),
    })
  }

  const handleUpdateSocial = (id: string, field: 'label' | 'url', value: string) => {
    updateBasics({
      socials: basics.socials.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPhotoUrl(base64String)
        updateMetadata({ photoUrl: base64String })
        toast.success('Profile photo uploaded successfully!')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoUrl('')
    updateMetadata({ photoUrl: '' })
    toast.success('Profile photo removed')
  }

  // Sync photoUrl when metadata changes (e.g., from Settings dialog)
  useEffect(() => {
    setPhotoUrl(metadata?.photoUrl || '')
  }, [metadata?.photoUrl])

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <Card className="border-2 border-dashed p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">Profile Photo</Label>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload a professional headshot for templates that support photos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {photoUrl && (
              <div className="relative">
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="h-24 w-24 rounded-full border-2 border-border object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm" asChild className="gap-2">
                <label htmlFor="photo-upload-basics">
                  <Upload className="h-4 w-4" />
                  {photoUrl ? 'Change Photo' : 'Upload Photo'}
                  <input
                    id="photo-upload-basics"
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
                  onClick={handleRemovePhoto}
                  className="gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Recommended: 400x400px, max 5MB. Supports JPG, PNG, WebP
          </p>
        </div>
      </Card>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          value={basics.fullName}
          onChange={(e) => updateBasics({ fullName: e.target.value })}
          placeholder="John Doe"
        />
      </div>

      {/* Professional Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Professional Title</Label>
        <Input
          id="title"
          value={basics.title}
          onChange={(e) => updateBasics({ title: e.target.value })}
          placeholder="Full Stack Developer"
        />
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={basics.summary}
          onChange={(e) => updateBasics({ summary: e.target.value })}
          placeholder="A brief summary of your professional background..."
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={basics.location.city || ''}
            onChange={(e) =>
              updateBasics({ location: { ...basics.location, city: e.target.value } })
            }
            placeholder="San Francisco"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={basics.location.country || ''}
            onChange={(e) =>
              updateBasics({ location: { ...basics.location, country: e.target.value } })
            }
            placeholder="USA"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={basics.email || ''}
          onChange={(e) => updateBasics({ email: e.target.value })}
          placeholder="john.doe@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={basics.phone || ''}
          onChange={(e) => updateBasics({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          value={basics.website || ''}
          onChange={(e) => updateBasics({ website: e.target.value })}
          placeholder="https://johndoe.dev"
        />
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Social Links</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddSocial}
            className="gap-2"
          >
            <Plus className="h-3 w-3" />
            Add Social
          </Button>
        </div>

        {basics.socials.map((social) => (
          <Card key={social.id} className="p-3">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-3">
                  <Input
                    value={social.label}
                    onChange={(e) => handleUpdateSocial(social.id, 'label', e.target.value)}
                    placeholder="Label (e.g., GitHub)"
                    className="text-sm"
                  />
                  <Input
                    value={social.url}
                    onChange={(e) => handleUpdateSocial(social.id, 'url', e.target.value)}
                    placeholder="URL"
                    className="text-sm"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSocial(social.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {basics.socials.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No social links added yet. Click "Add Social" to get started.
          </p>
        )}
      </div>
    </div>
  )
}
