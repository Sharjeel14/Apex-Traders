import { useMarketStore } from '@src/store/marketStore'

export function TickerStrip() {
  const pairs = useMarketStore((s) => s.pairs)
  const activePair = useMarketStore((s) => s.activePair)
  const selectPair = useMarketStore((s) => s.selectPair)

  const activeData = pairs[activePair]
  if (!activeData) return null

  const isBull = activeData.change24h >= 0

  return (
    <div className="v1-ticker-strip">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <select
          className="v1-pair-dropdown"
          value={activePair}
          onChange={(e) => selectPair(e.target.value)}
        >
          {Object.keys(pairs).map((pair) => (
            <option key={pair} value={pair}>
              {pair} — {pairs[pair].name}
            </option>
          ))}
        </select>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '1.25rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: isBull ? 'var(--color-bull)' : 'var(--color-bear)' }}>
            ${activeData.price.toLocaleString()}
          </span>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: 'var(--radius-xs)',
              background: isBull ? 'var(--color-bull-bg)' : 'var(--color-bear-bg)',
              color: isBull ? 'var(--color-bull)' : 'var(--color-bear)',
            }}
          >
            {isBull ? '+' : ''}{activeData.change24h}%
          </span>
        </div>
      </div>

      <div className="v1-ticker-metrics">
        <div className="v1-metric-item">
          <span className="v1-metric-label">24h High</span>
          <span className="v1-metric-val">${activeData.high24h.toLocaleString()}</span>
        </div>
        <div className="v1-metric-item">
          <span className="v1-metric-label">24h Low</span>
          <span className="v1-metric-val">${activeData.low24h.toLocaleString()}</span>
        </div>
        <div className="v1-metric-item">
          <span className="v1-metric-label">24h Volume</span>
          <span className="v1-metric-val">${activeData.volume24h}</span>
        </div>
        <div className="v1-metric-item">
          <span className="v1-metric-label">Engine Latency</span>
          <span className="v1-metric-val" style={{ color: 'var(--color-bull)' }}>0.8ms</span>
        </div>
      </div>
    </div>
  )
}
