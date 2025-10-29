import { ResumeData } from '@/types/resume'

interface GeometricModernProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function GeometricModern({ data }: GeometricModernProps) {
  const { basics, sections } = data

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Header with Geometric Shapes */}
      <div className="relative bg-gradient-to-br from-teal-500 to-cyan-600 px-8 py-10">
        {/* Decorative Geometric Shapes */}
        <div className="absolute left-4 top-4 h-20 w-20 rotate-45 bg-white/10"></div>
        <div className="absolute right-8 top-8 h-16 w-16 rounded-full bg-white/10"></div>
        <div className="absolute bottom-6 right-20 h-12 w-12 rotate-12 bg-white/10"></div>

        <div className="relative z-10">
          <h1 className="mb-2 text-4xl font-bold text-white">
            {basics.fullName}
          </h1>
          <h2 className="mb-4 text-xl font-light text-teal-100">
            {basics.title}
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-white">
            {basics.email && (
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white"></span>
                {basics.email}
              </span>
            )}
            {basics.phone && (
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white"></span>
                {basics.phone}
              </span>
            )}
            {basics.location && (
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white"></span>
                {formatLocation(basics.location)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Summary */}
        {basics.summary && (
          <div className="relative mb-6 rounded-lg bg-teal-50 p-5">
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-teal-500"></div>
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
                  <div className="relative mb-4 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                      {section.title}
                    </h3>
                    <div className="absolute bottom-0 left-0 h-0.5 w-12 bg-teal-500"></div>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        {item.category && (
                          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-teal-600">
                            <span className="h-2 w-2 rotate-45 bg-teal-500"></span>
                            {item.category}
                          </div>
                        )}
                        {item.tags && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="rounded bg-teal-100 px-2 py-1 text-xs text-teal-700"
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
                  <div className="relative mb-4 pb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                      {section.title}
                    </h3>
                    <div className="absolute bottom-0 left-0 h-0.5 w-12 bg-teal-500"></div>
                  </div>
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
                  <div className="relative mb-4 pb-2">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                      {section.title}
                    </h3>
                    <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-teal-500"></div>
                  </div>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id} className="break-inside-avoid relative pl-6">
                        <div className="absolute left-0 top-2 h-3 w-3 rotate-45 bg-teal-500"></div>
                        <div className="mb-2">
                          <h4 className="font-bold text-gray-900">
                            {item.title}
                          </h4>
                          <div className="text-sm font-semibold text-teal-600">
                            {item.subtitle}
                          </div>
                          <div className="text-xs text-gray-600">
                            {item.startDate} - {item.endDate || 'Present'}
                          </div>
                        </div>
                        {item.descriptionBullets &&
                          item.descriptionBullets.length > 0 && (
                            <ul className="space-y-1 text-sm text-gray-700">
                              {item.descriptionBullets.map((bullet, idx) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="text-teal-500">•</span>
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
                  <div className="relative mb-4 pb-2">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                      {section.title}
                    </h3>
                    <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-teal-500"></div>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id} className="break-inside-avoid relative pl-6">
                        <div className="absolute left-0 top-2 h-3 w-3 rotate-45 bg-cyan-500"></div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <div className="text-sm text-cyan-600">
                          {item.subtitle}
                        </div>
                        <div className="text-xs text-gray-600">
                          {item.startDate} - {item.endDate || 'Present'}
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
                  <div className="relative mb-4 pb-2">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                      {section.title}
                    </h3>
                    <div className="absolute bottom-0 left-0 h-0.5 w-16 bg-teal-500"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="break-inside-avoid rounded-lg border-l-4 border-teal-500 bg-gray-50 p-3"
                      >
                        <h4 className="mb-1 font-bold text-gray-900">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-gray-600">
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
