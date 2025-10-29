// Core Resume Data Types

export interface ResumeData {
  basics: ResumeBasics
  sections: ResumeSection[]
  metadata?: ResumeMetadata
}

export interface ResumeBasics {
  fullName: string
  title: string
  summary: string
  location: {
    city?: string
    country?: string
  }
  phone?: string
  email?: string
  website?: string
  socials: SocialLink[]
  photo?: string
}

export interface SocialLink {
  id: string
  label: string
  url: string
  icon?: string
}

export type SectionType =
  | 'experience'
  | 'education'
  | 'projects'
  | 'skills'
  | 'certifications'
  | 'awards'
  | 'languages'
  | 'interests'
  | 'publications'
  | 'volunteer'
  | 'custom'

export interface ResumeSection {
  id: string
  type: SectionType
  title: string // Display title (can be customized)
  titleOverride?: string // User custom title
  visible: boolean
  items: ResumeItem[]
  order: number
}

export interface ResumeItem {
  id: string
  heading?: string // e.g., Company name, School name, Project name
  subheading?: string // e.g., Job title, Degree, Role
  location?: string
  startDate?: string
  endDate?: string // Use "Present" for current
  current?: boolean
  description?: string
  descriptionBullets?: string[]
  techStack?: string[]
  tags?: string[]
  link?: string
  icon?: string
  score?: string // e.g., GPA, Certification score
  level?: string // e.g., Expert, Intermediate (for skills/languages)
}

export interface ResumeMetadata {
  templateId: string
  colorScheme?: ColorScheme
  fontFamily?: string
  fontSize?: 'small' | 'medium' | 'large'
  spacing?: 'compact' | 'normal' | 'relaxed'
  typography?: TypographySettings
  spacingSettings?: SpacingSettings
  pageSize?: 'A4' | 'Letter'
  showPhoto?: boolean
  showIcons?: boolean
  lastModified?: string
  version?: string
  photoUrl?: string
}

export interface TypographySettings {
  headingFontSize?: number
  subheadingFontSize?: number
  bodyFontSize?: number
  smallFontSize?: number
  lineHeight?: number
  letterSpacing?: number
}

export interface SpacingSettings {
  sectionSpacing?: number
  itemSpacing?: number
  padding?: number
}

export interface ColorScheme {
  // Main colors
  primary: string
  secondary?: string
  accent?: string

  // Background colors
  background?: string
  sidebarBackground?: string
  headerBackground?: string

  // Text colors
  textPrimary?: string
  textSecondary?: string
  textLight?: string

  // Border and divider colors
  border?: string
  divider?: string

  // Section-specific colors
  headingColor?: string
  linkColor?: string
  iconColor?: string
}

// Template Types
export interface TemplateConfig {
  id: string
  name: string
  description: string
  preview: string
  category: 'modern' | 'classic' | 'minimal' | 'creative' | 'ats'
  supportedFeatures: {
    photo: boolean
    icons: boolean
    colors: boolean
    multiColumn: boolean
  }
}

// AI Improvement Types
export interface AIImprovementRequest {
  resumeData: ResumeData
  jobDescription?: string
  targetRole?: string
  improvementType: 'optimize' | 'rewrite' | 'enhance' | 'tailor'
  focusAreas?: string[]
}

export interface AIImprovementResponse {
  improvedData: ResumeData
  changes: ChangeLog[]
  suggestions: string[]
}

export interface ChangeLog {
  section: string
  field: string
  oldValue: string
  newValue: string
  reason?: string
}

// PDF Import/Export Types
export interface PDFParseRequest {
  fileBuffer: Buffer
  fileName: string
}

export interface PDFParseResponse {
  extractedText: string
  resumeData: ResumeData
  confidence: number
  warnings?: string[]
}

export interface PDFExportRequest {
  resumeData: ResumeData
  templateId: string
  options?: {
    pageSize?: 'A4' | 'Letter'
    quality?: 'low' | 'medium' | 'high'
  }
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}
