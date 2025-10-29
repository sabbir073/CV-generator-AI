import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export function ClassicElegantTemplate({ data }: TemplateProps) {
  const { basics, sections } = data
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order)

  return (
    <div
      className="bg-white p-12 text-gray-900"
      style={{ minHeight: '29.7cm', fontFamily: 'Georgia, serif' }}
    >
      {/* Header Section - Centered */}
      <header className="mb-10 border-b border-gray-400 pb-6 text-center">
        <h1 className="text-5xl font-bold tracking-wide text-gray-900">{basics.fullName}</h1>
        {basics.title && (
          <p className="mt-3 text-lg italic text-gray-600">{basics.title}</p>
        )}

        {/* Contact Information - Single Line */}
        <div className="mt-4 flex justify-center gap-3 text-sm text-gray-600">
          {basics.location.city && basics.location.country && (
            <>
              <span>{basics.location.city}, {basics.location.country}</span>
              <span>•</span>
            </>
          )}
          {basics.phone && (
            <>
              <span>{basics.phone}</span>
              <span>•</span>
            </>
          )}
          {basics.email && (
            <>
              <span>{basics.email}</span>
            </>
          )}
        </div>

        {/* Website and Socials */}
        {(basics.website || basics.socials.length > 0) && (
          <div className="mt-2 flex justify-center gap-3 text-sm text-gray-600">
            {basics.website && (
              <span>{basics.website.replace(/^https?:\/\//, '')}</span>
            )}
            {basics.socials.map((social, idx) => (
              <span key={social.id}>
                {idx > 0 || basics.website ? '•' : ''} {social.label}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {basics.summary && (
        <section className="mb-8">
          <h2 className="mb-3 border-b border-gray-300 pb-1 text-center text-xl font-bold uppercase tracking-widest text-gray-900">
            Summary
          </h2>
          <p className="text-center leading-relaxed text-gray-700">{basics.summary}</p>
        </section>
      )}

      {/* Sections */}
      {visibleSections.map((section) => (
        <section key={section.id} className="mb-8">
          <h2 className="mb-4 border-b border-gray-300 pb-1 text-center text-xl font-bold uppercase tracking-widest text-gray-900">
            {section.titleOverride || section.title}
          </h2>

          <div className="space-y-5">
            {section.type === 'skills' ? (
              // Skills Section
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="text-center">
                    {item.heading && (
                      <h3 className="mb-2 font-semibold italic text-gray-800">{item.heading}</h3>
                    )}
                    {item.tags && (
                      <p className="text-gray-700">{item.tags.join(' • ')}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Other Sections
              section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {item.heading && (
                        <h3 className="text-lg font-bold text-gray-900">{item.heading}</h3>
                      )}
                      {item.subheading && (
                        <p className="italic text-gray-700">{item.subheading}</p>
                      )}
                    </div>
                    {(item.startDate || item.endDate) && (
                      <div className="text-right text-sm text-gray-600">
                        <p className="italic">
                          {item.startDate} - {item.current ? 'Present' : item.endDate}
                        </p>
                        {item.location && <p>{item.location}</p>}
                      </div>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-gray-700">{item.description}</p>
                  )}

                  {item.descriptionBullets && item.descriptionBullets.length > 0 && (
                    <ul className="ml-5 list-disc space-y-1 text-gray-700">
                      {item.descriptionBullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {item.techStack && item.techStack.length > 0 && (
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Technologies:</span> {item.techStack.join(', ')}
                    </p>
                  )}

                  {item.link && (
                    <p className="text-sm text-gray-600">{item.link}</p>
                  )}

                  {item.score && (
                    <p className="text-sm italic text-gray-600">{item.score}</p>
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
