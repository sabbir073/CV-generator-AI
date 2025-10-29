import { ResumeData } from '@/types/resume'

interface MinimalistPortraitProps {
  data: ResumeData
}

const formatLocation = (location: { city?: string; country?: string } | string) => {
  if (typeof location === 'string') return location
  if (!location) return ''
  const parts = [location.city, location.country].filter(Boolean)
  return parts.join(', ')
}

export function MinimalistPortrait({ data }: MinimalistPortraitProps) {
  const { basics, sections } = data
  const photoUrl = data.metadata?.photoUrl || basics.photoUrl

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-12 font-sans text-gray-800">
      {/* Centered Photo and Header */}
      <div className="mb-12 text-center">
        {photoUrl && (
          <div className="mx-auto mb-6 h-28 w-28 overflow-hidden rounded-full border border-slate-300">
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
        <h2 className="mb-6 text-lg font-light text-gray-500">{basics.title}</h2>
        <div className="mx-auto flex max-w-xl justify-center gap-6 text-xs text-gray-600">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{formatLocation(basics.location)}</span>}
        </div>
      </div>

      {/* Summary */}
      {basics.summary && (
        <div className="mx-auto mb-12 max-w-3xl">
          <p className="text-center text-sm leading-relaxed text-gray-600">
            {basics.summary}
          </p>
        </div>
      )}

      {/* Main Content - Maximum White Space */}
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Experience */}
        {sections
          .filter((s) => s.visible && s.type === 'experience')
          .map((section) => (
            <div key={section.id}>
              <h3 className="mb-6 text-center text-xs font-light uppercase tracking-widest text-gray-400">
                {section.title}
              </h3>
              <div className="space-y-8">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center">
                    <h4 className="mb-1 text-sm font-medium text-gray-900">
                      {item.title}
                    </h4>
                    <div className="mb-1 text-xs text-gray-600">
                      {item.subtitle}
                    </div>
                    <div className="mb-3 text-xs text-gray-400">
                      {item.startDate} - {item.endDate || 'Present'}
                    </div>
                    {item.descriptionBullets &&
                      item.descriptionBullets.length > 0 && (
                        <div className="mx-auto max-w-2xl space-y-1 text-xs leading-relaxed text-gray-600">
                          {item.descriptionBullets.map((bullet, idx) => (
                            <div key={idx}>{bullet}</div>
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
              <h3 className="mb-6 text-center text-xs font-light uppercase tracking-widest text-gray-400">
                {section.title}
              </h3>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center">
                    <h4 className="mb-1 text-sm font-medium text-gray-900">
                      {item.title}
                    </h4>
                    <div className="mb-1 text-xs text-gray-600">
                      {item.subtitle}
                    </div>
                    <div className="text-xs text-gray-400">
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
              <h3 className="mb-6 text-center text-xs font-light uppercase tracking-widest text-gray-400">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="text-center">
                    {item.category && (
                      <div className="mb-2 text-xs font-medium text-gray-900">
                        {item.category}
                      </div>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap justify-center gap-3">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs text-gray-600">
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
              <h3 className="mb-6 text-center text-xs font-light uppercase tracking-widest text-gray-400">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center">
                    <h4 className="mb-1 text-sm font-medium text-gray-900">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-gray-600">{item.description}</p>
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
              <h3 className="mb-6 text-center text-xs font-light uppercase tracking-widest text-gray-400">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.id} className="break-inside-avoid text-center text-xs">
                    <span className="font-medium text-gray-900">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-gray-600"> - {item.subtitle}</span>
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
