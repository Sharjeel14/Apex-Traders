import { useRouterStore } from '@src/store/routerStore'
import { useThemeStore } from '@src/store/themeStore'
import { useI18nStore } from '@src/store/i18nStore'
import { Moon, Sun, Globe, Sparkles, Zap } from 'lucide-react'

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
    <header className="v1-header">
      <div className="v1-nav-brand">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('terminal', 'v1')}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #3b82f6, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Zap size={18} />
          </div>
          <span>ApexTrade</span>
        </div>
        <span className="v1-brand-badge">PRO TERMINAL</span>
      </div>

      <nav className="v1-nav-links">
        <button
          type="button"
          className={`v1-nav-link ${currentPage === 'terminal' ? 'active' : ''}`}
          onClick={() => navigate('terminal', 'v1')}
        >
          {t('nav.home')}
        </button>
        <button
          type="button"
          className={`v1-nav-link ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => navigate('about', 'v1')}
        >
          {t('nav.about')}
        </button>
        <button
          type="button"
          className={`v1-nav-link ${currentPage === 'terms' ? 'active' : ''}`}
          onClick={() => navigate('terms', 'v1')}
        >
          {t('nav.terms')}
        </button>
        <button
          type="button"
          className={`v1-nav-link ${currentPage === 'privacy' ? 'active' : ''}`}
          onClick={() => navigate('privacy', 'v1')}
        >
          {t('nav.privacy')}
        </button>
      </nav>

      <div className="v1-header-actions">
        {/* Switch Variation */}
        <button
          type="button"
          className="v1-action-btn"
          style={{ borderColor: 'var(--color-purple)', color: 'var(--color-purple)', fontWeight: 700 }}
          onClick={() => setVariation('v2')}
          title="Switch to Modern DEX"
        >
          <Sparkles size={14} color="var(--color-purple)" />
          <span className="v1-btn-text">Modern DEX</span>
        </button>

        {/* Language */}
        <button type="button" className="v1-action-btn" onClick={toggleLang}>
          <Globe size={14} />
          <span style={{ textTransform: 'uppercase' }}>{language}</span>
        </button>

        {/* Theme */}
        <button type="button" className="v1-action-btn" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  )
}
