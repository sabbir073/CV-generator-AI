import { ResumeData } from '@/types/resume'

interface ModernLinesProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function ModernLines({ data }: ModernLinesProps) {
  const { basics, sections } = data

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-6 border-b-4 border-navy-800 pb-6">
        <h1 className="mb-2 text-4xl font-bold text-navy-900">
          {basics.fullName}
        </h1>
        <h2 className="mb-4 text-xl text-gray-600">{basics.title}</h2>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
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
        <div className="mb-6 border-b border-gray-300 pb-6">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-navy-800">
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
          <div key={section.id} className="mb-6 border-b border-gray-300 pb-6">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
              {section.titleOverride || section.title}
            </h3>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid">
                  <div className="mb-2 flex items-start justify-between border-b border-gray-200 pb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.heading}</h4>
                      <div className="text-sm font-semibold text-navy-700">
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
                            <span className="text-navy-700">•</span>
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
                          className="rounded bg-navy-100 px-2 py-0.5 text-xs text-navy-700"
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Education */}
        {sections
          .filter((s) => s.visible && s.type === 'education')
          .map((section) => (
            <div key={section.id} className="border-b border-gray-300 pb-6">
              <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid border-b border-gray-200 pb-2">
                    <h4 className="font-bold text-gray-900">{item.heading}</h4>
                    <div className="text-sm text-navy-700">{item.subheading}</div>
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
            <div key={section.id} className="border-b border-gray-300 pb-6">
              <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid border-b border-gray-200 pb-2">
                    {item.heading && (
                      <div className="mb-1 text-xs font-bold uppercase text-navy-700">
                        {item.heading}
                      </div>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-sm text-gray-700">
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
          <div key={section.id} className="mt-6 border-b border-gray-300 pb-6">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
              {section.titleOverride || section.title}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid border-b border-gray-200 pb-2">
                  <h4 className="font-bold text-gray-900">{item.heading}</h4>
                  {item.description && (
                    <p className="text-sm text-gray-700">{item.description}</p>
                  )}
                  {item.techStack && item.techStack.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded bg-navy-100 px-2 py-0.5 text-xs text-navy-700"
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
            !['skills', 'experience', 'education', 'projects'].includes(s.type)
        )
        .map((section) => (
          <div key={section.id} className="mt-6 border-b border-gray-300 pb-6">
            <h3 className="mb-4 text-lg font-bold uppercase tracking-wider text-navy-800">
              {section.titleOverride || section.title}
            </h3>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid text-sm">
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
  )
}
