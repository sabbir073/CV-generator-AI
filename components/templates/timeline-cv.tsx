import { ResumeData } from '@/types/resume'

interface TimelineCVProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function TimelineCV({ data }: TimelineCVProps) {
  const { basics, sections } = data

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-8 border-b-2 border-purple-600 pb-6 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          {basics.fullName}
        </h1>
        <h2 className="mb-4 text-xl font-light text-gray-600">{basics.title}</h2>
        <div className="flex justify-center gap-6 text-sm text-gray-600">
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
          <div className="mt-3 flex justify-center gap-4 text-sm">
            {basics.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                className="text-purple-600 hover:underline"
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
        <div className="mb-6 rounded-lg bg-purple-50 p-4">
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
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-purple-600">
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      {item.heading && (
                        <div className="mb-1 text-xs font-semibold text-gray-900">
                          {item.heading}
                        </div>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1">
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
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-purple-600">
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
            ))}
        </div>

        {/* Right Column - Timeline */}
        <div className="col-span-2 space-y-6">
          {/* Experience Timeline */}
          {sections
            .filter((s) => s.visible && s.type === 'experience')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
                <div className="relative border-l-2 border-purple-300 pl-6 space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[1.6rem] top-1 h-4 w-4 rounded-full border-4 border-purple-600 bg-white"></div>

                      <div className="mb-2">
                        <div className="mb-1 inline-block rounded bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                          {item.startDate} - {item.endDate || 'Present'}
                        </div>
                        <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        <div className="text-sm font-semibold text-purple-600">
                          {item.subheading}
                        </div>
                      </div>
                      {item.descriptionBullets &&
                        item.descriptionBullets.length > 0 && (
                          <ul className="space-y-1 text-sm text-gray-700">
                            {item.descriptionBullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-2">
                                <span className="text-purple-500">•</span>
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
                              className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700"
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

          {/* Education Timeline */}
          {sections
            .filter((s) => s.visible && s.type === 'education')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
                <div className="relative border-l-2 border-purple-300 pl-6 space-y-4">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[1.6rem] top-1 h-4 w-4 rounded-full border-4 border-purple-400 bg-white"></div>

                      <div className="mb-1 inline-block rounded bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                        {item.startDate} - {item.endDate || 'Present'}
                      </div>
                      <h4 className="font-bold text-gray-900">{item.heading}</h4>
                      <div className="text-sm text-purple-600">
                        {item.subheading}
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
                <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid border-l-4 border-purple-400 pl-3">
                      <h4 className="font-bold text-gray-900">{item.heading}</h4>
                      {item.description && (
                        <p className="text-sm text-gray-700">{item.description}</p>
                      )}
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700"
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
