import { useIndicatorStore } from '@src/store/indicatorStore'
import { useI18nStore } from '@src/store/i18nStore'

export function IndicatorBar() {
  const t = useI18nStore((s) => s.t)
  const showSMA20 = useIndicatorStore((s) => s.showSMA20)
  const showSMA50 = useIndicatorStore((s) => s.showSMA50)
  const showEMA12 = useIndicatorStore((s) => s.showEMA12)
  const showEMA26 = useIndicatorStore((s) => s.showEMA26)
  const showBollinger = useIndicatorStore((s) => s.showBollinger)
  const showRSI = useIndicatorStore((s) => s.showRSI)
  const showMACD = useIndicatorStore((s) => s.showMACD)
  const toggleIndicator = useIndicatorStore((s) => s.toggleIndicator)

  const indicators = [
    { key: 'showSMA20', label: t('ind.sma20'), active: showSMA20, color: '#f59e0b' },
    { key: 'showSMA50', label: t('ind.sma50'), active: showSMA50, color: '#ec4899' },
    { key: 'showEMA12', label: t('ind.ema12'), active: showEMA12, color: '#06b6d4' },
    { key: 'showEMA26', label: t('ind.ema26'), active: showEMA26, color: '#8b5cf6' },
    { key: 'showBollinger', label: t('ind.bollinger'), active: showBollinger, color: '#3b82f6' },
    { key: 'showRSI', label: t('ind.rsi'), active: showRSI, color: '#a855f7' },
    { key: 'showMACD', label: t('ind.macd'), active: showMACD, color: '#f97316' },
  ]

  return (
    <div className="v1-indicator-toolbar">
      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '4px' }}>
        {t('trade.indicators')}:
      </span>
      {indicators.map((ind) => (
        <button
          key={ind.key}
          onClick={() => toggleIndicator(ind.key)}
          className={`v1-ind-pill ${ind.active ? 'active' : ''}`}
          style={ind.active ? { borderColor: ind.color, color: ind.color, background: 'rgba(59, 130, 246, 0.1)' } : {}}
        >
          {ind.label}
        </button>
      ))}
    </div>
  )
}
