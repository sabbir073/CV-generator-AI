import { ResumeData } from '@/types/resume'

interface MinimalistGridProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function MinimalistGrid({ data }: MinimalistGridProps) {
  const { basics, sections } = data

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-10 font-sans text-gray-800">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          {basics.fullName}
        </h1>
        <div className="mb-4 h-1 w-16 mx-auto bg-yellow-500"></div>
        <h2 className="mb-4 text-xl font-light text-gray-600">{basics.title}</h2>
        <div className="flex justify-center gap-6 text-sm text-gray-600">
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
          <div className="mt-3 flex flex-wrap justify-center gap-3 text-sm">
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
        <div className="mb-8 border-l-4 border-yellow-500 bg-yellow-50 p-4">
          <p className="text-sm leading-relaxed text-gray-700">
            {basics.summary}
          </p>
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-4 gap-6">
        {/* Experience - Spans 3 columns */}
        {sections
          .filter((s) => s.visible && s.type === 'experience')
          .map((section) => (
            <div key={section.id} className="col-span-3">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid rounded-lg bg-gray-50 p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900">{item.heading}</h4>
                        <div className="text-sm font-semibold text-yellow-600">
                          {item.subheading}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">
                        {item.startDate} - {item.endDate || 'Present'}
                      </div>
                    </div>
                    {item.descriptionBullets &&
                      item.descriptionBullets.length > 0 && (
                        <ul className="ml-2 space-y-1 text-sm text-gray-700">
                          {item.descriptionBullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-yellow-500">▪</span>
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
                            className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700"
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

        {/* Skills - Spans 1 column */}
        {sections
          .filter((s) => s.visible && s.type === 'skills')
          .map((section) => (
            <div key={section.id} className="col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id}>
                    {item.heading && (
                      <div className="mb-2 text-xs font-bold text-yellow-600">
                        {item.heading}
                      </div>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-yellow-100 px-1.5 py-0.5 text-xs text-gray-700"
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

        {/* Education - Spans 2 columns */}
        {sections
          .filter((s) => s.visible && s.type === 'education')
          .map((section) => (
            <div key={section.id} className="col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid rounded-lg bg-gray-50 p-3">
                    <h4 className="font-bold text-gray-900">{item.heading}</h4>
                    <div className="text-sm text-yellow-600">
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

        {/* Projects - Spans 2 columns */}
        {sections
          .filter((s) => s.visible && s.type === 'projects')
          .map((section) => (
            <div key={section.id} className="col-span-2">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid rounded-lg bg-gray-50 p-3">
                    <h4 className="mb-1 font-bold text-gray-900">{item.heading}</h4>
                    {item.description && (
                      <p className="text-xs text-gray-700">{item.description}</p>
                    )}
                    {item.techStack && item.techStack.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700"
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
            <div key={section.id} className="col-span-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">
                  {section.titleOverride || section.title}
                </h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid rounded-lg bg-gray-50 p-3 text-sm">
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
