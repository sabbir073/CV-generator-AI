import { ResumeData } from '@/types/resume'

interface ElegantClassicProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function ElegantClassic({ data }: ElegantClassicProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  return (
    <div className="min-h-[297mm] w-[210mm] bg-stone-50 p-10 font-serif text-gray-800">
      {/* Header with Small Circular Photo */}
      <div className="mb-8 border-b-2 border-amber-800 pb-6 text-center">
        {photoUrl && (
          <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-amber-800 shadow-md">
            <img
              src={photoUrl}
              alt={basics.fullName}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <h1 className="mb-2 text-3xl font-light tracking-wide text-gray-900">
          {basics.fullName}
        </h1>
        <h2 className="mb-4 text-lg italic text-gray-600">{basics.title}</h2>
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>•</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>•</span>}
          {basics.location && <span>{formatLocation(basics.location)}</span>}
        </div>
      </div>

      {/* Summary */}
      {basics.summary && (
        <div className="mb-8">
          <p className="text-center text-sm leading-relaxed italic text-gray-700">
            {basics.summary}
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {/* Experience */}
        {sections
          .filter((s) => s.visible && s.type === 'experience')
          .map((section) => (
            <div key={section.id}>
              <h3 className="mb-4 border-b border-amber-800 pb-2 text-center text-sm font-semibold uppercase tracking-widest text-gray-800">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid">
                    <div className="mb-2 text-center">
                      <h4 className="font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <div className="text-sm italic text-amber-800">
                        {item.subtitle}
                      </div>
                      <div className="text-xs text-gray-600">
                        {item.startDate} - {item.endDate || 'Present'}
                        {item.location && ` • ${formatLocation(item.location)}`}
                      </div>
                    </div>
                    {item.descriptionBullets &&
                      item.descriptionBullets.length > 0 && (
                        <ul className="mx-auto max-w-3xl space-y-1 text-xs leading-relaxed text-gray-700">
                          {item.descriptionBullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-amber-800">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
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
              <h3 className="mb-4 border-b border-amber-800 pb-2 text-center text-sm font-semibold uppercase tracking-widest text-gray-800">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <div className="text-sm italic text-amber-800">
                      {item.subtitle}
                    </div>
                    <div className="text-xs text-gray-600">
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
              <h3 className="mb-4 border-b border-amber-800 pb-2 text-center text-sm font-semibold uppercase tracking-widest text-gray-800">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center">
                    {item.category && (
                      <div className="mb-1 text-xs font-semibold text-gray-800">
                        {item.category}
                      </div>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap justify-center gap-2">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-sm text-gray-700">
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
              <h3 className="mb-4 border-b border-amber-800 pb-2 text-center text-sm font-semibold uppercase tracking-widest text-gray-800">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    {item.description && (
                      <p className="text-sm text-gray-700">{item.description}</p>
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
              <h3 className="mb-4 border-b border-amber-800 pb-2 text-center text-sm font-semibold uppercase tracking-widest text-gray-800">
                {section.title}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center text-sm">
                    <span className="font-semibold text-gray-900">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-gray-700"> - {item.subtitle}</span>
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
