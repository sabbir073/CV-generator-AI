import { ResumeData } from '@/types/resume'

interface SidebarAccentProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function SidebarAccent({ data }: SidebarAccentProps) {
  const { basics, sections } = data

  return (
    <div className="flex min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Colored Left Sidebar */}
      <div className="w-[30%] bg-gradient-to-b from-coral-500 to-coral-600 p-6 text-white">
        {/* Contact Info */}
        <div className="mb-8">
          <h3 className="mb-4 border-b border-white/30 pb-2 text-sm font-bold uppercase tracking-wider">
            Contact
          </h3>
          <div className="space-y-3 text-xs">
            {basics.email && (
              <div className="flex items-start gap-2">
                <span>✉</span>
                <span className="break-all">{basics.email}</span>
              </div>
            )}
            {basics.phone && (
              <div className="flex items-start gap-2">
                <span>☎</span>
                <span>{basics.phone}</span>
              </div>
            )}
            {basics.location && (
              <div className="flex items-start gap-2">
                <span>⌂</span>
                <span>{formatLocation(basics.location)}</span>
              </div>
            )}
            {basics.linkedin && (
              <div className="flex items-start gap-2">
                <span>in</span>
                <span className="break-all">{basics.linkedin}</span>
              </div>
            )}
            {basics.website && (
              <div className="flex items-start gap-2">
                <span>🌐</span>
                <a
                  href={basics.website}
                  className="break-all hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {basics.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
          </div>
          {basics.socials && basics.socials.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
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

        {/* Skills */}
        {sections
          .filter((s) => s.visible && s.type === 'skills')
          .map((section) => (
            <div key={section.id} className="mb-8">
              <h3 className="mb-4 border-b border-white/30 pb-2 text-sm font-bold uppercase tracking-wider">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    {item.heading && (
                      <div className="mb-2 text-xs font-semibold opacity-90">
                        {item.heading}
                      </div>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-white/20 px-2 py-1 text-xs backdrop-blur-sm"
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
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 border-b border-white/30 pb-2 text-sm font-bold uppercase tracking-wider">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id} className="text-xs">
                    <div className="font-semibold">{item.heading}</div>
                    {item.subheading && (
                      <div className="opacity-90">{item.subheading}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Main White Area */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6 border-b-2 border-coral-500 pb-4">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            {basics.fullName}
          </h1>
          <h2 className="text-xl text-gray-600">{basics.title}</h2>
        </div>

        {/* Summary */}
        {basics.summary && (
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-coral-600">
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
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-coral-600">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        <div className="text-sm font-semibold text-coral-600">
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
                              <span className="text-coral-500">•</span>
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
                            className="rounded bg-coral-100 px-2 py-0.5 text-xs text-coral-700"
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
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-coral-600">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        <div className="text-sm text-coral-600">
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
            <div key={section.id} className="mb-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-coral-600">
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
                            className="rounded bg-coral-100 px-2 py-0.5 text-xs text-coral-700"
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
  )
}
