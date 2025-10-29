import { ResumeData } from '@/types/resume'

interface ModernProfessionalPlusProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function ModernProfessionalPlus({ data }: ModernProfessionalPlusProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Top Banner with Photo */}
      <div className="relative bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-8">
        <div className="flex items-center gap-6">
          {photoUrl && (
            <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg border-4 border-white shadow-xl">
              <img
                src={photoUrl}
                alt={basics.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 text-white">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              {basics.fullName}
            </h1>
            <h2 className="mb-3 text-xl font-light">{basics.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              {basics.email && (
                <span className="flex items-center gap-1.5">
                  <span>✉</span> {basics.email}
                </span>
              )}
              {basics.phone && (
                <span className="flex items-center gap-1.5">
                  <span>☎</span> {basics.phone}
                </span>
              )}
              {basics.location && (
                <span className="flex items-center gap-1.5">
                  <span>⌂</span> {formatLocation(basics.location)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Summary */}
        {basics.summary && (
          <div className="mb-6 border-l-4 border-teal-500 bg-teal-50 p-4">
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-teal-700">
              Professional Summary
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">
              {basics.summary}
            </p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Skills */}
            {sections
              .filter((s) => s.visible && s.type === 'skills')
              .map((section) => (
                <div key={section.id}>
                  <h3 className="mb-3 border-b-2 border-teal-500 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        {item.category && (
                          <div className="mb-1 text-xs font-semibold text-teal-600">
                            {item.category}
                          </div>
                        )}
                        {item.tags && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="rounded bg-teal-100 px-2 py-0.5 text-xs text-teal-700"
                              >
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

            {/* Other Sidebar Sections */}
            {sections
              .filter(
                (s) =>
                  s.visible &&
                  !['skills', 'experience', 'education', 'projects'].includes(
                    s.type
                  )
              )
              .map((section) => (
                <div key={section.id}>
                  <h3 className="mb-3 border-b-2 border-teal-500 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div key={item.id} className="text-sm">
                        <div className="font-semibold text-gray-900">
                          {item.title}
                        </div>
                        {item.subtitle && (
                          <div className="text-xs text-gray-600">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            {sections
              .filter((s) => s.visible && s.type === 'experience')
              .map((section) => (
                <div key={section.id}>
                  <h3 className="mb-4 border-b-2 border-teal-500 pb-2 text-lg font-bold uppercase tracking-wider text-gray-900">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id} className="break-inside-avoid">
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {item.title}
                            </h4>
                            <div className="text-sm font-semibold text-teal-600">
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
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-500"></span>
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

            {/* Education */}
            {sections
              .filter((s) => s.visible && s.type === 'education')
              .map((section) => (
                <div key={section.id}>
                  <h3 className="mb-4 border-b-2 border-teal-500 pb-2 text-lg font-bold uppercase tracking-wider text-gray-900">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id} className="break-inside-avoid">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {item.title}
                            </h4>
                            <div className="text-sm text-teal-600">
                              {item.subtitle}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            {item.startDate} - {item.endDate || 'Present'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {/* Projects */}
            {sections
              .filter((s) => s.visible && s.type === 'projects')
              .map((section) => (
                <div key={section.id}>
                  <h3 className="mb-4 border-b-2 border-teal-500 pb-2 text-lg font-bold uppercase tracking-wider text-gray-900">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id} className="break-inside-avoid">
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        {item.description && (
                          <p className="mt-1 text-sm text-gray-700">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
