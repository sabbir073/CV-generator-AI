import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(request: NextRequest) {
  try {
    const { html, pageSize = 'A4' } = await request.json()

    if (!html) {
      return NextResponse.json({ error: 'HTML content is required' }, { status: 400 })
    }

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    // Set page size
    const format = pageSize === 'Letter' ? 'Letter' : 'A4'

    // Set the HTML content
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    })

    // Wait for Tailwind CDN to load and apply styles
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Wait for all fonts and styles to be fully loaded
    await page.evaluate(() => {
      return document.fonts.ready
    })

    // Generate PDF with proper settings for multi-page support
    const pdf = await page.pdf({
      format,
      printBackground: true,
      preferCSSPageSize: true,  // Use CSS @page rules
      displayHeaderFooter: false,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    })

    await browser.close()

    // Return PDF as response
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="resume.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
