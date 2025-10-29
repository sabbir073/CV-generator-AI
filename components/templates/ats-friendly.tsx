import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export function ATSFriendlyTemplate({ data }: TemplateProps) {
  const { basics, sections } = data
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order)

  return (
    <div
      className="bg-white p-12 font-sans text-black"
      style={{ minHeight: '29.7cm', fontSize: '11pt', lineHeight: '1.5' }}
    >
      {/* Header Section - Simple and Clean */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-black">{basics.fullName}</h1>
        {basics.title && <p className="mt-1 text-lg font-normal">{basics.title}</p>}

        {/* Contact Information - Plain Text */}
        <div className="mt-3 text-sm">
          {basics.email && <p>Email: {basics.email}</p>}
          {basics.phone && <p>Phone: {basics.phone}</p>}
          {(basics.location.city || basics.location.country) && (
            <p>
              Location: {[basics.location.city, basics.location.country].filter(Boolean).join(', ')}
            </p>
          )}
          {basics.website && <p>Website: {basics.website}</p>}
          {basics.socials.map((social) => (
            <p key={social.id}>
              {social.label}: {social.url}
            </p>
          ))}
        </div>
      </header>

      {/* Professional Summary */}
      {basics.summary && (
        <section className="mb-6">
          <h2 className="mb-2 text-lg font-bold uppercase text-black">Professional Summary</h2>
          <p>{basics.summary}</p>
        </section>
      )}

      {/* Sections */}
      {visibleSections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className="mb-3 text-lg font-bold uppercase text-black">
            {section.titleOverride || section.title}
          </h2>

          <div className="space-y-4">
            {section.type === 'skills' ? (
              // Skills Section - Simple List Format
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id}>
                    {item.heading && <p className="font-bold">{item.heading}</p>}
                    {item.tags && <p>{item.tags.join(', ')}</p>}
                  </div>
                ))}
              </div>
            ) : (
              // Other Sections - Standard Format
              section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid space-y-1">
                  {item.heading && <p className="font-bold">{item.heading}</p>}

                  {item.subheading && <p>{item.subheading}</p>}

                  {(item.startDate || item.endDate || item.location) && (
                    <p className="text-sm">
                      {item.startDate && item.endDate && (
                        <span>
                          {item.startDate} - {item.current ? 'Present' : item.endDate}
                        </span>
                      )}
                      {item.location && (
                        <span>
                          {item.startDate || item.endDate ? ' | ' : ''}
                          {item.location}
                        </span>
                      )}
                    </p>
                  )}

                  {item.description && <p>{item.description}</p>}

                  {item.descriptionBullets && item.descriptionBullets.length > 0 && (
                    <ul className="ml-5 list-disc">
                      {item.descriptionBullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {item.techStack && item.techStack.length > 0 && (
                    <p>
                      <span className="font-bold">Technologies:</span> {item.techStack.join(', ')}
                    </p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <p>
                      <span className="font-bold">Tags:</span> {item.tags.join(', ')}
                    </p>
                  )}

                  {item.link && (
                    <p>
                      <span className="font-bold">Link:</span> {item.link}
                    </p>
                  )}

                  {item.score && (
                    <p>
                      <span className="font-bold">Score:</span> {item.score}
                    </p>
                  )}

                  {item.level && (
                    <p>
                      <span className="font-bold">Level:</span> {item.level}
                    </p>
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
