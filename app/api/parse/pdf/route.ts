import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { normalizeResumeData, validateResumeData } from '@/lib/utils/normalize-resume-data'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Import pdf-parse dynamically (it's CommonJS)
    const pdfParse = (await import('pdf-parse')) as any
    const pdfData = await (pdfParse.default || pdfParse)(buffer)

    // Extract text from PDF
    const extractedText = pdfData.text

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract text from PDF' },
        { status: 400 }
      )
    }

    // Use Claude to parse the resume text into structured JSON
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Claude API key not configured' },
        { status: 500 }
      )
    }

    const anthropic = new Anthropic({ apiKey })

    const prompt = `You are a resume parser. Extract structured information from the following resume text and return it as valid JSON matching this TypeScript interface:

interface ResumeData {
  basics: {
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
    socials: Array<{
      id: string
      label: string
      url: string
    }>
    photo?: string
  }
  sections: Array<{
    id: string
    type: 'experience' | 'education' | 'projects' | 'skills' | 'certifications' | 'awards' | 'languages' | 'interests' | 'publications' | 'volunteer' | 'custom'
    title: string
    visible: boolean
    items: Array<{
      id: string
      heading?: string
      subheading?: string
      location?: string
      startDate?: string
      endDate?: string
      current?: boolean
      description?: string
      descriptionBullets?: string[]
      techStack?: string[]
      tags?: string[]
      link?: string
      score?: string
      level?: string
    }>
    order: number
  }>
}

Instructions:
1. Extract fullName (complete name), not just "name"
2. Extract professional title/headline
3. Extract summary/objective statement
4. Extract location as object with city and country separately (e.g., {city: "San Francisco", country: "USA"})
5. Extract contact: email, phone, website
6. Extract social links (LinkedIn, GitHub, Twitter, Portfolio, etc.) into socials array:
   - Use id format: 'linkedin', 'github', 'twitter', 'portfolio', etc.
   - Set label: 'LinkedIn', 'GitHub', 'Twitter', 'Portfolio', etc.
   - Include full url
7. Identify and categorize sections:
   - experience: Work history
   - education: Schools, degrees
   - projects: Personal or professional projects
   - skills: Technical skills, grouped by category
   - certifications: Professional certifications
   - awards: Honors and awards
   - languages: Spoken languages with proficiency
   - interests: Hobbies and interests
   - publications: Papers, articles
   - volunteer: Volunteer work
8. For each section item:
   - Use "heading" for primary name (Company name, School name, Project name, Skill category)
   - Use "subheading" for secondary info (Job title, Degree, Role)
   - Extract location if mentioned
   - Parse dates consistently (e.g., "Jan 2020", "2020-01", "January 2020")
   - Set "current" to true if position is ongoing (endDate is "Present", "Current", or similar)
   - Split descriptions into "descriptionBullets" array (one bullet per array item)
   - Extract technologies, tools, frameworks as "techStack" array for experience and projects
   - For skills section, group related skills in "tags" array
   - For education, include GPA or scores in "score" field (e.g., "3.8/4.0", "95%")
   - For skills and languages, extract proficiency level in "level" field (e.g., "Expert", "Advanced", "Intermediate", "Beginner", "Native", "Fluent", "Professional")
   - Include any URLs/links in "link" field
9. Generate unique IDs using format: [type]-[random] (e.g., "exp-a1b2c3", "edu-x9y8z7")
10. Set all sections visible: true
11. Set section order: 0, 1, 2, 3... based on typical resume order (experience first, then education, projects, skills, etc.)
12. Return ONLY valid JSON, no explanations, no markdown code blocks

Resume Text:
${extractedText}

Return the parsed resume as JSON:`

    const message = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    // Extract JSON from response (remove markdown code blocks if present)
    let jsonText = responseText.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '')
    }

    const parsedData = JSON.parse(jsonText)

    // Normalize the parsed data to ensure it matches our schema
    // This handles missing fields, wrong types, and legacy field names
    const normalizedData = normalizeResumeData(parsedData)

    // Validate the normalized data
    const validation = validateResumeData(normalizedData)

    // Log validation warnings (but still return data)
    if (!validation.valid) {
      console.warn('Resume data validation warnings:', validation.errors)
    }

    return NextResponse.json({
      success: true,
      data: normalizedData,
      extractedText: extractedText.substring(0, 500), // Return preview
      warnings: validation.valid ? undefined : validation.errors,
    })
  } catch (error) {
    console.error('PDF parsing error:', error)
    return NextResponse.json(
      {
        error: 'Failed to parse PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
