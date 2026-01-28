import { texte } from '../../data/texte'

interface LegalModalProps {
  type: 'imprint' | 'privacy'
  onClose: () => void
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  const imprint = texte.imprint
  const privacy = texte.privacy

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {type === 'imprint' ? imprint.title : privacy.title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          {type === 'imprint' ? (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400">{imprint.info}</p>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{imprint.operator}</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {imprint.operatorName}<br />
                  {imprint.operatorCallsign}<br />
                  {imprint.operatorAddress}<br />
                  {imprint.operatorCountry}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{imprint.contact}</h3>
                <p>
                  <a
                    href={`mailto:${imprint.contactEmail}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {imprint.contactEmail}
                  </a>
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{imprint.liabilityTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{imprint.liabilityText}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{imprint.externalLinksTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{imprint.externalLinksText}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{imprint.copyrightTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{imprint.copyrightText}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{imprint.disclaimerTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{imprint.disclaimerText}</p>
              </div>
            </>
          ) : (
            <>
              <p className="text-slate-600 dark:text-slate-300">{privacy.intro}</p>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{privacy.noDataTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{privacy.noDataText}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm italic">{privacy.noDataList}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{privacy.localStorageTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{privacy.localStorageText}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{privacy.cloudflareTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{privacy.cloudflareText}</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">{privacy.contactTitle}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{privacy.contactText}</p>
                <p>
                  <a
                    href={`mailto:${imprint.contactEmail}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {imprint.contactEmail}
                  </a>
                </p>
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg font-medium transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  )
}

export default LegalModal
