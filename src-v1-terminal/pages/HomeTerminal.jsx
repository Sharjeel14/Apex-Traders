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
import { ArrowLeft, LineChart, BookOpen, Send, ClipboardList } from 'lucide-react'

export function HomeTerminal() {
  const homeViewMode = useMarketStore((s) => s.homeViewMode)
  const backToTickerList = useMarketStore((s) => s.backToTickerList)
  const activePair = useMarketStore((s) => s.activePair)
  const terminalMobileTab = useMarketStore((s) => s.terminalMobileTab)
  const setTerminalMobileTab = useMarketStore((s) => s.setTerminalMobileTab)
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
          padding: '8px 14px',
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
          <ArrowLeft size={15} />
          <span>{t('list.back')}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Pair:</span>
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-medium)',
              fontWeight: 800,
              fontSize: '0.82rem',
              color: 'var(--text-primary)',
            }}
          >
            {activePair}
          </span>
        </div>
      </div>

      {/* Real-time Ticker Metrics Strip */}
      <TickerStrip />

      {/* Mobile Segmented Tab Bar (Visible on mobile only) */}
      <nav className="v1-mobile-tabs-bar" aria-label="Terminal Sections">
        <button
          type="button"
          onClick={() => setTerminalMobileTab('chart')}
          className={`v1-mobile-tab-btn ${terminalMobileTab === 'chart' ? 'active' : ''}`}
        >
          <LineChart size={14} />
          <span>Chart</span>
        </button>

        <button
          type="button"
          onClick={() => setTerminalMobileTab('book')}
          className={`v1-mobile-tab-btn ${terminalMobileTab === 'book' ? 'active' : ''}`}
        >
          <BookOpen size={14} />
          <span>Book</span>
        </button>

        <button
          type="button"
          onClick={() => setTerminalMobileTab('trade')}
          className={`v1-mobile-tab-btn ${terminalMobileTab === 'trade' ? 'active' : ''}`}
        >
          <Send size={14} />
          <span>Order</span>
        </button>

        <button
          type="button"
          onClick={() => setTerminalMobileTab('orders')}
          className={`v1-mobile-tab-btn ${terminalMobileTab === 'orders' ? 'active' : ''}`}
        >
          <ClipboardList size={14} />
          <span>Orders</span>
        </button>
      </nav>

      {/* Main Terminal Desk Layout */}
      <div className="v1-terminal-grid">
        {/* Left: Order Book (mobile-visible on tab 'book') */}
        <div className={`v1-col-panel ${terminalMobileTab === 'book' ? 'mobile-visible' : ''}`}>
          <OrderBook />
        </div>

        {/* Center: Chart & Indicators (mobile-visible on tab 'chart') */}
        <div className={`v1-col-panel ${terminalMobileTab === 'chart' ? 'mobile-visible' : ''}`}>
          <div className="v1-panel">
            <IndicatorBar />
            <TradingChart />
          </div>
        </div>

        {/* Right: Order Entry & Trades */}
        <div
          className={`v1-col-panel ${terminalMobileTab === 'trade' || terminalMobileTab === 'book' ? 'mobile-visible' : ''}`}
          style={{ gap: '1px', background: 'var(--border-subtle)' }}
        >
          <div className="v1-mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
            {terminalMobileTab === 'trade' && <OrderPanel />}
            {terminalMobileTab === 'book' && <RecentTrades />}
          </div>
          <div className="v1-desktop-only" style={{ display: 'flex', flexDirection: 'column', gap: '1px', width: '100%' }}>
            <OrderPanel />
            <RecentTrades />
          </div>
        </div>

        {/* Bottom Section: Positions & Orders (mobile-visible on tab 'orders') */}
        <div className={`v1-bottom-section ${terminalMobileTab === 'orders' ? 'mobile-visible' : ''}`}>
          <PositionsTabs />
        </div>
      </div>
    </div>
  )
}
