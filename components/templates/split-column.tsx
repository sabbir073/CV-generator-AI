import { ResumeData } from '@/types/resume'

interface SplitColumnProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function SplitColumn({ data }: SplitColumnProps) {
  const { basics, sections } = data

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Header */}
      <div className="bg-green-600 px-8 py-8 text-white">
        <h1 className="mb-2 text-4xl font-bold">{basics.fullName}</h1>
        <h2 className="mb-4 text-xl font-light">{basics.title}</h2>
        <div className="flex flex-wrap gap-4 text-sm">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{formatLocation(basics.location)}</span>}
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
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
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

      {/* Summary */}
      {basics.summary && (
        <div className="border-b border-gray-200 px-8 py-6">
          <p className="text-sm leading-relaxed text-gray-700">
            {basics.summary}
          </p>
        </div>
      )}

      {/* Two Equal Columns */}
      <div className="grid h-full grid-cols-2">
        {/* Left Column */}
        <div className="border-r border-gray-200 p-8 space-y-6">
          {/* Experience */}
          {sections
            .filter((s) => s.visible && s.type === 'experience')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="h-6 w-1 bg-green-600"></span>
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      <div className="mb-2">
                        <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        <div className="text-sm font-semibold text-green-600">
                          {item.subheading}
                        </div>
                        <div className="text-xs text-gray-600">
                          {item.startDate} - {item.endDate || 'Present'}
                        </div>
                      </div>
                      {item.descriptionBullets &&
                        item.descriptionBullets.length > 0 && (
                          <ul className="ml-4 space-y-1 text-xs text-gray-700">
                            {item.descriptionBullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-green-600">▸</span>
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
                              className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700"
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

          {/* Projects */}
          {sections
            .filter((s) => s.visible && s.type === 'projects')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="h-6 w-1 bg-green-600"></span>
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      <h4 className="font-bold text-gray-900">{item.heading}</h4>
                      {item.description && (
                        <p className="text-xs text-gray-700">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

        {/* Right Column */}
        <div className="p-8 space-y-6">
          {/* Education */}
          {sections
            .filter((s) => s.visible && s.type === 'education')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="h-6 w-1 bg-green-600"></span>
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      <h4 className="font-bold text-gray-900">{item.heading}</h4>
                      <div className="text-sm text-green-600">
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

          {/* Skills */}
          {sections
            .filter((s) => s.visible && s.type === 'skills')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="h-6 w-1 bg-green-600"></span>
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      {item.heading && (
                        <div className="mb-2 text-xs font-bold uppercase text-green-700">
                          {item.heading}
                        </div>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-green-100 px-2 py-1 text-xs text-green-700"
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
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                  <span className="h-6 w-1 bg-green-600"></span>
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div key={item.id} className="text-sm">
                      <span className="font-semibold text-gray-900">
                        {item.heading}
                      </span>
                      {item.subheading && (
                        <span className="text-gray-700"> - {item.subheading}</span>
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
