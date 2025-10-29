import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

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
    const pdfParse = (await import('pdf-parse')).default
    const pdfData = await pdfParse(buffer)

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
    name: string
    title: string
    email: string
    phone: string
    location: string
    website?: string
    linkedin?: string
    github?: string
    summary?: string
  }
  sections: Array<{
    id: string
    type: 'experience' | 'education' | 'projects' | 'skills' | 'certifications' | 'awards' | 'languages' | 'interests' | 'publications' | 'volunteer' | 'custom'
    title: string
    visible: boolean
    items: Array<{
      id: string
      title?: string
      subtitle?: string
      description?: string
      startDate?: string
      endDate?: string
      location?: string
      url?: string
      descriptionBullets?: string[]
      tags?: string[]
      category?: string
      level?: string
    }>
  }>
}

Instructions:
1. Extract all personal information (name, title, contact details)
2. Identify and categorize sections (experience, education, projects, skills, etc.)
3. Extract bullet points as arrays
4. Extract skills, technologies as tags
5. Generate unique IDs using format: type-timestamp-random
6. Set all sections to visible: true
7. Parse dates in a consistent format (e.g., "Jan 2020" or "2020-01")
8. Return ONLY valid JSON, no explanations or markdown

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

    return NextResponse.json({
      success: true,
      data: parsedData,
      extractedText: extractedText.substring(0, 500), // Return preview
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
