import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ResumeData, ResumeSection, ResumeItem, SectionType } from '@/types/resume'
import { defaultResumeData } from '@/data/default-resume'

interface ResumeStore {
  // State
  resumeData: ResumeData
  selectedTemplateId: string
  isPreviewMode: boolean
  isDirty: boolean

  // Actions - Basics
  updateBasics: (basics: Partial<ResumeData['basics']>) => void

  // Actions - Sections
  addSection: (type: SectionType) => void
  removeSection: (sectionId: string) => void
  updateSection: (sectionId: string, updates: Partial<ResumeSection>) => void
  reorderSections: (sections: ResumeSection[]) => void
  toggleSectionVisibility: (sectionId: string) => void

  // Actions - Items
  addItem: (sectionId: string, item: Partial<ResumeItem>) => void
  updateItem: (sectionId: string, itemId: string, updates: Partial<ResumeItem>) => void
  removeItem: (sectionId: string, itemId: string) => void
  reorderItems: (sectionId: string, items: ResumeItem[]) => void

  // Actions - Template & Metadata
  setTemplate: (templateId: string) => void
  updateMetadata: (metadata: Partial<ResumeData['metadata']>) => void

  // Actions - Utility
  loadResumeData: (data: ResumeData) => void
  resetResume: () => void
  setPreviewMode: (enabled: boolean) => void
  markClean: () => void
}

const generateId = () => Math.random().toString(36).substring(2, 11)

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      // Initial State
      resumeData: defaultResumeData,
      selectedTemplateId: 'modern-professional',
      isPreviewMode: false,
      isDirty: false,

      // Basics Actions
      updateBasics: (basics) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            basics: { ...state.resumeData.basics, ...basics },
          },
          isDirty: true,
        })),

      // Section Actions
      addSection: (type) =>
        set((state) => {
          const newSection: ResumeSection = {
            id: generateId(),
            type,
            title: getSectionDefaultTitle(type),
            visible: true,
            items: [],
            order: state.resumeData.sections.length,
          }
          return {
            resumeData: {
              ...state.resumeData,
              sections: [...state.resumeData.sections, newSection],
            },
            isDirty: true,
          }
        }),

      removeSection: (sectionId) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: state.resumeData.sections.filter((s) => s.id !== sectionId),
          },
          isDirty: true,
        })),

      updateSection: (sectionId, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: state.resumeData.sections.map((section) =>
              section.id === sectionId ? { ...section, ...updates } : section
            ),
          },
          isDirty: true,
        })),

      reorderSections: (sections) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: sections.map((section, index) => ({ ...section, order: index })),
          },
          isDirty: true,
        })),

      toggleSectionVisibility: (sectionId) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: state.resumeData.sections.map((section) =>
              section.id === sectionId ? { ...section, visible: !section.visible } : section
            ),
          },
          isDirty: true,
        })),

      // Item Actions
      addItem: (sectionId, item) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: state.resumeData.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    items: [...section.items, { id: generateId(), ...item } as ResumeItem],
                  }
                : section
            ),
          },
          isDirty: true,
        })),

      updateItem: (sectionId, itemId, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: state.resumeData.sections.map((section) =>
              section.id === sectionId
                ? {
                    ...section,
                    items: section.items.map((item) =>
                      item.id === itemId ? { ...item, ...updates } : item
                    ),
                  }
                : section
            ),
          },
          isDirty: true,
        })),

      removeItem: (sectionId, itemId) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: state.resumeData.sections.map((section) =>
              section.id === sectionId
                ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
                : section
            ),
          },
          isDirty: true,
        })),

      reorderItems: (sectionId, items) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            sections: state.resumeData.sections.map((section) =>
              section.id === sectionId ? { ...section, items } : section
            ),
          },
          isDirty: true,
        })),

      // Template & Metadata Actions
      setTemplate: (templateId) =>
        set({
          selectedTemplateId: templateId,
          isDirty: true,
        }),

      updateMetadata: (metadata) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            metadata: { ...state.resumeData.metadata, ...metadata },
          },
          isDirty: true,
        })),

      // Utility Actions
      loadResumeData: (data) =>
        set({
          resumeData: data,
          isDirty: false,
        }),

      resetResume: () =>
        set({
          resumeData: defaultResumeData,
          selectedTemplateId: 'modern-professional',
          isDirty: false,
        }),

      setPreviewMode: (enabled) =>
        set({
          isPreviewMode: enabled,
        }),

      markClean: () =>
        set({
          isDirty: false,
        }),
    }),
    {
      name: 'resume-builder-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        resumeData: state.resumeData,
        selectedTemplateId: state.selectedTemplateId,
      }),
    }
  )
)

// Helper function to get default section titles
function getSectionDefaultTitle(type: SectionType): string {
  const titles: Record<SectionType, string> = {
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
  return titles[type]
}
