import { useRouterStore } from '@src/store/routerStore'
import { useThemeStore } from '@src/store/themeStore'
import { useI18nStore } from '@src/store/i18nStore'
import { Moon, Sun, Compass, Menu, X } from 'lucide-react'

export function Header() {
  const currentPage = useRouterStore((s) => s.currentPage)
  const navigate = useRouterStore((s) => s.navigate)
  const isMobileMenuOpen = useRouterStore((s) => s.isMobileMenuOpen)
  const toggleMobileMenu = useRouterStore((s) => s.toggleMobileMenu)

  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  const language = useI18nStore((s) => s.language)
  const setLanguage = useI18nStore((s) => s.setLanguage)
  const t = useI18nStore((s) => s.t)

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  return (
    <>
      <header className="v2-header">
        <div className="v2-brand" onClick={() => navigate('home', 'v2')}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Compass size={18} />
          </div>
          <span className="v2-brand-gradient">ApexDex</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="v2-nav-pill-group">
          <button
            type="button"
            className={`v2-nav-pill ${currentPage === 'home' || currentPage === 'terminal' ? 'active' : ''}`}
            onClick={() => navigate('home', 'v2')}
          >
            {t('nav.dex')}
          </button>
          <button
            type="button"
            className={`v2-nav-pill ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => navigate('about', 'v2')}
          >
            {t('nav.about')}
          </button>
          <button
            type="button"
            className={`v2-nav-pill ${currentPage === 'terms' ? 'active' : ''}`}
            onClick={() => navigate('terms', 'v2')}
          >
            {t('nav.terms')}
          </button>
          <button
            type="button"
            className={`v2-nav-pill ${currentPage === 'privacy' ? 'active' : ''}`}
            onClick={() => navigate('privacy', 'v2')}
          >
            {t('nav.privacy')}
          </button>
        </nav>

        {/* Header Actions */}
        <div className="v2-header-actions">
          {/* Language Switch */}
          <button type="button" className="v2-icon-btn" onClick={toggleLang} title="Switch Language">
            <span style={{ fontSize: '0.72rem', fontWeight: 800 }}>{language.toUpperCase()}</span>
          </button>

          {/* Theme Switch */}
          <button type="button" className="v2-icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="v2-icon-btn"
            onClick={toggleMobileMenu}
            style={{ display: 'none' }}
            id="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <nav className="v2-mobile-nav">
          <button
            type="button"
            className={`v2-mobile-nav-link ${currentPage === 'home' || currentPage === 'terminal' ? 'active' : ''}`}
            onClick={() => navigate('home', 'v2')}
          >
            {t('nav.dex')}
          </button>
          <button
            type="button"
            className={`v2-mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => navigate('about', 'v2')}
          >
            {t('nav.about')}
          </button>
          <button
            type="button"
            className={`v2-mobile-nav-link ${currentPage === 'terms' ? 'active' : ''}`}
            onClick={() => navigate('terms', 'v2')}
          >
            {t('nav.terms')}
          </button>
          <button
            type="button"
            className={`v2-mobile-nav-link ${currentPage === 'privacy' ? 'active' : ''}`}
            onClick={() => navigate('privacy', 'v2')}
          >
            {t('nav.privacy')}
          </button>
        </nav>
      )}
    </>
  )
}
