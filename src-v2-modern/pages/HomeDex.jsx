import { ModernChart } from '../components/ModernChart'
import { SwapCard } from '../components/SwapCard'
import { PortfolioWidget } from '../components/PortfolioWidget'
import { MarketOverview } from '../components/MarketOverview'
import { TickerListDex } from '../components/TickerListDex'
import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'
import { ArrowLeft, LayoutGrid, BarChart2 } from 'lucide-react'

export function HomeDex() {
  const homeViewMode = useMarketStore((s) => s.homeViewMode)
  const setHomeViewMode = useMarketStore((s) => s.setHomeViewMode)
  const backToTickerList = useMarketStore((s) => s.backToTickerList)
  const activePair = useMarketStore((s) => s.activePair)
  const selectPair = useMarketStore((s) => s.selectPair)
  const pairs = useMarketStore((s) => s.pairs)
  const t = useI18nStore((s) => s.t)

  if (homeViewMode === 'list') {
    return <TickerListDex />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Return to Watchlist Header Bar */}
      <div
        style={{
          maxWidth: '1240px',
          width: '100%',
          margin: '12px auto 0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <button
          type="button"
          onClick={backToTickerList}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-primary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} />
          <span>{t('list.back')}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setHomeViewMode('list')}
            className="v2-icon-btn"
            style={{ width: 'auto', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', gap: '6px' }}
          >
            <LayoutGrid size={14} />
            <span>{t('list.viewList')}</span>
          </button>
          <button
            type="button"
            className="v2-switch-btn"
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
          >
            <BarChart2 size={14} />
            <span>{activePair} Active</span>
          </button>
        </div>
      </div>

      {/* Hero section */}
      <section className="v2-hero" style={{ marginTop: '16px' }}>
        <h1 className="v2-hero-title">
          Live Trading View: <span className="v2-brand-gradient">{activePair}</span>
        </h1>
        <p className="v2-hero-subtitle">
          {t('dex.subtitle')}
        </p>

        {/* Pair chips */}
        <div className="v2-pair-chips-row" style={{ justifyContent: 'center', marginTop: '16px' }}>
          {Object.entries(pairs).map(([pKey, pData]) => (
            <button
              key={pKey}
              type="button"
              className={`v2-pair-chip ${activePair === pKey ? 'active' : ''}`}
              onClick={() => selectPair(pKey)}
            >
              <span>{pKey}</span>
              <span style={{ opacity: 0.8 }}>${pData.price.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Grid: Chart & Swap Card */}
      <div className="v2-dashboard-grid">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ModernChart />
          <MarketOverview />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <SwapCard />
          <PortfolioWidget />
        </div>
      </div>
    </div>
  )
}
