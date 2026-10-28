import { useRouterStore } from '@src/store/routerStore'
import { useMarketStore } from '@src/store/marketStore'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomeTerminal } from './pages/HomeTerminal'
import { AboutPage } from './pages/AboutPage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import './styles/terminal.css'

export function VariationOneTerminal() {
  const currentPage = useRouterStore((s) => s.currentPage)
  const toast = useMarketStore((s) => s.toast)
  const dismissToast = useMarketStore((s) => s.dismissToast)

  return (
    <div className="v1-root">
      <Header />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'privacy' && <PrivacyPage />}
        {(currentPage === 'terminal' || currentPage === 'home' || !['about', 'terms', 'privacy'].includes(currentPage)) && (
          <HomeTerminal />
        )}
      </main>

      <Footer />

      {toast && (
        <div className={`v1-toast ${toast.type}`} onClick={dismissToast} style={{ cursor: 'pointer' }}>
          <span>{toast.text}</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>(click to close)</span>
        </div>
      )}
    </div>
  )
}
export default VariationOneTerminal
