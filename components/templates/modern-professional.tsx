import { ResumeData } from '@/types/resume'
import { Mail, Phone, Globe, MapPin } from 'lucide-react'

interface TemplateProps {
  data: ResumeData
}

export function ModernProfessionalTemplate({ data }: TemplateProps) {
  const { basics, sections } = data
  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order)

  return (
    <div className="bg-white p-12 font-sans text-gray-900" style={{ minHeight: '29.7cm' }}>
      {/* Header Section */}
      <header className="mb-8 border-b-4 border-blue-600 pb-6">
        <h1 className="text-4xl font-bold text-gray-900">{basics.fullName}</h1>
        {basics.title && (
          <p className="mt-2 text-xl font-medium text-blue-600">{basics.title}</p>
        )}

        {/* Contact Information */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          {basics.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{basics.email}</span>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{basics.phone}</span>
            </div>
          )}
          {(basics.location.city || basics.location.country) && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                {[basics.location.city, basics.location.country].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
          {basics.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <a
                href={basics.website}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {basics.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>

        {/* Social Links */}
        {basics.socials.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            {basics.socials.map((social) => (
              <a
                key={social.id}
                href={social.url}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {basics.summary && (
        <section className="mb-6">
          <p className="leading-relaxed text-gray-700">{basics.summary}</p>
        </section>
      )}

      {/* Sections */}
      {visibleSections.map((section) => (
        <section key={section.id} className="mb-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2">
            {section.titleOverride || section.title}
          </h2>

          <div className="space-y-4">
            {section.type === 'skills' ? (
              // Skills Section - Tag Layout
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id}>
                    {item.heading && (
                      <h3 className="mb-2 font-semibold text-gray-800">{item.heading}</h3>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Other Sections - Standard Layout
              section.items.map((item) => (
                <div key={item.id} className="break-inside-avoid space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {item.heading && (
                        <h3 className="font-bold text-gray-900">{item.heading}</h3>
                      )}
                      {item.subheading && (
                        <p className="text-gray-700">{item.subheading}</p>
                      )}
                    </div>
                    {(item.startDate || item.endDate) && (
                      <div className="text-right text-sm text-gray-600">
                        <p>
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
                    <div className="flex flex-wrap gap-2 mt-2">
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

                  {item.link && (
                    <a
                      href={item.link}
                      className="text-sm text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link}
                    </a>
                  )}

                  {item.score && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Score:</span> {item.score}
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
