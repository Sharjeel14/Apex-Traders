import { useI18nStore } from '@src/store/i18nStore'

export function PrivacyPage() {
  const t = useI18nStore((s) => s.t)

  return (
    <div className="v1-page-container">
      <div className="v1-card">
        <h1 className="v1-page-title">{t('privacy.title')}</h1>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          {t('privacy.lastUpdated')}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <section>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>1. Information Collection & Telemetry</h2>
            <p>
              We prioritize data minimization. We collect only technical telemetric data necessary to maintain order routing integrity, network latency monitoring, and secure user session persistence.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>2. Cryptographic Security Standards</h2>
            <p>
              Platform sessions utilize TLS 1.3 protocol encryption. API keys and sensitive authentication credentials are never stored in plaintext and remain strictly client-side or within hardware security modules.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>3. Third-Party Disclosures</h2>
            <p>
              ApexTrade does not monetize, sell, or syndicate user behavioral or order book telemetry to third-party data brokers or market makers.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>4. User Data Control</h2>
            <p>
              Users may request immediate purging of local simulated state, portfolio snapshots, and session telemetry at any time by clearing application data storage.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
