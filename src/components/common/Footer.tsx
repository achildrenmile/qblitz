import { useState } from 'react'
import { texte } from '../../data/texte'
import LegalModal from './LegalModal'

export function Footer() {
  const [legalModal, setLegalModal] = useState<'imprint' | 'privacy' | null>(null)

  return (
    <>
      <footer className="py-3 px-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 text-center">
        <div className="flex flex-col items-center gap-2">
          {/* Parent site attribution */}
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {texte.footer.partOf}{' '}
            <a
              href="https://oeradio.at"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
            >
              oeradio.at
            </a>{' '}
            {texte.footer.tools}
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm">
            <button
              onClick={() => setLegalModal('imprint')}
              className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {texte.footer.imprint}
            </button>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <button
              onClick={() => setLegalModal('privacy')}
              className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {texte.footer.privacy}
            </button>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <a
              href="https://github.com/achildrenmile/qblitz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              GitHub
            </a>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <a
              href="mailto:oe8yml@rednil.at"
              className="text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {texte.footer.feedback}
            </a>
          </div>
        </div>
      </footer>

      {/* Legal modals */}
      {legalModal && (
        <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
      )}
    </>
  )
}

export default Footer
