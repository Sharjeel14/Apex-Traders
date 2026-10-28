import { useI18nStore } from '@src/store/i18nStore'

export function TermsPage() {
  const t = useI18nStore((s) => s.t)

  return (
    <div className="v1-page-container">
      <div className="v1-card">
        <h1 className="v1-page-title">{t('terms.title')}</h1>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          {t('terms.lastUpdated')}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <section>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>1. Acceptance of Trading Terms</h2>
            <p>
              By accessing the ApexTrade Pro Terminal or connecting to our algorithmic API endpoints, you certify that you have read, understood, and agreed to be bound by these Terms of Service. If you disagree, cease platform interaction immediately.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>2. Risk Disclosure & Market Volatility</h2>
            <p>
              Cryptocurrency asset trading carries substantial risk of capital loss. Market rates fluctuate dynamically based on liquidity shocks, slippage, and macroeconomic variables. Simulated executions on this platform do not represent investment advisory or guaranteed financial returns.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>3. Order Routing & Execution Policies</h2>
            <p>
              All limit and market orders placed through the reactive terminal interface are matched against available order book bids and asks. The matching engine reserves the right to prioritize orders based on standard Price-Time-Priority algorithms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '8px' }}>4. Prohibited Market Conduct</h2>
            <p>
              Users are prohibited from engaging in manipulative trading practices, including wash trading, spoofing, front-running, or utilizing automated scripts to disrupt network synchronization.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
