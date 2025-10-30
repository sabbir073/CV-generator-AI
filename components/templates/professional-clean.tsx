import { ResumeData } from '@/types/resume'

interface ProfessionalCleanProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function ProfessionalClean({ data }: ProfessionalCleanProps) {
  const { basics, sections } = data

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-10 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {basics.fullName}
        </h1>
        <h2 className="mb-4 text-lg text-gray-600">{basics.title}</h2>
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && (
            <>
              <span>•</span>
              <span>{basics.phone}</span>
            </>
          )}
          {basics.location && (
            <>
              <span>•</span>
              <span>{formatLocation(basics.location)}</span>
            </>
          )}
          {basics.linkedin && (
            <>
              <span>•</span>
              <span>{basics.linkedin}</span>
            </>
          )}
          {basics.website && (
            <>
              <span>•</span>
              <a
                href={basics.website}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {basics.website.replace(/^https?:\/\//, '')}
              </a>
            </>
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

      <div className="border-t-2 border-blue-600 pt-6">
        {/* Summary */}
        {basics.summary && (
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-bold uppercase text-blue-700">
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
              <h3 className="mb-4 text-sm font-bold uppercase text-blue-700">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="mb-1 flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        <div className="text-sm text-gray-700">
                          {item.subheading}
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <div>
                          {item.startDate} - {item.endDate || 'Present'}
                        </div>
                        {item.location && (
                          <div className="text-xs">{formatLocation(item.location)}</div>
                        )}
                      </div>
                    </div>
                    {item.descriptionBullets &&
                      item.descriptionBullets.length > 0 && (
                        <ul className="ml-5 list-disc space-y-1 text-sm text-gray-700">
                          {item.descriptionBullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
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
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 text-sm font-bold uppercase text-blue-700">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        <div className="text-sm text-gray-700">
                          {item.subheading}
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.startDate} - {item.endDate || 'Present'}
                      </div>
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
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 text-sm font-bold uppercase text-blue-700">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    {item.heading && (
                      <span className="font-semibold text-gray-900">
                        {item.heading}:{' '}
                      </span>
                    )}
                    {item.tags && (
                      <span className="text-sm text-gray-700">
                        {item.tags.join(', ')}
                      </span>
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
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 text-sm font-bold uppercase text-blue-700">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <h4 className="font-bold text-gray-900">{item.heading}</h4>
                    {item.description && (
                      <p className="text-sm text-gray-700">{item.description}</p>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
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
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 text-sm font-bold uppercase text-blue-700">
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
  )
}
