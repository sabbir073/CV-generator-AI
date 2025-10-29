import { ResumeData } from '@/types/resume'

interface ExecutiveEliteProps {
  data: ResumeData
}

export function ExecutiveElite({ data }: ExecutiveEliteProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  const formatLocation = (location: { city?: string; country?: string } | string) => {
    if (typeof location === 'string') return location
    if (!location) return ''
    const parts = [location.city, location.country].filter(Boolean)
    return parts.join(', ')
  }

  return (
    <div className="flex min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Dark Sidebar with Photo */}
      <div className="w-[35%] bg-gradient-to-b from-gray-900 to-gray-800 p-8 text-white">
        {/* Profile Photo */}
        {photoUrl && (
          <div className="mb-6">
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-amber-500 shadow-xl">
              <img
                src={photoUrl}
                alt={basics.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-8 space-y-3 text-sm">
          <h3 className="mb-4 border-b border-amber-500 pb-2 text-lg font-bold uppercase tracking-wider">
            Contact
          </h3>
          {basics.email && (
            <div className="flex items-start gap-2">
              <span className="text-amber-500">✉</span>
              <span className="break-all">{basics.email}</span>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-start gap-2">
              <span className="text-amber-500">☎</span>
              <span>{basics.phone}</span>
            </div>
          )}
          {basics.location && (
            <div className="flex items-start gap-2">
              <span className="text-amber-500">⌂</span>
              <span>{formatLocation(basics.location)}</span>
            </div>
          )}
          {basics.linkedin && (
            <div className="flex items-start gap-2">
              <span className="text-amber-500">in</span>
              <span className="break-all">{basics.linkedin}</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {sections
          .filter((s) => s.visible && s.type === 'skills')
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 border-b border-amber-500 pb-2 text-lg font-bold uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id}>
                    {item.category && (
                      <div className="mb-1 text-xs font-semibold uppercase text-amber-500">
                        {item.category}
                      </div>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-gray-700 px-2 py-0.5 text-xs"
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

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 border-b-2 border-amber-500 pb-4">
          <h1 className="mb-2 text-4xl font-bold uppercase tracking-wide text-gray-900">
            {basics.fullName}
          </h1>
          <h2 className="text-xl font-light text-gray-600">{basics.title}</h2>
        </div>

        {/* Summary */}
        {basics.summary && (
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-gray-900">
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
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 text-lg font-bold uppercase tracking-wide text-gray-900">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="mb-1 flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <div className="text-sm font-semibold text-amber-600">
                          {item.subtitle}
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-600">
                        <div>
                          {item.startDate} - {item.endDate || 'Present'}
                        </div>
                        {item.location && <div>{item.location}</div>}
                      </div>
                    </div>
                    {item.descriptionBullets && item.descriptionBullets.length > 0 && (
                      <ul className="ml-4 space-y-1 text-sm text-gray-700">
                        {item.descriptionBullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-amber-500">▸</span>
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
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 text-lg font-bold uppercase tracking-wide text-gray-900">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <div className="text-sm text-amber-600">{item.subtitle}</div>
                      </div>
                      <div className="text-right text-xs text-gray-600">
                        {item.startDate} - {item.endDate || 'Present'}
                      </div>
                    </div>
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
              !['skills', 'experience', 'education'].includes(s.type)
          )
          .map((section) => (
            <div key={section.id} className="mb-6">
              <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-gray-900">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-sm text-gray-700">
                    <span className="font-semibold">{item.title}</span>
                    {item.subtitle && <span> - {item.subtitle}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
