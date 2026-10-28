import { useRouterStore } from '@src/store/routerStore'
import { useI18nStore } from '@src/store/i18nStore'

export function Footer() {
  const navigate = useRouterStore((s) => s.navigate)
  const t = useI18nStore((s) => s.t)

  return (
    <footer className="v1-footer">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>ApexTrade Pro</span>
        <span>•</span>
        <span>Institutional Crypto Execution Desk</span>
      </div>

      <div style={{ display: 'flex', gap: '16px' }}>
        <button type="button" onClick={() => navigate('about', 'v1')} style={{ color: 'var(--text-secondary)' }}>
          {t('nav.about')}
        </button>
        <button type="button" onClick={() => navigate('terms', 'v1')} style={{ color: 'var(--text-secondary)' }}>
          {t('nav.terms')}
        </button>
        <button type="button" onClick={() => navigate('privacy', 'v1')} style={{ color: 'var(--text-secondary)' }}>
          {t('nav.privacy')}
        </button>
      </div>
    </footer>
  )
}
