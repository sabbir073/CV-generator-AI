import { ResumeData } from '@/types/resume'

interface TechInnovatorProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function TechInnovator({ data }: TechInnovatorProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  return (
    <div className="min-h-[297mm] w-[210mm] bg-gradient-to-br from-blue-50 to-cyan-50 font-sans text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="mb-2 text-4xl font-bold text-white">
              {basics.fullName}
            </h1>
            <h2 className="mb-4 text-xl font-light text-blue-100">
              {basics.title}
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-white">
              {basics.email && (
                <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                  <span>✉</span> {basics.email}
                </span>
              )}
              {basics.phone && (
                <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                  <span>☎</span> {basics.phone}
                </span>
              )}
              {basics.location && (
                <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                  <span>⌂</span> {formatLocation(basics.location)}
                </span>
              )}
            </div>
          </div>
          {photoUrl && (
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rotate-45 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-400"></div>
              <div className="absolute inset-2 rotate-45 overflow-hidden rounded-lg">
                <img
                  src={photoUrl}
                  alt={basics.fullName}
                  className="h-full w-full -rotate-45 scale-150 object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Summary */}
        {basics.summary && (
          <div className="mb-6 rounded-xl border-l-4 border-blue-500 bg-white p-5 shadow-md">
            <div className="mb-2 flex items-center gap-2 text-blue-600">
              <span className="text-lg">▶</span>
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Professional Profile
              </h3>
            </div>
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
                <div
                  key={section.id}
                  className="rounded-xl bg-white p-5 shadow-md"
                >
                  <div className="mb-4 flex items-center gap-2 text-blue-600">
                    <span className="text-lg">◆</span>
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        {item.category && (
                          <div className="mb-2 text-xs font-bold uppercase text-cyan-600">
                            {item.category}
                          </div>
                        )}
                        {item.tags && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
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
                <div
                  key={section.id}
                  className="rounded-xl bg-white p-5 shadow-md"
                >
                  <div className="mb-4 flex items-center gap-2 text-blue-600">
                    <span className="text-lg">◆</span>
                    <h3 className="text-sm font-bold uppercase tracking-wider">
                      {section.title}
                    </h3>
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
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xl text-blue-600">▶</span>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                      {section.title}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
                  </div>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="break-inside-avoid rounded-xl bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {item.title}
                            </h4>
                            <div className="text-sm font-semibold text-blue-600">
                              {item.subtitle}
                            </div>
                          </div>
                          <div className="rounded-lg bg-blue-50 px-3 py-1 text-xs text-blue-700">
                            {item.startDate} - {item.endDate || 'Present'}
                          </div>
                        </div>
                        {item.descriptionBullets &&
                          item.descriptionBullets.length > 0 && (
                            <ul className="ml-2 space-y-1 text-sm text-gray-700">
                              {item.descriptionBullets.map((bullet, idx) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="text-cyan-500">▸</span>
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
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xl text-blue-600">▶</span>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                      {section.title}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="break-inside-avoid rounded-xl bg-white p-4 shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {item.title}
                            </h4>
                            <div className="text-sm text-blue-600">
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
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xl text-blue-600">▶</span>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                      {section.title}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-300 to-transparent"></div>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="break-inside-avoid rounded-xl border-l-4 border-cyan-500 bg-white p-4 shadow-md"
                      >
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
