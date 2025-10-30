import { ResumeData } from '@/types/resume'

interface CorporateExcellenceProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function CorporateExcellence({ data }: CorporateExcellenceProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Header */}
      <div className="border-b-4 border-navy-900 bg-gray-50 px-8 py-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="mb-2 text-4xl font-bold text-gray-900">
              {basics.fullName}
            </h1>
            <h2 className="mb-4 text-xl text-gray-600">{basics.title}</h2>
            <div className="space-y-1 text-sm text-gray-600">
              {basics.email && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Email:</span> {basics.email}
                </div>
              )}
              {basics.phone && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Phone:</span> {basics.phone}
                </div>
              )}
              {basics.location && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Location:</span>{' '}
                  {formatLocation(basics.location)}
                </div>
              )}
              {basics.linkedin && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">LinkedIn:</span>{' '}
                  {basics.linkedin}
                </div>
              )}
              {basics.website && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Website:</span>{' '}
                  <a
                    href={basics.website}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {basics.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
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
          {photoUrl && (
            <div className="ml-6 h-32 w-32 overflow-hidden rounded-sm border-4 border-gray-300 shadow-lg">
              <img
                src={photoUrl}
                alt={basics.fullName}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Summary */}
        {basics.summary && (
          <div className="mb-6">
            <h3 className="mb-3 border-b-2 border-gray-900 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
              Executive Summary
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
              <h3 className="mb-4 border-b-2 border-gray-900 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        <div className="text-sm font-semibold text-gray-700">
                          {item.subheading}
                        </div>
                        {item.location && (
                          <div className="text-xs text-gray-600">
                            {formatLocation(item.location)}
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm font-medium text-gray-600">
                        {item.startDate} - {item.endDate || 'Present'}
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
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
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

        {/* Two Column Layout for Skills and Education */}
        <div className="grid grid-cols-2 gap-6">
          {/* Skills */}
          {sections
            .filter((s) => s.visible && s.type === 'skills')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-3 border-b-2 border-gray-900 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      {item.heading && (
                        <div className="mb-1 text-xs font-bold uppercase text-gray-700">
                          {item.heading}
                        </div>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-sm text-gray-700"
                            >
                              {tag}
                              {idx < item.tags!.length - 1 && ','}
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
                <h3 className="mb-3 border-b-2 border-gray-900 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      <h4 className="font-bold text-gray-900">{item.heading}</h4>
                      <div className="text-sm text-gray-700">
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
        </div>

        {/* Projects */}
        {sections
          .filter((s) => s.visible && s.type === 'projects')
          .map((section) => (
            <div key={section.id} className="mt-6">
              <h3 className="mb-3 border-b-2 border-gray-900 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-2">
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
                            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
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
            <div key={section.id} className="mt-6">
              <h3 className="mb-3 border-b-2 border-gray-900 pb-2 text-sm font-bold uppercase tracking-wider text-gray-900">
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
