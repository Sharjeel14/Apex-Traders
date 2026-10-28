import { useRouterStore } from '@src/store/routerStore'
import { useI18nStore } from '@src/store/i18nStore'

export function Footer() {
  const navigate = useRouterStore((s) => s.navigate)
  const t = useI18nStore((s) => s.t)

  return (
    <footer className="v2-footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: 800 }} className="v2-brand-gradient">ApexDex</span>
        <span>•</span>
        <span>Next-Generation Reactive Automated Liquidity</span>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <button type="button" onClick={() => navigate('about', 'v2')} style={{ color: 'var(--text-secondary)' }}>
          {t('nav.about')}
        </button>
        <button type="button" onClick={() => navigate('terms', 'v2')} style={{ color: 'var(--text-secondary)' }}>
          {t('nav.terms')}
        </button>
        <button type="button" onClick={() => navigate('privacy', 'v2')} style={{ color: 'var(--text-secondary)' }}>
          {t('nav.privacy')}
        </button>
      </div>
    </footer>
  )
}
