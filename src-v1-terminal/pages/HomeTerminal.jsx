import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'
import { TickerListHome } from '../components/TickerListHome'
import { TickerStrip } from '../components/TickerStrip'
import { IndicatorBar } from '../components/IndicatorBar'
import { TradingChart } from '../components/TradingChart'
import { OrderBook } from '../components/OrderBook'
import { OrderPanel } from '../components/OrderPanel'
import { RecentTrades } from '../components/RecentTrades'
import { PositionsTabs } from '../components/PositionsTabs'
import { ArrowLeft, LayoutGrid, BarChart2 } from 'lucide-react'

export function HomeTerminal() {
  const homeViewMode = useMarketStore((s) => s.homeViewMode)
  const setHomeViewMode = useMarketStore((s) => s.setHomeViewMode)
  const backToTickerList = useMarketStore((s) => s.backToTickerList)
  const activePair = useMarketStore((s) => s.activePair)
  const t = useI18nStore((s) => s.t)

  if (homeViewMode === 'list') {
    return <TickerListHome />
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Return to Watchlist Breadcrumb Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 16px',
          background: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: '0.8rem',
        }}
      >
        <button
          type="button"
          onClick={backToTickerList}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--color-primary)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={14} />
          <span>{t('list.back')}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Trading Desk:</span>
          <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{activePair}</span>
          <div style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
            <button
              type="button"
              onClick={() => setHomeViewMode('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-medium)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
              }}
            >
              <LayoutGrid size={12} />
              <span>{t('list.viewList')}</span>
            </button>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-xs)',
                background: 'var(--color-primary)',
                border: '1px solid var(--color-primary)',
                fontSize: '0.72rem',
                color: '#fff',
                fontWeight: 700,
              }}
            >
              <BarChart2 size={12} />
              <span>{t('list.viewTrade')}</span>
            </button>
          </div>
        </div>
      </div>

      <TickerStrip />

      <div className="v1-terminal-grid">
        {/* Left Column: Order Book */}
        <OrderBook />

        {/* Center Column: Chart & Indicator Toolbar */}
        <div className="v1-panel">
          <IndicatorBar />
          <TradingChart />
        </div>

        {/* Right Column: Order Panel & Live Trades */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border-subtle)' }}>
          <OrderPanel />
          <RecentTrades />
        </div>

        {/* Bottom Section: Positions & Orders */}
        <PositionsTabs />
      </div>
    </div>
  )
}
