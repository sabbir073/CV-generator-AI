import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { ResumeData } from '@/types/resume'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function POST(request: NextRequest) {
  try {
    const { resumeData, jobDescription, targetRole, improvementType } = await request.json()

    if (!resumeData) {
      return NextResponse.json({ error: 'Resume data is required' }, { status: 400 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'AI service not configured. Please add ANTHROPIC_API_KEY to .env.local' },
        { status: 500 }
      )
    }

    // Construct the prompt based on improvement type
    const prompt = buildPrompt(resumeData, jobDescription, targetRole, improvementType)

    // Call Claude AI
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

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Parse the improved resume data
    const improvedData = parseClaudeResponse(content.text)

    return NextResponse.json({
      improvedData,
      suggestions: extractSuggestions(content.text),
    })
  } catch (error) {
    console.error('AI improvement error:', error)
    return NextResponse.json(
      {
        error: 'Failed to improve resume',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

function buildPrompt(
  resumeData: ResumeData,
  jobDescription?: string,
  targetRole?: string,
  improvementType?: string
): string {
  const basePrompt = `You are an expert resume writer and career coach. I need you to improve this resume.

Current Resume Data:
${JSON.stringify(resumeData, null, 2)}

${jobDescription ? `Target Job Description:\n${jobDescription}\n\n` : ''}
${targetRole ? `Target Role: ${targetRole}\n\n` : ''}

Improvement Type: ${improvementType || 'optimize'}

Please improve the resume by:
1. Enhancing bullet points to be more impactful and achievement-focused
2. Using strong action verbs
3. Quantifying achievements where possible
4. ${jobDescription ? 'Tailoring the content to match the job description' : 'Making the content more professional and compelling'}
5. Improving the professional summary
6. Ensuring consistency in tone and style

Important: Return ONLY a valid JSON object with the improved resume data in the exact same structure as the input. Do not include any explanatory text outside the JSON.

After the JSON, you can optionally add suggestions on a new line starting with "SUGGESTIONS:"`

  return basePrompt
}

function parseClaudeResponse(response: string): ResumeData {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('No valid JSON found in response')
  } catch (error) {
    console.error('Failed to parse Claude response:', error)
    throw new Error('Failed to parse AI response')
  }
}

function extractSuggestions(response: string): string[] {
  const suggestionsMatch = response.match(/SUGGESTIONS:([\s\S]*)/)
  if (suggestionsMatch) {
    return suggestionsMatch[1]
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
  }
  return []
}
