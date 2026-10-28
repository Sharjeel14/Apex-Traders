import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'
import { Search, Flame } from 'lucide-react'

export function MarketOverview() {
  const t = useI18nStore((s) => s.t)
  const pairs = useMarketStore((s) => s.pairs)
  const activePair = useMarketStore((s) => s.activePair)
  const selectPair = useMarketStore((s) => s.selectPair)
  const searchQuery = useMarketStore((s) => s.searchQuery)
  const setSearchQuery = useMarketStore((s) => s.setSearchQuery)

  const pairList = Object.entries(pairs).filter(([pair, data]) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return pair.toLowerCase().includes(q) || data.name.toLowerCase().includes(q)
  })

  return (
    <div className="v2-card" style={{ marginTop: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Flame size={20} color="#f97316" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{t('dex.marketTrends')}</h3>
        </div>

        {/* Search Input in Zustand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-full)', padding: '6px 14px' }}>
          <Search size={14} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search crypto pair..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '0.8rem', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="v2-markets-table">
          <thead>
            <tr>
              <th>Pair</th>
              <th>Price</th>
              <th>24h Change</th>
              <th>24h High</th>
              <th>24h Low</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {pairList.map(([pairKey, data]) => {
              const isBull = data.change24h >= 0
              const isSelected = activePair === pairKey

              return (
                <tr
                  key={pairKey}
                  className="v2-market-row"
                  onClick={() => selectPair(pairKey)}
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-surface-elevated)' : 'transparent',
                    fontWeight: isSelected ? 700 : 400,
                  }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                        }}
                      >
                        {data.symbol.slice(0, 3)}
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-primary)' }}>{data.symbol}/USDT</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{data.name}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>${data.price.toLocaleString()}</td>
                  <td>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: isBull ? 'var(--color-bull-bg)' : 'var(--color-bear-bg)',
                        color: isBull ? 'var(--color-bull)' : 'var(--color-bear)',
                      }}
                    >
                      {isBull ? '+' : ''}{data.change24h}%
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>${data.high24h.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>${data.low24h.toLocaleString()}</td>
                  <td style={{ color: 'var(--text-muted)' }}>${data.volume24h}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
