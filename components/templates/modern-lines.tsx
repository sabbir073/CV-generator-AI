import { ResumeData } from '@/types/resume'

interface ModernLinesProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function ModernLines({ data }: ModernLinesProps) {
  const { basics, sections } = data

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-6 border-b-4 border-navy-800 pb-6">
        <h1 className="mb-2 text-4xl font-bold text-navy-900">
          {basics.fullName}
        </h1>
        <h2 className="mb-4 text-xl text-gray-600">{basics.title}</h2>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{formatLocation(basics.location)}</span>}
        </div>
      </div>

      {/* Summary */}
      {basics.summary && (
        <div className="mb-6 border-b border-gray-300 pb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-navy-800">
            Professional Summary
          </h3>
          <p className="text-sm leading-relaxed text-gray-700">
            {basics.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {sections
        .filter((s) => s.visible && s.type === 'experience')
        .map((section) => (
          <div key={section.id} className="mb-6 border-b border-gray-300 pb-6">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid">
                  <div className="mb-2 flex items-start justify-between border-b border-gray-200 pb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <div className="text-sm font-semibold text-navy-700">
                        {item.subtitle}
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      <div>
                        {item.startDate} - {item.endDate || 'Present'}
                      </div>
                      {item.location && <div>{formatLocation(item.location)}</div>}
                    </div>
                  </div>
                  {item.descriptionBullets &&
                    item.descriptionBullets.length > 0 && (
                      <ul className="ml-4 space-y-1 text-sm text-gray-700">
                        {item.descriptionBullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-navy-700">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Education */}
        {sections
          .filter((s) => s.visible && s.type === 'education')
          .map((section) => (
            <div key={section.id} className="border-b border-gray-300 pb-6">
              <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid border-b border-gray-200 pb-2">
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <div className="text-sm text-navy-700">{item.subtitle}</div>
                    <div className="text-xs text-gray-600">
                      {item.startDate} - {item.endDate || 'Present'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        {/* Skills */}
        {sections
          .filter((s) => s.visible && s.type === 'skills')
          .map((section) => (
            <div key={section.id} className="border-b border-gray-300 pb-6">
              <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid border-b border-gray-200 pb-2">
                    {item.category && (
                      <div className="mb-1 text-xs font-bold uppercase text-navy-700">
                        {item.category}
                      </div>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-sm text-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Projects */}
      {sections
        .filter((s) => s.visible && s.type === 'projects')
        .map((section) => (
          <div key={section.id} className="mt-6 border-b border-gray-300 pb-6">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
              {section.title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid border-b border-gray-200 pb-2">
                  <h4 className="font-bold text-gray-900">{item.title}</h4>
                  {item.description && (
                    <p className="text-sm text-gray-700">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

      {/* Other Sections */}
      {sections
        .filter(
          (s) =>
            s.visible &&
            !['skills', 'experience', 'education', 'projects'].includes(s.type)
        )
        .map((section) => (
          <div key={section.id} className="mt-6 border-b border-gray-300 pb-6">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid text-sm">
                  <span className="font-semibold text-gray-900">
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span className="text-gray-700"> - {item.subtitle}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  )
}
