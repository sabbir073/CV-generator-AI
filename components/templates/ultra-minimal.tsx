import { ResumeData } from '@/types/resume'

interface UltraMinimalProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function UltraMinimal({ data }: UltraMinimalProps) {
  const { basics, sections } = data

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-16 font-sans text-gray-900">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="mb-3 text-3xl font-light tracking-wide">
          {basics.fullName}
        </h1>
        <div className="mb-6 h-px w-24 mx-auto bg-gray-300"></div>
        <h2 className="mb-6 text-base font-light text-gray-600">
          {basics.title}
        </h2>
        <div className="flex justify-center gap-8 text-xs text-gray-500">
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
          <div className="mt-3 flex justify-center gap-8 text-xs text-gray-500">
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
        <div className="mb-16">
          <p className="mx-auto max-w-2xl text-center text-sm leading-loose text-gray-600">
            {basics.summary}
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Experience */}
        {sections
          .filter((s) => s.visible && s.type === 'experience')
          .map((section) => (
            <div key={section.id}>
              <h3 className="mb-8 text-center text-xs font-light uppercase tracking-[0.3em] text-gray-400">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-10">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="mb-4 text-center">
                      <h4 className="mb-1 text-sm font-normal text-gray-900">
                        {item.heading}
                      </h4>
                      <div className="mb-1 text-xs text-gray-500">
                        {item.subheading}
                      </div>
                      <div className="text-xs text-gray-400">
                        {item.startDate} - {item.endDate || 'Present'}
                      </div>
                    </div>
                    {item.descriptionBullets &&
                      item.descriptionBullets.length > 0 && (
                        <div className="space-y-2 text-xs leading-relaxed text-gray-600">
                          {item.descriptionBullets.map((bullet, idx) => (
                            <div key={idx}>{bullet}</div>
                          ))}
                        </div>
                      )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-3 flex flex-wrap justify-center gap-4">
                        {item.techStack.map((tech, idx) => (
                          <span key={idx} className="text-xs text-gray-500">
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
              <h3 className="mb-8 text-center text-xs font-light uppercase tracking-[0.3em] text-gray-400">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center">
                    <h4 className="mb-1 text-sm font-normal text-gray-900">
                      {item.heading}
                    </h4>
                    <div className="mb-1 text-xs text-gray-500">
                      {item.subheading}
                    </div>
                    <div className="text-xs text-gray-400">
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
              <h3 className="mb-8 text-center text-xs font-light uppercase tracking-[0.3em] text-gray-400">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center">
                    {item.heading && (
                      <div className="mb-2 text-xs font-normal text-gray-900">
                        {item.heading}
                      </div>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap justify-center gap-4">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs text-gray-500">
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

        {/* Projects */}
        {sections
          .filter((s) => s.visible && s.type === 'projects')
          .map((section) => (
            <div key={section.id}>
              <h3 className="mb-8 text-center text-xs font-light uppercase tracking-[0.3em] text-gray-400">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center">
                    <h4 className="mb-2 text-sm font-normal text-gray-900">
                      {item.heading}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-gray-600">{item.description}</p>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap justify-center gap-4">
                        {item.techStack.map((tech, idx) => (
                          <span key={idx} className="text-xs text-gray-500">
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
            <div key={section.id}>
              <h3 className="mb-8 text-center text-xs font-light uppercase tracking-[0.3em] text-gray-400">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center text-xs">
                    <span className="font-normal text-gray-900">
                      {item.heading}
                    </span>
                    {item.subheading && (
                      <span className="text-gray-500"> - {item.subheading}</span>
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
