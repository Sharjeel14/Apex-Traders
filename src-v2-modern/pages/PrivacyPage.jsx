import { useI18nStore } from '@src/store/i18nStore'

export function PrivacyPage() {
  const t = useI18nStore((s) => s.t)

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 24px' }}>
      <div className="v2-card" style={{ padding: '36px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>{t('privacy.title')}</h1>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>
          {t('privacy.lastUpdated')}
        </div>

        <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '22px', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 700 }}>
              1. Zero Personal Data Retention
            </h2>
            <p>
              ApexDex does not harvest personal names, physical addresses, government IDs, or phone numbers. All wallet interactions occur peer-to-peer on decentralized simulation networks.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 700 }}>
              2. Local Device Cache & Preferences
            </h2>
            <p>
              Your preferred slippage tolerance, theme settings (Light/Dark mode), and token watchlists are stored exclusively on your local client device using local storage or application state.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 700 }}>
              3. Security & Audits
            </h2>
            <p>
              All mathematical calculations for indicator overlays and token swap ratios are performed locally in the browser runtime without sending data to third-party ad networks.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
