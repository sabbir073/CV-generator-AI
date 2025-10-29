'use client'

import { useResumeStore } from '@/lib/store/resume-store'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ResumeThemeProvider } from './resume-theme-provider'

// Legacy Templates
import { ModernProfessionalTemplate } from '@/components/templates/modern-professional'
import { ClassicElegantTemplate } from '@/components/templates/classic-elegant'
import { MinimalTemplate } from '@/components/templates/minimal'
import { CreativeTemplate } from '@/components/templates/creative'
import { ATSFriendlyTemplate } from '@/components/templates/ats-friendly'

// With Photo Templates
import { ExecutiveElite } from '@/components/templates/executive-elite'
import { CreativePortfolio } from '@/components/templates/creative-portfolio'
import { ModernProfessionalPlus } from '@/components/templates/modern-professional-plus'
import { DesignerShowcase } from '@/components/templates/designer-showcase'
import { TechInnovator } from '@/components/templates/tech-innovator'
import { CorporateExcellence } from '@/components/templates/corporate-excellence'
import { MinimalistPortrait } from '@/components/templates/minimalist-portrait'
import { BoldStatement } from '@/components/templates/bold-statement'
import { ElegantClassic } from '@/components/templates/elegant-classic'
import { DynamicProfessional } from '@/components/templates/dynamic-professional'

// Without Photo Templates
import { UltraMinimal } from '@/components/templates/ultra-minimal'
import { GeometricModern } from '@/components/templates/geometric-modern'
import { TimelineCV } from '@/components/templates/timeline-cv'
import { SplitColumn } from '@/components/templates/split-column'
import { GradientHeader } from '@/components/templates/gradient-header'
import { SidebarAccent } from '@/components/templates/sidebar-accent'
import { BoxedSections } from '@/components/templates/boxed-sections'
import { ModernLines } from '@/components/templates/modern-lines'
import { MinimalistGrid } from '@/components/templates/minimalist-grid'
import { ProfessionalClean } from '@/components/templates/professional-clean'

export function BuilderPreview() {
  const resumeData = useResumeStore((state) => state.resumeData)
  const selectedTemplateId = useResumeStore((state) => state.selectedTemplateId)

  const renderTemplate = () => {
    switch (selectedTemplateId) {
      // With Photo Templates
      case 'executive-elite':
        return <ExecutiveElite data={resumeData} />
      case 'creative-portfolio':
        return <CreativePortfolio data={resumeData} />
      case 'modern-professional-plus':
        return <ModernProfessionalPlus data={resumeData} />
      case 'designer-showcase':
        return <DesignerShowcase data={resumeData} />
      case 'tech-innovator':
        return <TechInnovator data={resumeData} />
      case 'corporate-excellence':
        return <CorporateExcellence data={resumeData} />
      case 'minimalist-portrait':
        return <MinimalistPortrait data={resumeData} />
      case 'bold-statement':
        return <BoldStatement data={resumeData} />
      case 'elegant-classic':
        return <ElegantClassic data={resumeData} />
      case 'dynamic-professional':
        return <DynamicProfessional data={resumeData} />

      // Without Photo Templates
      case 'ultra-minimal':
        return <UltraMinimal data={resumeData} />
      case 'geometric-modern':
        return <GeometricModern data={resumeData} />
      case 'timeline-cv':
        return <TimelineCV data={resumeData} />
      case 'split-column':
        return <SplitColumn data={resumeData} />
      case 'gradient-header':
        return <GradientHeader data={resumeData} />
      case 'sidebar-accent':
        return <SidebarAccent data={resumeData} />
      case 'boxed-sections':
        return <BoxedSections data={resumeData} />
      case 'modern-lines':
        return <ModernLines data={resumeData} />
      case 'minimalist-grid':
        return <MinimalistGrid data={resumeData} />
      case 'professional-clean':
        return <ProfessionalClean data={resumeData} />

      // Legacy Templates
      case 'modern-professional':
        return <ModernProfessionalTemplate data={resumeData} />
      case 'classic-elegant-legacy':
        return <ClassicElegantTemplate data={resumeData} />
      case 'minimal':
        return <MinimalTemplate data={resumeData} />
      case 'creative':
        return <CreativeTemplate data={resumeData} />
      case 'ats-friendly':
        return <ATSFriendlyTemplate data={resumeData} />

      default:
        return <ExecutiveElite data={resumeData} />
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-muted/30">
      <ScrollArea className="flex-1 scrollbar-thin">
        <div className="flex min-h-full items-start justify-center p-8">
          <ResumeThemeProvider>
            <div className="w-[21cm] shadow-2xl" id="resume-preview">
              {renderTemplate()}
            </div>
          </ResumeThemeProvider>
        </div>
      </ScrollArea>
    </div>
  )
}
