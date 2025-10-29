import { ResumeData } from '@/types/resume'

interface TemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: TemplateProps) {
  const { basics, sections } = data
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order)

  return (
    <div className="bg-white font-sans text-gray-900" style={{ minHeight: '29.7cm' }}>
      {/* Sidebar + Main Content Layout */}
      <div className="flex">
        {/* Left Sidebar - Accent Color */}
        <aside className="w-1/3 bg-gradient-to-b from-purple-600 to-purple-800 p-8 text-white">
          {/* Name and Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold leading-tight">{basics.fullName}</h1>
            {basics.title && (
              <p className="mt-2 text-lg font-light text-purple-100">{basics.title}</p>
            )}
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-200">
              Contact
            </h2>
            <div className="space-y-2 text-sm">
              {basics.email && <p className="break-words">{basics.email}</p>}
              {basics.phone && <p>{basics.phone}</p>}
              {(basics.location.city || basics.location.country) && (
                <p>{[basics.location.city, basics.location.country].filter(Boolean).join(', ')}</p>
              )}
              {basics.website && (
                <p className="break-words">{basics.website.replace(/^https?:\/\//, '')}</p>
              )}
            </div>
          </div>

          {/* Social Links */}
          {basics.socials.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-200">
                Social
              </h2>
              <div className="space-y-2 text-sm">
                {basics.socials.map((social) => (
                  <div key={social.id}>
                    <p className="font-medium text-purple-100">{social.label}</p>
                    <p className="break-words text-xs">{social.url.replace(/^https?:\/\//, '')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section in Sidebar */}
          {sections.find((s) => s.type === 'skills' && s.visible) && (
            <div className="mb-8">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-purple-200">
                Skills
              </h2>
              <div className="space-y-3">
                {sections
                  .find((s) => s.type === 'skills')
                  ?.items.map((item) => (
                    <div key={item.id}>
                      {item.heading && (
                        <h3 className="mb-1 text-sm font-semibold text-purple-100">
                          {item.heading}
                        </h3>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-purple-700 px-2 py-0.5 text-xs"
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
          )}
        </aside>

        {/* Right Main Content */}
        <main className="flex-1 p-10">
          {/* Professional Summary */}
          {basics.summary && (
            <section className="mb-8">
              <p className="text-lg leading-relaxed text-gray-700">{basics.summary}</p>
            </section>
          )}

          {/* Other Sections (excluding skills) */}
          {visibleSections
            .filter((s) => s.type !== 'skills')
            .map((section) => (
              <section key={section.id} className="mb-8">
                <h2 className="mb-4 border-l-4 border-purple-600 pl-3 text-2xl font-bold text-gray-900">
                  {section.titleOverride || section.title}
                </h2>

                <div className="space-y-6">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid space-y-2 border-l-2 border-gray-200 pl-4">
                      <div>
                        {item.heading && (
                          <h3 className="text-lg font-bold text-gray-900">{item.heading}</h3>
                        )}
                        <div className="flex items-baseline justify-between gap-4">
                          {item.subheading && (
                            <p className="font-medium text-purple-600">{item.subheading}</p>
                          )}
                          {(item.startDate || item.endDate) && (
                            <p className="text-sm text-gray-500">
                              {item.startDate} - {item.current ? 'Present' : item.endDate}
                            </p>
                          )}
                        </div>
                        {item.location && (
                          <p className="text-sm text-gray-500">{item.location}</p>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-gray-700">{item.description}</p>
                      )}

                      {item.descriptionBullets && item.descriptionBullets.length > 0 && (
                        <ul className="ml-4 list-disc space-y-1 text-gray-700">
                          {item.descriptionBullets.map((bullet, idx) => (
                            <li key={idx}>{bullet}</li>
                          ))}
                        </ul>
                      )}

                      {item.techStack && item.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.tags && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.link && (
                        <p className="text-sm text-purple-600">{item.link}</p>
                      )}

                      {item.score && (
                        <p className="text-sm font-medium text-gray-600">{item.score}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
        </main>
      </div>
    </div>
  )
}
