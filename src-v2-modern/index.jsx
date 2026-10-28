import { useRouterStore } from '@src/store/routerStore'
import { useMarketStore } from '@src/store/marketStore'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomeDex } from './pages/HomeDex'
import { AboutPage } from './pages/AboutPage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import './styles/modern.css'

export function VariationTwoDex() {
  const currentPage = useRouterStore((s) => s.currentPage)
  const toast = useMarketStore((s) => s.toast)
  const dismissToast = useMarketStore((s) => s.dismissToast)

  return (
    <div className="v2-root">
      <Header />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'terms' && <TermsPage />}
        {currentPage === 'privacy' && <PrivacyPage />}
        {(currentPage === 'home' || currentPage === 'terminal' || !['about', 'terms', 'privacy'].includes(currentPage)) && (
          <HomeDex />
        )}
      </main>

      <Footer />

      {toast && (
        <div
          onClick={dismissToast}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            padding: '12px 20px',
            borderRadius: 'var(--radius-full)',
            background: toast.type === 'error' ? 'var(--color-bear)' : 'var(--color-bull)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.85rem',
            boxShadow: 'var(--shadow-lg)',
            cursor: 'pointer',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>{toast.text}</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>(close)</span>
        </div>
      )}
    </div>
  )
}
export default VariationTwoDex
