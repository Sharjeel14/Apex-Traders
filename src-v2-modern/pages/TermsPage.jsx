import { useI18nStore } from '@src/store/i18nStore'

export function TermsPage() {
  const t = useI18nStore((s) => s.t)

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 24px' }}>
      <div className="v2-card" style={{ padding: '36px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>{t('terms.title')}</h1>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>
          {t('terms.lastUpdated')}
        </div>

        <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '22px', fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 700 }}>
              1. Non-Custodial Protocol Usage
            </h2>
            <p>
              ApexDex is a decentralized interface allowing users to simulate and execute token swaps against mathematical liquidity pools. You retain sole custody over your cryptographic keys and simulated wallet assets at all times.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 700 }}>
              2. Slippage & Impermanent Loss
            </h2>
            <p>
              Swapping assets across automated market makers is subject to price slippage and potential impermanent loss. ApexDex provides user-configurable slippage tolerance thresholds to protect against adverse pool fluctuations.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 700 }}>
              3. Regulatory Compliance & Disclaimers
            </h2>
            <p>
              Users are solely responsible for ensuring adherence to applicable local financial regulations, tax liabilities, and laws governing digital token swaps in their jurisdiction.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
