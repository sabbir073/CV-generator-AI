import { ResumeData } from '@/types/resume'

interface CreativePortfolioProps {
  data: ResumeData
}

export function CreativePortfolio({ data }: CreativePortfolioProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  const formatLocation = (location: { city?: string; country?: string } | string) => {
    if (typeof location === 'string') return location
    if (!location) return ''
    const parts = [location.city, location.country].filter(Boolean)
    return parts.join(', ')
  }

  return (
    <div className="min-h-[297mm] w-[210mm] bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8 font-sans">
      {/* Header with Circular Photo */}
      <div className="mb-8 text-center">
        {photoUrl && (
          <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full border-4 border-gradient-to-r from-purple-500 to-blue-500 shadow-2xl ring-4 ring-purple-100">
            <img
              src={photoUrl}
              alt={basics.fullName}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <h1 className="mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-4xl font-bold text-transparent">
          {basics.fullName}
        </h1>
        <h2 className="mb-4 text-xl font-light text-gray-600">{basics.title}</h2>

        {/* Contact Bar */}
        <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-4 text-sm text-gray-600">
          {basics.email && (
            <span className="flex items-center gap-1">
              <span className="text-purple-500">✉</span> {basics.email}
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1">
              <span className="text-purple-500">☎</span> {basics.phone}
            </span>
          )}
          {basics.location && (
            <span className="flex items-center gap-1">
              <span className="text-purple-500">⌂</span> {formatLocation(basics.location)}
            </span>
          )}
        </div>
      </div>

      {/* Summary Box */}
      {basics.summary && (
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="mb-3 text-lg font-bold text-purple-600">About Me</h3>
          <p className="leading-relaxed text-gray-700">{basics.summary}</p>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Skills & Other */}
        <div className="space-y-6">
          {sections
            .filter((s) => s.visible && s.type === 'skills')
            .map((section) => (
              <div
                key={section.id}
                className="rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 p-6 text-white shadow-lg"
              >
                <h3 className="mb-4 text-lg font-bold">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      {item.category && (
                        <div className="mb-2 text-xs font-semibold uppercase opacity-90">
                          {item.category}
                        </div>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm"
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

          {/* Other sidebar sections */}
          {sections
            .filter(
              (s) =>
                s.visible &&
                !['skills', 'experience', 'education', 'projects'].includes(
                  s.type
                )
            )
            .map((section) => (
              <div key={section.id} className="rounded-2xl bg-white p-6 shadow-lg">
                <h3 className="mb-3 text-lg font-bold text-purple-600">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.id} className="text-sm text-gray-700">
                      <div className="font-semibold">{item.title}</div>
                      {item.subtitle && (
                        <div className="text-xs text-gray-500">{item.subtitle}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Right Column - Experience & Education */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {sections
            .filter((s) => s.visible && s.type === 'experience')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="break-inside-avoid relative rounded-xl bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
                    >
                      <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b from-purple-500 to-blue-500"></div>
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <div className="text-sm font-semibold text-purple-600">
                            {item.subtitle}
                          </div>
                        </div>
                        <div className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-600">
                          {item.startDate} - {item.endDate || 'Present'}
                        </div>
                      </div>
                      {item.descriptionBullets &&
                        item.descriptionBullets.length > 0 && (
                          <ul className="ml-2 space-y-1 text-sm text-gray-700">
                            {item.descriptionBullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-400"></span>
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
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="break-inside-avoid rounded-xl bg-white p-4 shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <div className="text-sm text-blue-600">
                            {item.subtitle}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
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
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-800">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  {section.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="break-inside-avoid rounded-xl bg-gradient-to-br from-white to-purple-50 p-4 shadow-md"
                    >
                      <h4 className="mb-1 font-bold text-gray-900">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-gray-600">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
