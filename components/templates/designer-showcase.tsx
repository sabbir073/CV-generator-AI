import { ResumeData } from '@/types/resume'

interface DesignerShowcaseProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function DesignerShowcase({ data }: DesignerShowcaseProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Large Photo Header with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500">
        {photoUrl && (
          <div className="absolute inset-0">
            <img
              src={photoUrl}
              alt={basics.fullName}
              className="h-full w-full object-cover opacity-30 mix-blend-overlay"
            />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-600/80 to-orange-600/80 backdrop-blur-sm">
          <div className="text-center text-white">
            <h1 className="mb-2 text-5xl font-bold tracking-tight drop-shadow-lg">
              {basics.fullName}
            </h1>
            <h2 className="mb-4 text-2xl font-light">{basics.title}</h2>
            <div className="flex justify-center gap-4 text-sm">
              {basics.email && <span>{basics.email}</span>}
              {basics.phone && <span>|</span>}
              {basics.phone && <span>{basics.phone}</span>}
              {basics.location && <span>|</span>}
              {basics.location && <span>{formatLocation(basics.location)}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Grid Layout */}
      <div className="p-8">
        {/* Summary */}
        {basics.summary && (
          <div className="mb-6 rounded-lg bg-gradient-to-r from-pink-50 to-orange-50 p-5 shadow-sm">
            <p className="text-center text-sm leading-relaxed text-gray-700">
              {basics.summary}
            </p>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-6">
          {/* Experience */}
          {sections
            .filter((s) => s.visible && s.type === 'experience')
            .map((section) => (
              <div key={section.id} className="col-span-2">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="break-inside-avoid rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
                    >
                      <div className="mb-2">
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <div className="text-sm font-semibold text-pink-600">
                          {item.subtitle}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.startDate} - {item.endDate || 'Present'}
                        </div>
                      </div>
                      {item.descriptionBullets &&
                        item.descriptionBullets.length > 0 && (
                          <ul className="space-y-1 text-xs text-gray-700">
                            {item.descriptionBullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-pink-500">•</span>
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

          {/* Skills */}
          {sections
            .filter((s) => s.visible && s.type === 'skills')
            .map((section) => (
              <div key={section.id}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="rounded-lg bg-gray-50 p-3">
                      {item.category && (
                        <div className="mb-2 text-xs font-bold uppercase text-pink-600">
                          {item.category}
                        </div>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-gradient-to-r from-pink-100 to-orange-100 px-2.5 py-1 text-xs font-medium text-gray-700"
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

          {/* Education */}
          {sections
            .filter((s) => s.visible && s.type === 'education')
            .map((section) => (
              <div key={section.id}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="break-inside-avoid rounded-lg border-l-4 border-pink-500 bg-gray-50 p-3"
                    >
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <div className="text-sm text-pink-600">{item.subtitle}</div>
                      <div className="text-xs text-gray-500">
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
              <div key={section.id} className="col-span-2">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      className="break-inside-avoid rounded-lg bg-gradient-to-br from-pink-50 to-orange-50 p-4"
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
              <div key={section.id}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.id} className="text-sm">
                      <span className="font-semibold text-gray-900">
                        {item.title}
                      </span>
                      {item.subtitle && (
                        <span className="text-gray-600"> - {item.subtitle}</span>
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
