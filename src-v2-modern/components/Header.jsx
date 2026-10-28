import { useRouterStore } from '@src/store/routerStore'
import { useThemeStore } from '@src/store/themeStore'
import { useI18nStore } from '@src/store/i18nStore'
import { Moon, Sun, Terminal, Compass } from 'lucide-react'

export function Header() {
  const currentPage = useRouterStore((s) => s.currentPage)
  const navigate = useRouterStore((s) => s.navigate)
  const setVariation = useRouterStore((s) => s.setVariation)

  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)

  const language = useI18nStore((s) => s.language)
  const setLanguage = useI18nStore((s) => s.setLanguage)
  const t = useI18nStore((s) => s.t)

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  return (
    <header className="v2-header">
      <div className="v2-brand" onClick={() => navigate('home', 'v2')}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <Compass size={20} />
        </div>
        <span className="v2-brand-gradient">ApexDex</span>
      </div>

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

      <div className="v2-header-actions">
        {/* Switch back to Variation 1 */}
        <button
          type="button"
          className="v2-switch-btn"
          onClick={() => setVariation('v1')}
          title="Switch to Variation 1: Cyber Pro Terminal"
        >
          <Terminal size={14} />
          <span>Pro Terminal</span>
        </button>

        {/* Language */}
        <button type="button" className="v2-icon-btn" onClick={toggleLang}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>{language.toUpperCase()}</span>
        </button>

        {/* Theme Toggle */}
        <button type="button" className="v2-icon-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  )
}
