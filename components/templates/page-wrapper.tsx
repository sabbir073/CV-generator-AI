import { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

/**
 * Page Wrapper Component
 * Wraps resume templates in A4-sized pages with proper pagination
 * Each page is exactly 210mm x 297mm (A4 size)
 */
export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`resume-container ${className}`}>
      {children}
    </div>
  )
}

interface ResumePageProps {
  children: ReactNode
  className?: string
  pageNumber?: number
}

/**
 * Resume Page Component
 * Represents a single A4 page (210mm x 297mm)
 * Use this for multi-page resumes
 */
export function ResumePage({ children, className = '', pageNumber }: ResumePageProps) {
  return (
    <div
      className={`resume-page h-[297mm] w-[210mm] overflow-hidden bg-white ${className}`}
      data-page={pageNumber}
      style={{
        pageBreakAfter: 'always',
        breakAfter: 'page',
      }}
    >
      {children}
    </div>
  )
}
