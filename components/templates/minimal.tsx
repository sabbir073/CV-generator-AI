import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export function MinimalTemplate({ data }: TemplateProps) {
  const { basics, sections } = data
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order)

  return (
    <div className="bg-white p-16 font-sans text-gray-900" style={{ minHeight: '29.7cm' }}>
      {/* Header Section - Ultra Clean */}
      <header className="mb-12">
        <h1 className="text-5xl font-light tracking-tight text-black">{basics.fullName}</h1>
        {basics.title && (
          <p className="mt-3 text-xl font-light text-gray-600">{basics.title}</p>
        )}
      </header>

      {/* Contact Information - Minimal Grid */}
      <section className="mb-12 grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
        {basics.email && (
          <div>
            <span className="font-medium text-gray-900">Email</span>
            <p>{basics.email}</p>
          </div>
        )}
        {basics.phone && (
          <div>
            <span className="font-medium text-gray-900">Phone</span>
            <p>{basics.phone}</p>
          </div>
        )}
        {(basics.location.city || basics.location.country) && (
          <div>
            <span className="font-medium text-gray-900">Location</span>
            <p>{[basics.location.city, basics.location.country].filter(Boolean).join(', ')}</p>
          </div>
        )}
        {basics.website && (
          <div>
            <span className="font-medium text-gray-900">Website</span>
            <p>{basics.website.replace(/^https?:\/\//, '')}</p>
          </div>
        )}
        {basics.socials.map((social) => (
          <div key={social.id}>
            <span className="font-medium text-gray-900">{social.label}</span>
            <p>{social.url.replace(/^https?:\/\//, '')}</p>
          </div>
        ))}
      </section>

      {/* Professional Summary */}
      {basics.summary && (
        <section className="mb-12">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-900">
            About
          </h2>
          <p className="leading-relaxed text-gray-700">{basics.summary}</p>
        </section>
      )}

      {/* Sections */}
      {visibleSections.map((section) => (
        <section key={section.id} className="mb-12">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gray-900">
            {section.titleOverride || section.title}
          </h2>

          <div className="space-y-8">
            {section.type === 'skills' ? (
              // Skills Section - Clean List
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id}>
                    {item.heading && (
                      <h3 className="mb-2 font-medium text-gray-900">{item.heading}</h3>
                    )}
                    {item.tags && (
                      <p className="text-gray-700">{item.tags.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Other Sections
              section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid space-y-3">
                  <div>
                    {item.heading && (
                      <h3 className="font-semibold text-black">{item.heading}</h3>
                    )}
                    <div className="mt-1 flex items-baseline justify-between gap-4">
                      {item.subheading && (
                        <p className="text-gray-700">{item.subheading}</p>
                      )}
                      {(item.startDate || item.endDate) && (
                        <p className="text-sm text-gray-500">
                          {item.startDate} — {item.current ? 'Present' : item.endDate}
                        </p>
                      )}
                    </div>
                    {item.location && !item.startDate && (
                      <p className="text-sm text-gray-500">{item.location}</p>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-gray-700">{item.description}</p>
                  )}

                  {item.descriptionBullets && item.descriptionBullets.length > 0 && (
                    <ul className="space-y-1 text-gray-700">
                      {item.descriptionBullets.map((bullet, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-gray-400">—</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.techStack && item.techStack.length > 0 && (
                    <p className="text-sm text-gray-600">{item.techStack.join(', ')}</p>
                  )}

                  {item.link && (
                    <p className="text-sm text-gray-500">{item.link.replace(/^https?:\/\//, '')}</p>
                  )}

                  {item.score && (
                    <p className="text-sm text-gray-600">{item.score}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  )
}
