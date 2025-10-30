import { ResumeData } from '@/types/resume'

interface DynamicProfessionalProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function DynamicProfessional({ data }: DynamicProfessionalProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Header with Angular Photo */}
      <div className="relative bg-gradient-to-r from-orange-500 to-blue-600 px-8 py-6">
        <div className="flex items-start gap-6">
          {photoUrl && (
            <div className="relative h-32 w-32 flex-shrink-0">
              <div className="absolute inset-0 -skew-x-6 transform bg-white shadow-xl"></div>
              <div className="relative h-full w-full -skew-x-6 transform overflow-hidden">
                <img
                  src={photoUrl}
                  alt={basics.fullName}
                  className="h-full w-full skew-x-6 transform object-cover"
                />
              </div>
            </div>
          )}
          <div className="flex-1 text-white">
            <h1 className="mb-2 text-4xl font-bold">
              {basics.fullName}
            </h1>
            <h2 className="mb-4 text-xl font-light">{basics.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm">
              {basics.email && (
                <span className="rounded bg-white/20 px-3 py-1 backdrop-blur-sm">
                  {basics.email}
                </span>
              )}
              {basics.phone && (
                <span className="rounded bg-white/20 px-3 py-1 backdrop-blur-sm">
                  {basics.phone}
                </span>
              )}
              {basics.location && (
                <span className="rounded bg-white/20 px-3 py-1 backdrop-blur-sm">
                  {formatLocation(basics.location)}
                </span>
              )}
              {basics.website && (
                <a
                  href={basics.website}
                  className="rounded bg-white/20 px-3 py-1 backdrop-blur-sm hover:underline"
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
                    className="rounded bg-white/20 px-3 py-1 backdrop-blur-sm hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Summary */}
        {basics.summary && (
          <div className="mb-6 border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-transparent p-4">
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
                  <div className="mb-3 -skew-x-6 transform bg-gradient-to-r from-orange-500 to-blue-600 px-3 py-2">
                    <h3 className="skew-x-6 transform text-sm font-bold uppercase tracking-wider text-white">
                      {section.titleOverride || section.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id}>
                        {item.heading && (
                          <div className="mb-1 text-xs font-bold text-orange-600">
                            {item.heading}
                          </div>
                        )}
                        {item.tags && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="rounded-sm bg-blue-100 px-2 py-1 text-xs text-blue-700"
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
                  <div className="mb-3 -skew-x-6 transform bg-gradient-to-r from-orange-500 to-blue-600 px-3 py-2">
                    <h3 className="skew-x-6 transform text-sm font-bold uppercase tracking-wider text-white">
                      {section.titleOverride || section.title}
                    </h3>
                  </div>
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

          {/* Right Column */}
          <div className="col-span-2 space-y-6">
            {/* Experience */}
            {sections
              .filter((s) => s.visible && s.type === 'experience')
              .map((section) => (
                <div key={section.id}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-blue-600"></div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                      {section.titleOverride || section.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="break-inside-avoid border-l-4 border-orange-500 bg-gray-50 p-4 transition-all hover:border-blue-600 hover:shadow-md"
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {item.heading}
                            </h4>
                            <div className="text-sm font-semibold text-orange-600">
                              {item.subheading}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            {item.startDate} - {item.endDate || 'Present'}
                          </div>
                        </div>
                        {item.descriptionBullets &&
                          item.descriptionBullets.length > 0 && (
                            <ul className="ml-2 space-y-1 text-sm text-gray-700">
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
                                className="rounded-sm bg-orange-100 px-2 py-0.5 text-xs text-orange-700"
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

            {/* Education */}
            {sections
              .filter((s) => s.visible && s.type === 'education')
              .map((section) => (
                <div key={section.id}>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-blue-600"></div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                      {section.titleOverride || section.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="break-inside-avoid border-l-4 border-blue-500 bg-gray-50 p-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {item.heading}
                            </h4>
                            <div className="text-sm text-blue-600">
                              {item.subheading}
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
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-blue-600"></div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                      {section.titleOverride || section.title}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.id} className="break-inside-avoid bg-gray-50 p-3">
                        <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        {item.description && (
                          <p className="mt-1 text-sm text-gray-700">
                            {item.description}
                          </p>
                        )}
                        {item.techStack && item.techStack.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="rounded-sm bg-orange-100 px-2 py-0.5 text-xs text-orange-700"
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
    </div>
  )
}
