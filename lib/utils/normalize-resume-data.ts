import { ResumeData, ResumeBasics, ResumeSection, ResumeItem } from '@/types/resume'
import { defaultResumeData } from '@/data/default-resume'

/**
 * Normalizes imported resume data to ensure it matches our data structure
 * Handles missing fields, wrong types, and provides sensible defaults
 */
export function normalizeResumeData(importedData: any): ResumeData {
  // Start with default data as base to ensure all required fields exist
  const normalized: ResumeData = {
    basics: normalizeBasics(importedData?.basics),
    sections: normalizeSections(importedData?.sections),
    metadata: normalizeMetadata(importedData?.metadata),
  }

  return normalized
}

/**
 * Normalize basics section with required fields
 */
function normalizeBasics(basics: any): ResumeBasics {
  // Handle undefined/null basics
  if (!basics || typeof basics !== 'object') {
    return { ...defaultResumeData.basics }
  }

  // Normalize location - handle both string and object formats
  let location = { city: '', country: '' }
  if (typeof basics.location === 'string') {
    // Try to split "City, Country" format
    const parts = basics.location.split(',').map((s: string) => s.trim())
    location = {
      city: parts[0] || '',
      country: parts[1] || '',
    }
  } else if (basics.location && typeof basics.location === 'object') {
    location = {
      city: basics.location.city || '',
      country: basics.location.country || '',
    }
  }

  // Normalize socials - ensure it's an array
  let socials = []
  if (Array.isArray(basics.socials)) {
    socials = basics.socials
      .filter((s: any) => s && typeof s === 'object' && s.url)
      .map((s: any) => ({
        id: s.id || generateId(),
        label: s.label || 'Social',
        url: s.url,
        icon: s.icon,
      }))
  } else if (basics.socials && typeof basics.socials === 'object') {
    // Handle object format like {linkedin: "url", github: "url"}
    socials = Object.entries(basics.socials)
      .filter(([_, url]) => url && typeof url === 'string')
      .map(([key, url]) => ({
        id: key.toLowerCase(),
        label: capitalize(key),
        url: url as string,
      }))
  }

  // Legacy support: check for individual social fields
  if (basics.linkedin && !socials.find((s: any) => s.id === 'linkedin')) {
    socials.push({
      id: 'linkedin',
      label: 'LinkedIn',
      url: basics.linkedin,
    })
  }
  if (basics.github && !socials.find((s: any) => s.id === 'github')) {
    socials.push({
      id: 'github',
      label: 'GitHub',
      url: basics.github,
    })
  }

  return {
    fullName: basics.fullName || basics.name || 'Your Name',
    title: basics.title || 'Your Title',
    summary: basics.summary || basics.objective || '',
    location,
    phone: basics.phone || '',
    email: basics.email || '',
    website: basics.website || '',
    socials,
    photo: basics.photo || basics.photoUrl,
  }
}

/**
 * Normalize sections array
 */
function normalizeSections(sections: any): ResumeSection[] {
  if (!Array.isArray(sections)) {
    return [...defaultResumeData.sections]
  }

  return sections
    .filter((s: any) => s && typeof s === 'object')
    .map((section: any, index: number) => normalizeSection(section, index))
}

/**
 * Normalize individual section
 */
function normalizeSection(section: any, order: number): ResumeSection {
  // Ensure valid section type
  const validTypes = [
    'experience',
    'education',
    'projects',
    'skills',
    'certifications',
    'awards',
    'languages',
    'interests',
    'publications',
    'volunteer',
    'custom',
  ]
  const type = validTypes.includes(section.type) ? section.type : 'custom'

  // Normalize items array
  const items = Array.isArray(section.items)
    ? section.items
        .filter((item: any) => item && typeof item === 'object')
        .map((item: any) => normalizeItem(item))
    : []

  return {
    id: section.id || generateId(),
    type,
    title: section.title || getDefaultSectionTitle(type),
    titleOverride: section.titleOverride,
    visible: section.visible !== false, // Default to true
    items,
    order: typeof section.order === 'number' ? section.order : order,
  }
}

/**
 * Normalize individual item
 */
function normalizeItem(item: any): ResumeItem {
  // Handle legacy field names: title → heading, subtitle → subheading
  const heading = item.heading || item.title || ''
  const subheading = item.subheading || item.subtitle || ''

  // Normalize descriptionBullets
  let descriptionBullets: string[] = []
  if (Array.isArray(item.descriptionBullets)) {
    descriptionBullets = item.descriptionBullets.filter(
      (b: any) => typeof b === 'string' && b.trim().length > 0
    )
  } else if (Array.isArray(item.bullets)) {
    // Legacy support
    descriptionBullets = item.bullets.filter(
      (b: any) => typeof b === 'string' && b.trim().length > 0
    )
  } else if (item.description && typeof item.description === 'string') {
    // Split description by newlines or bullet points
    descriptionBullets = item.description
      .split(/\n|•/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0)
  }

  // Normalize techStack
  let techStack: string[] = []
  if (Array.isArray(item.techStack)) {
    techStack = item.techStack.filter((t: any) => typeof t === 'string' && t.trim().length > 0)
  } else if (Array.isArray(item.technologies)) {
    // Legacy support
    techStack = item.technologies.filter((t: any) => typeof t === 'string' && t.trim().length > 0)
  }

  // Normalize tags
  let tags: string[] = []
  if (Array.isArray(item.tags)) {
    tags = item.tags.filter((t: any) => typeof t === 'string' && t.trim().length > 0)
  } else if (Array.isArray(item.skills)) {
    // Legacy support
    tags = item.skills.filter((t: any) => typeof t === 'string' && t.trim().length > 0)
  }

  // Handle current flag - check endDate for "Present", "Current", etc.
  let current = item.current === true
  if (!current && item.endDate) {
    const endDateLower = item.endDate.toLowerCase()
    current =
      endDateLower === 'present' || endDateLower === 'current' || endDateLower === 'ongoing'
  }

  return {
    id: item.id || generateId(),
    heading,
    subheading,
    location: item.location || '',
    startDate: item.startDate || '',
    endDate: item.endDate || '',
    current,
    description: item.description || '',
    descriptionBullets,
    techStack,
    tags,
    link: item.link || item.url || '',
    icon: item.icon,
    score: item.score || item.gpa || '',
    level: item.level || item.proficiency || '',
  }
}

/**
 * Normalize metadata with defaults
 */
function normalizeMetadata(metadata: any): ResumeData['metadata'] {
  // Ensure defaultResumeData.metadata exists
  const defaultMeta = defaultResumeData.metadata!

  if (!metadata || typeof metadata !== 'object') {
    return { ...defaultMeta }
  }

  // Merge with default metadata to ensure all fields exist
  return {
    templateId: metadata.templateId || defaultMeta.templateId!,
    colorScheme: {
      ...defaultMeta.colorScheme,
      ...(metadata.colorScheme || {}),
    },
    fontFamily: metadata.fontFamily || defaultMeta.fontFamily,
    fontSize: ['small', 'medium', 'large'].includes(metadata.fontSize)
      ? metadata.fontSize
      : defaultMeta.fontSize,
    spacing: ['compact', 'normal', 'relaxed'].includes(metadata.spacing)
      ? metadata.spacing
      : defaultMeta.spacing,
    typography: {
      ...defaultMeta.typography,
      ...(metadata.typography || {}),
    },
    spacingSettings: {
      ...defaultMeta.spacingSettings,
      ...(metadata.spacingSettings || {}),
    },
    pageSize: ['A4', 'Letter'].includes(metadata.pageSize)
      ? metadata.pageSize
      : defaultMeta.pageSize,
    showPhoto: metadata.showPhoto === true,
    showIcons: metadata.showIcons !== false, // Default to true
    lastModified: metadata.lastModified || new Date().toISOString(),
    version: metadata.version || defaultMeta.version,
    photoUrl: metadata.photoUrl || metadata.photo,
  }
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 11)
}

/**
 * Get default section title by type
 */
function getDefaultSectionTitle(type: string): string {
  const titles: Record<string, string> = {
    experience: 'Work Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
    certifications: 'Certifications',
    awards: 'Awards',
    languages: 'Languages',
    interests: 'Interests',
    publications: 'Publications',
    volunteer: 'Volunteer Experience',
    custom: 'Custom Section',
  }
  return titles[type] || 'Custom Section'
}

/**
 * Capitalize first letter
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Validate normalized data (optional - for debugging)
 */
export function validateResumeData(data: ResumeData): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // Check basics
  if (!data.basics?.fullName) {
    errors.push('Missing fullName in basics')
  }
  if (!Array.isArray(data.basics?.socials)) {
    errors.push('socials must be an array')
  }

  // Check sections
  if (!Array.isArray(data.sections)) {
    errors.push('sections must be an array')
  } else {
    data.sections.forEach((section, idx) => {
      if (!section.id) {
        errors.push(`Section ${idx} missing id`)
      }
      if (!Array.isArray(section.items)) {
        errors.push(`Section ${idx} items must be an array`)
      }
    })
  }

  // Check metadata
  if (!data.metadata?.templateId) {
    errors.push('Missing templateId in metadata')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
