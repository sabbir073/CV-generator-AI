import { ResumeData } from '@/types/resume'

interface BoxedSectionsProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function BoxedSections({ data }: BoxedSectionsProps) {
  const { basics, sections } = data

  const colors = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500' },
    green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-500' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-500' },
  }

  return (
    <div className="min-h-[297mm] w-[210mm] bg-gray-50 p-8 font-sans text-gray-800">
      {/* Header Box */}
      <div className="mb-6 rounded-xl border-l-4 border-blue-500 bg-white p-6 shadow-md">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          {basics.fullName}
        </h1>
        <h2 className="mb-4 text-xl text-gray-600">{basics.title}</h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>|</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>|</span>}
          {basics.location && <span>{formatLocation(basics.location)}</span>}
          {basics.website && <span>|</span>}
          {basics.website && (
            <a
              href={basics.website}
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {basics.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
        {basics.socials && basics.socials.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm">
            {basics.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Summary Box */}
      {basics.summary && (
        <div className="mb-6 rounded-xl border-l-4 border-green-500 bg-white p-5 shadow-md">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-green-700">
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
          {/* Skills Box */}
          {sections
            .filter((s) => s.visible && s.type === 'skills')
            .map((section) => (
              <div
                key={section.id}
                className="rounded-xl border-l-4 border-purple-500 bg-white p-5 shadow-md"
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-purple-700">
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      {item.heading && (
                        <div className="mb-2 text-xs font-bold text-gray-900">
                          {item.heading}
                        </div>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700"
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

          {/* Education Box */}
          {sections
            .filter((s) => s.visible && s.type === 'education')
            .map((section) => (
              <div
                key={section.id}
                className="rounded-xl border-l-4 border-pink-500 bg-white p-5 shadow-md"
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-pink-700">
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      <h4 className="font-bold text-gray-900">{item.heading}</h4>
                      <div className="text-xs text-pink-600">
                        {item.subheading}
                      </div>
                      <div className="text-xs text-gray-600">
                        {item.startDate} - {item.endDate || 'Present'}
                      </div>
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
            .map((section, idx) => {
              const colorKeys = Object.keys(colors) as Array<keyof typeof colors>
              const color = colors[colorKeys[idx % colorKeys.length]]
              return (
                <div
                  key={section.id}
                  className={`rounded-xl border-l-4 ${color.border} bg-white p-5 shadow-md`}
                >
                  <h3 className={`mb-4 text-sm font-bold uppercase tracking-wider ${color.text}`}>
                    {section.titleOverride || section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div key={item.id} className="text-sm">
                        <div className="font-semibold text-gray-900">
                          {item.heading}
                        </div>
                        {item.subheading && (
                          <div className="text-xs text-gray-600">
                            {item.subheading}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Experience Box */}
          {sections
            .filter((s) => s.visible && s.type === 'experience')
            .map((section) => (
              <div
                key={section.id}
                className="rounded-xl border-l-4 border-orange-500 bg-white p-5 shadow-md"
              >
                <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-orange-700">
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      <div className="mb-2 flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {item.heading}
                          </h4>
                          <div className="text-sm font-semibold text-orange-600">
                            {item.subheading}
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
                                <span className="text-orange-500">▸</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* Projects Box */}
          {sections
            .filter((s) => s.visible && s.type === 'projects')
            .map((section) => (
              <div
                key={section.id}
                className="rounded-xl border-l-4 border-blue-500 bg-white p-5 shadow-md"
              >
                <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-blue-700">
                  {section.titleOverride || section.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="rounded-lg bg-blue-50 p-3">
                      <h4 className="mb-1 font-bold text-gray-900">
                        {item.heading}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-gray-700">
                          {item.description}
                        </p>
                      )}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
                            >
                              {tech}
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
      </div>
    </div>
  )
}
