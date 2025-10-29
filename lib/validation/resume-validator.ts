import { ResumeData, ResumeBasics, ResumeSection, ValidationError, ValidationResult } from '@/types/resume'

/**
 * Validates the entire resume data
 */
export function validateResumeData(data: ResumeData): ValidationResult {
  const errors: ValidationError[] = []

  // Validate basics
  const basicsErrors = validateBasics(data.basics)
  errors.push(...basicsErrors)

  // Validate sections
  data.sections.forEach((section, index) => {
    const sectionErrors = validateSection(section, index)
    errors.push(...sectionErrors)
  })

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validates the basics section
 */
function validateBasics(basics: ResumeBasics): ValidationError[] {
  const errors: ValidationError[] = []

  // Full name is required
  if (!basics.fullName || basics.fullName.trim() === '') {
    errors.push({
      field: 'basics.fullName',
      message: 'Full name is required',
    })
  }

  // Validate email format if provided
  if (basics.email && !isValidEmail(basics.email)) {
    errors.push({
      field: 'basics.email',
      message: 'Invalid email format',
    })
  }

  // Validate phone format if provided (basic check)
  if (basics.phone && !isValidPhone(basics.phone)) {
    errors.push({
      field: 'basics.phone',
      message: 'Invalid phone format',
    })
  }

  // Validate website URL if provided
  if (basics.website && !isValidUrl(basics.website)) {
    errors.push({
      field: 'basics.website',
      message: 'Invalid website URL',
    })
  }

  // Validate social links
  basics.socials.forEach((social, index) => {
    if (!social.label || social.label.trim() === '') {
      errors.push({
        field: `basics.socials[${index}].label`,
        message: 'Social link label is required',
      })
    }
    if (!social.url || !isValidUrl(social.url)) {
      errors.push({
        field: `basics.socials[${index}].url`,
        message: 'Invalid social link URL',
      })
    }
  })

  return errors
}

/**
 * Validates a section
 */
function validateSection(section: ResumeSection, index: number): ValidationError[] {
  const errors: ValidationError[] = []

  // Section title is required
  if (!section.title || section.title.trim() === '') {
    errors.push({
      field: `sections[${index}].title`,
      message: 'Section title is required',
    })
  }

  // Validate items
  section.items.forEach((item, itemIndex) => {
    // Check if item has at least one meaningful field
    const hasContent =
      item.heading ||
      item.subheading ||
      item.description ||
      (item.descriptionBullets && item.descriptionBullets.length > 0) ||
      (item.tags && item.tags.length > 0) ||
      (item.techStack && item.techStack.length > 0)

    if (!hasContent) {
      errors.push({
        field: `sections[${index}].items[${itemIndex}]`,
        message: 'Item must have at least one field with content',
      })
    }

    // Validate link if provided
    if (item.link && !isValidUrl(item.link)) {
      errors.push({
        field: `sections[${index}].items[${itemIndex}].link`,
        message: 'Invalid item link URL',
      })
    }

    // Validate dates if provided
    if (item.startDate && item.endDate && item.endDate !== 'Present') {
      if (!isValidDateRange(item.startDate, item.endDate)) {
        errors.push({
          field: `sections[${index}].items[${itemIndex}].dates`,
          message: 'End date must be after start date',
        })
      }
    }
  })

  return errors
}

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates phone format (lenient check)
 */
function isValidPhone(phone: string): boolean {
  // Allow various phone formats
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7
}

/**
 * Validates URL format
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validates date range
 */
function isValidDateRange(startDate: string, endDate: string): boolean {
  try {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return end >= start
  } catch {
    return false
  }
}

/**
 * Checks if resume has minimum required content
 */
export function hasMinimumContent(data: ResumeData): boolean {
  // Must have full name
  if (!data.basics.fullName || data.basics.fullName.trim() === '') {
    return false
  }

  // Must have at least one visible section with items
  const hasContentSection = data.sections.some(
    (section) => section.visible && section.items.length > 0
  )

  return hasContentSection
}

/**
 * Calculates resume completeness score (0-100)
 */
export function calculateCompletenessScore(data: ResumeData): number {
  let score = 0
  let maxScore = 0

  // Basics scoring (40 points max)
  maxScore += 40
  if (data.basics.fullName) score += 10
  if (data.basics.title) score += 5
  if (data.basics.summary) score += 10
  if (data.basics.email) score += 5
  if (data.basics.phone) score += 5
  if (data.basics.socials.length > 0) score += 5

  // Sections scoring (60 points max)
  maxScore += 60
  const visibleSections = data.sections.filter((s) => s.visible)
  if (visibleSections.length > 0) score += 20

  const sectionsWithItems = visibleSections.filter((s) => s.items.length > 0)
  if (sectionsWithItems.length > 0) score += 20

  const totalItems = sectionsWithItems.reduce((acc, s) => acc + s.items.length, 0)
  if (totalItems >= 3) score += 10
  if (totalItems >= 6) score += 10

  return Math.round((score / maxScore) * 100)
}
