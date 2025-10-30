import { ResumeData } from '@/types/resume'

interface BoldStatementProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function BoldStatement({ data }: BoldStatementProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  return (
    <div className="flex min-h-[297mm] w-[210mm] bg-white font-sans text-gray-800">
      {/* Oversized Left Photo */}
      <div className="w-[40%]">
        {photoUrl && (
          <div className="relative h-full bg-gradient-to-br from-red-600 to-red-700">
            <img
              src={photoUrl}
              alt={basics.fullName}
              className="h-full w-full object-cover opacity-90 mix-blend-multiply"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
              <h1 className="mb-2 text-4xl font-black uppercase leading-tight tracking-tight">
                {basics.fullName}
              </h1>
              <h2 className="text-lg font-light">{basics.title}</h2>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Contact Bar */}
        <div className="mb-6 space-y-2 border-b-2 border-red-600 pb-4 text-xs">
          {basics.email && (
            <div className="flex items-center gap-2">
              <span className="font-bold text-red-600">EMAIL</span>
              <span className="text-gray-700">{basics.email}</span>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-2">
              <span className="font-bold text-red-600">PHONE</span>
              <span className="text-gray-700">{basics.phone}</span>
            </div>
          )}
          {basics.location && (
            <div className="flex items-center gap-2">
              <span className="font-bold text-red-600">LOCATION</span>
              <span className="text-gray-700">{formatLocation(basics.location)}</span>
            </div>
          )}
          {basics.website && (
            <div className="flex items-center gap-2">
              <span className="font-bold text-red-600">WEBSITE</span>
              <a
                href={basics.website}
                className="text-gray-700 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {basics.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
        {basics.socials && basics.socials.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-3 text-xs">
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

        {/* Summary */}
        {basics.summary && (
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-red-600">
              Profile
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
              <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-red-600">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="mb-2">
                      <h4 className="text-sm font-bold text-gray-900">
                        {item.heading}
                      </h4>
                      <div className="text-xs font-bold text-red-600">
                        {item.subheading}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.startDate} - {item.endDate || 'Present'}
                      </div>
                    </div>
                    {item.descriptionBullets &&
                      item.descriptionBullets.length > 0 && (
                        <ul className="ml-4 space-y-1 text-xs text-gray-700">
                          {item.descriptionBullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="font-bold text-red-600">▸</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="border border-red-600 px-2 py-0.5 text-xs text-gray-700"
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

        {/* Two Column for Skills and Education */}
        <div className="grid grid-cols-2 gap-6">
          {/* Skills */}
          {sections
            .filter((s) => s.visible && s.type === 'skills')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-red-600">
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      {item.heading && (
                        <div className="mb-1 text-xs font-bold text-gray-900">
                          {item.heading}
                        </div>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="border border-red-600 px-2 py-0.5 text-xs text-gray-700"
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

          {/* Education */}
          {sections
            .filter((s) => s.visible && s.type === 'education')
            .map((section) => (
              <div key={section.id}>
                <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-red-600">
                  {section.titleOverride || section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.id} className="break-inside-avoid">
                      <h4 className="text-sm font-bold text-gray-900">
                        {item.heading}
                      </h4>
                      <div className="text-xs text-gray-700">
                        {item.subheading}
                      </div>
                      <div className="text-xs text-gray-500">
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
              <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-red-600">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <h4 className="text-sm font-bold text-gray-900">
                      {item.heading}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-gray-700">{item.description}</p>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="border border-red-600 px-2 py-0.5 text-xs text-gray-700"
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
              <h3 className="mb-3 text-sm font-black uppercase tracking-wider text-red-600">
                {section.titleOverride || section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id} className="text-xs">
                    <span className="font-bold text-gray-900">{item.heading}</span>
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
