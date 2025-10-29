import { ResumeData } from '@/types/resume'

interface GradientHeaderProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function GradientHeader({ data }: GradientHeaderProps) {
  const { basics, sections } = data

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Large Gradient Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 px-8 py-12 text-white">
        <h1 className="mb-3 text-5xl font-bold tracking-tight">
          {basics.fullName}
        </h1>
        <h2 className="mb-6 text-2xl font-light text-purple-100">
          {basics.title}
        </h2>
        <div className="flex flex-wrap gap-6 text-sm">
          {basics.email && (
            <span className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
              <span>✉</span> {basics.email}
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
              <span>☎</span> {basics.phone}
            </span>
          )}
          {basics.location && (
            <span className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 backdrop-blur-sm">
              <span>⌂</span> {formatLocation(basics.location)}
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Summary */}
        {basics.summary && (
          <div className="mb-6 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-5">
            <p className="text-sm leading-relaxed text-gray-700">
              {basics.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {sections
          .filter((s) => s.visible && s.type === 'experience')
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold uppercase tracking-wider text-transparent">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <div className="text-sm font-semibold text-purple-600">
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
                              <span className="text-purple-600">▸</span>
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
              <div key={section.id}>
                <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold uppercase tracking-wider text-transparent">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <div className="text-sm text-purple-600">
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

          {/* Skills */}
          {sections
            .filter((s) => s.visible && s.type === 'skills')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold uppercase tracking-wider text-transparent">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      {item.category && (
                        <div className="mb-2 text-xs font-bold uppercase text-blue-600">
                          {item.category}
                        </div>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-1 text-xs text-gray-700"
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
        </div>

        {/* Projects */}
        {sections
          .filter((s) => s.visible && s.type === 'projects')
          .map((section) => (
            <div key={section.id} className="mt-6">
              <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold uppercase tracking-wider text-transparent">
                {section.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="break-inside-avoid rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-4"
                  >
                    <h4 className="mb-1 font-bold text-gray-900">{item.title}</h4>
                    {item.description && (
                      <p className="text-xs text-gray-700">{item.description}</p>
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
              !['skills', 'experience', 'education', 'projects'].includes(
                s.type
              )
          )
          .map((section) => (
            <div key={section.id} className="mt-6">
              <h3 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-lg font-bold uppercase tracking-wider text-transparent">
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
    </div>
  )
}
