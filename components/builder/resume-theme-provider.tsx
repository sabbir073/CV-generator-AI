'use client'

import { ReactNode } from 'react'
import { useResumeStore } from '@/lib/store/resume-store'

interface ResumeThemeProviderProps {
  children: ReactNode
}

export function ResumeThemeProvider({ children }: ResumeThemeProviderProps) {
  const metadata = useResumeStore((state) => state.resumeData.metadata)
  const colorScheme = metadata?.colorScheme
  const fontFamily = metadata?.fontFamily
  const typography = metadata?.typography
  const spacingSettings = metadata?.spacingSettings

  const cssVariables = {
    // Colors
    '--resume-primary': colorScheme?.primary || '#2563eb',
    '--resume-secondary': colorScheme?.secondary || '#60a5fa',
    '--resume-accent': colorScheme?.accent || '#3b82f6',
    '--resume-background': colorScheme?.background || '#ffffff',
    '--resume-sidebar-bg': colorScheme?.sidebarBackground || '#1e40af',
    '--resume-header-bg': colorScheme?.headerBackground || '#f8fafc',
    '--resume-text-primary': colorScheme?.textPrimary || '#1f2937',
    '--resume-text-secondary': colorScheme?.textSecondary || '#6b7280',
    '--resume-text-light': colorScheme?.textLight || '#ffffff',
    '--resume-border': colorScheme?.border || '#e5e7eb',
    '--resume-divider': colorScheme?.divider || '#d1d5db',
    '--resume-heading': colorScheme?.headingColor || '#111827',
    '--resume-link': colorScheme?.linkColor || '#2563eb',
    '--resume-icon': colorScheme?.iconColor || '#3b82f6',

    // Typography
    '--resume-font-family': fontFamily || 'Inter, sans-serif',
    '--resume-heading-size': `${typography?.headingFontSize || 24}px`,
    '--resume-subheading-size': `${typography?.subheadingFontSize || 18}px`,
    '--resume-body-size': `${typography?.bodyFontSize || 14}px`,
    '--resume-small-size': `${typography?.smallFontSize || 12}px`,
    '--resume-line-height': `${typography?.lineHeight || 1.5}`,
    '--resume-letter-spacing': `${typography?.letterSpacing || 0}px`,

    // Spacing
    '--resume-section-spacing': `${spacingSettings?.sectionSpacing || 24}px`,
    '--resume-item-spacing': `${spacingSettings?.itemSpacing || 12}px`,
    '--resume-padding': `${spacingSettings?.padding || 16}px`,
  } as React.CSSProperties

  return (
    <>
      <style jsx global>{`
        /* TYPOGRAPHY - Apply to all templates */
        .resume-theme-wrapper {
          font-family: var(--resume-font-family) !important;
          letter-spacing: var(--resume-letter-spacing) !important;
        }

        /* Heading sizes */
        .resume-theme-wrapper h1,
        .resume-theme-wrapper .text-5xl,
        .resume-theme-wrapper .text-4xl,
        .resume-theme-wrapper .text-3xl {
          font-size: var(--resume-heading-size) !important;
          line-height: var(--resume-line-height) !important;
        }

        .resume-theme-wrapper h2,
        .resume-theme-wrapper .text-2xl,
        .resume-theme-wrapper .text-xl {
          font-size: var(--resume-subheading-size) !important;
          line-height: var(--resume-line-height) !important;
        }

        .resume-theme-wrapper h3,
        .resume-theme-wrapper .text-lg {
          font-size: calc(var(--resume-body-size) * 1.1) !important;
          line-height: var(--resume-line-height) !important;
        }

        .resume-theme-wrapper p,
        .resume-theme-wrapper .text-base,
        .resume-theme-wrapper div:not(.text-xs):not(.text-sm):not(.text-lg):not(.text-xl):not(.text-2xl):not(.text-3xl):not(.text-4xl):not(.text-5xl) {
          font-size: var(--resume-body-size) !important;
          line-height: var(--resume-line-height) !important;
        }

        .resume-theme-wrapper .text-sm {
          font-size: calc(var(--resume-body-size) * 0.9) !important;
        }

        .resume-theme-wrapper .text-xs {
          font-size: var(--resume-small-size) !important;
        }

        /* SPACING - Apply to all templates */
        .resume-theme-wrapper section,
        .resume-theme-wrapper .mb-12,
        .resume-theme-wrapper .mb-10,
        .resume-theme-wrapper .mb-8,
        .resume-theme-wrapper .mb-6 {
          margin-bottom: var(--resume-section-spacing) !important;
        }

        .resume-theme-wrapper .space-y-8 > * + *,
        .resume-theme-wrapper .space-y-6 > * + *,
        .resume-theme-wrapper .space-y-4 > * + * {
          margin-top: var(--resume-item-spacing) !important;
        }

        .resume-theme-wrapper .p-16,
        .resume-theme-wrapper .p-12,
        .resume-theme-wrapper .p-8 {
          padding: var(--resume-padding) !important;
        }

        .resume-theme-wrapper .px-16,
        .resume-theme-wrapper .px-12,
        .resume-theme-wrapper .px-8 {
          padding-left: var(--resume-padding) !important;
          padding-right: var(--resume-padding) !important;
        }

        .resume-theme-wrapper .py-16,
        .resume-theme-wrapper .py-12,
        .resume-theme-wrapper .py-8 {
          padding-top: var(--resume-padding) !important;
          padding-bottom: var(--resume-padding) !important;
        }

        /* PRIMARY COLOR - All primary brand colors (blue, indigo, purple, teal, green, etc.) */
        .resume-theme-wrapper .bg-blue-600,
        .resume-theme-wrapper .bg-blue-500,
        .resume-theme-wrapper .bg-indigo-600,
        .resume-theme-wrapper .bg-indigo-500,
        .resume-theme-wrapper .bg-purple-600,
        .resume-theme-wrapper .bg-purple-500,
        .resume-theme-wrapper .bg-teal-600,
        .resume-theme-wrapper .bg-teal-500,
        .resume-theme-wrapper .bg-green-600,
        .resume-theme-wrapper .bg-green-500,
        .resume-theme-wrapper .bg-emerald-600,
        .resume-theme-wrapper .bg-emerald-500 {
          background-color: var(--resume-primary) !important;
        }

        .resume-theme-wrapper .text-blue-600,
        .resume-theme-wrapper .text-blue-500,
        .resume-theme-wrapper .text-indigo-600,
        .resume-theme-wrapper .text-indigo-500,
        .resume-theme-wrapper .text-purple-600,
        .resume-theme-wrapper .text-purple-500,
        .resume-theme-wrapper .text-teal-600,
        .resume-theme-wrapper .text-teal-500,
        .resume-theme-wrapper .text-green-600,
        .resume-theme-wrapper .text-green-500,
        .resume-theme-wrapper .text-emerald-600,
        .resume-theme-wrapper .text-emerald-500 {
          color: var(--resume-primary) !important;
        }

        /* SECONDARY COLOR - Lighter shades */
        .resume-theme-wrapper .bg-blue-400,
        .resume-theme-wrapper .bg-blue-300,
        .resume-theme-wrapper .bg-indigo-400,
        .resume-theme-wrapper .bg-indigo-300,
        .resume-theme-wrapper .bg-purple-400,
        .resume-theme-wrapper .bg-purple-300,
        .resume-theme-wrapper .bg-teal-400,
        .resume-theme-wrapper .bg-teal-300,
        .resume-theme-wrapper .bg-green-400,
        .resume-theme-wrapper .bg-green-300 {
          background-color: var(--resume-secondary) !important;
        }

        .resume-theme-wrapper .text-blue-400,
        .resume-theme-wrapper .text-blue-300,
        .resume-theme-wrapper .text-indigo-400,
        .resume-theme-wrapper .text-indigo-300,
        .resume-theme-wrapper .text-purple-400,
        .resume-theme-wrapper .text-purple-300,
        .resume-theme-wrapper .text-teal-400,
        .resume-theme-wrapper .text-teal-300 {
          color: var(--resume-secondary) !important;
        }

        /* ACCENT COLOR - Amber, orange, yellow for highlights/icons */
        .resume-theme-wrapper .bg-amber-600,
        .resume-theme-wrapper .bg-amber-500,
        .resume-theme-wrapper .bg-amber-400,
        .resume-theme-wrapper .bg-orange-600,
        .resume-theme-wrapper .bg-orange-500,
        .resume-theme-wrapper .bg-orange-400,
        .resume-theme-wrapper .bg-yellow-600,
        .resume-theme-wrapper .bg-yellow-500,
        .resume-theme-wrapper .bg-yellow-400 {
          background-color: var(--resume-accent) !important;
        }

        .resume-theme-wrapper .text-amber-600,
        .resume-theme-wrapper .text-amber-500,
        .resume-theme-wrapper .text-amber-400,
        .resume-theme-wrapper .text-orange-600,
        .resume-theme-wrapper .text-orange-500,
        .resume-theme-wrapper .text-orange-400,
        .resume-theme-wrapper .text-yellow-600,
        .resume-theme-wrapper .text-yellow-500 {
          color: var(--resume-accent) !important;
        }

        .resume-theme-wrapper .border-amber-600,
        .resume-theme-wrapper .border-amber-500,
        .resume-theme-wrapper .border-amber-400,
        .resume-theme-wrapper .border-orange-500,
        .resume-theme-wrapper .border-yellow-500 {
          border-color: var(--resume-accent) !important;
        }

        /* HEADER BACKGROUND - Light backgrounds */
        .resume-theme-wrapper .bg-gray-50,
        .resume-theme-wrapper .bg-gray-100,
        .resume-theme-wrapper .bg-slate-50,
        .resume-theme-wrapper .bg-slate-100,
        .resume-theme-wrapper .bg-blue-50,
        .resume-theme-wrapper .bg-indigo-50 {
          background-color: var(--resume-header-bg) !important;
        }

        /* SIDEBAR BACKGROUND - Dark backgrounds */
        .resume-theme-wrapper .bg-gray-900,
        .resume-theme-wrapper .bg-gray-800,
        .resume-theme-wrapper .bg-gray-700,
        .resume-theme-wrapper .bg-slate-900,
        .resume-theme-wrapper .bg-slate-800,
        .resume-theme-wrapper .bg-blue-900,
        .resume-theme-wrapper .bg-blue-800,
        .resume-theme-wrapper .bg-indigo-900,
        .resume-theme-wrapper .bg-indigo-800 {
          background-color: var(--resume-sidebar-bg) !important;
        }

        /* HEADING TEXT - Strong dark text */
        .resume-theme-wrapper .text-gray-900,
        .resume-theme-wrapper .text-gray-800,
        .resume-theme-wrapper .text-black,
        .resume-theme-wrapper .text-slate-900 {
          color: var(--resume-heading) !important;
        }

        /* PRIMARY TEXT - Body text */
        .resume-theme-wrapper .text-gray-700,
        .resume-theme-wrapper .text-slate-700 {
          color: var(--resume-text-primary) !important;
        }

        /* SECONDARY TEXT - Muted text */
        .resume-theme-wrapper .text-gray-600,
        .resume-theme-wrapper .text-gray-500,
        .resume-theme-wrapper .text-gray-400,
        .resume-theme-wrapper .text-slate-600,
        .resume-theme-wrapper .text-slate-500 {
          color: var(--resume-text-secondary) !important;
        }

        /* LIGHT TEXT - Text on dark backgrounds */
        .resume-theme-wrapper .text-white,
        .resume-theme-wrapper .text-gray-50,
        .resume-theme-wrapper .text-gray-100 {
          color: var(--resume-text-light) !important;
        }

        /* BORDERS */
        .resume-theme-wrapper .border-gray-200,
        .resume-theme-wrapper .border-gray-300,
        .resume-theme-wrapper .border-slate-200,
        .resume-theme-wrapper .border-slate-300 {
          border-color: var(--resume-border) !important;
        }

        .resume-theme-wrapper .border-t-gray-200,
        .resume-theme-wrapper .border-t-gray-300,
        .resume-theme-wrapper .border-b-gray-200,
        .resume-theme-wrapper .border-b-gray-300 {
          border-top-color: var(--resume-divider) !important;
          border-bottom-color: var(--resume-divider) !important;
        }

        /* LINKS */
        .resume-theme-wrapper a {
          color: var(--resume-link) !important;
        }

        /* PAGE BACKGROUND */
        .resume-theme-wrapper .bg-white {
          background-color: var(--resume-background) !important;
        }

        /* GRADIENTS - Convert to solid colors using primary/secondary */
        .resume-theme-wrapper .bg-gradient-to-r,
        .resume-theme-wrapper .bg-gradient-to-b,
        .resume-theme-wrapper .bg-gradient-to-br {
          background-image: none !important;
          background-color: var(--resume-sidebar-bg) !important;
        }
      `}</style>
      <div style={cssVariables} className="resume-theme-wrapper">
        {children}
      </div>
    </>
  )
}
