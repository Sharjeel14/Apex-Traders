import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'
import { Search, TrendingUp, TrendingDown, ArrowRight, BarChart2, Zap } from 'lucide-react'

export function TickerListHome() {
  const t = useI18nStore((s) => s.t)
  const pairs = useMarketStore((s) => s.pairs)
  const searchQuery = useMarketStore((s) => s.searchQuery)
  const setSearchQuery = useMarketStore((s) => s.setSearchQuery)
  const selectTickerAndOpenTrade = useMarketStore((s) => s.selectTickerAndOpenTrade)

  const filteredPairs = Object.entries(pairs).filter(([pair, data]) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return pair.toLowerCase().includes(q) || data.name.toLowerCase().includes(q)
  })

  return (
    <div style={{ maxWidth: '1200px', width: '100%', margin: '24px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div className="v1-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 8px', borderRadius: 'var(--radius-xs)', background: 'var(--color-bull-bg)', color: 'var(--color-bull)', fontSize: '0.72rem', fontWeight: 700, marginBottom: '8px' }}>
            <Zap size={13} />
            <span>INSTITUTIONAL TICKER DIRECTORY</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {t('list.title')}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
            {t('list.subtitle')}
          </p>
        </div>

        {/* Search input in Zustand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-xs)', padding: '8px 14px', minWidth: '280px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder={t('list.search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Tickers Table */}
      <div className="v1-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface-elevated)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Available Crypto Pairs ({filteredPairs.length})
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Click any row to open Chart & Order Book
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="v1-book-table" style={{ fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface)' }}>
                <th style={{ padding: '12px 18px', textAlign: 'left' }}>Market Asset</th>
                <th style={{ padding: '12px 18px' }}>Last Price</th>
                <th style={{ padding: '12px 18px' }}>24h Change</th>
                <th style={{ padding: '12px 18px' }}>24h High</th>
                <th style={{ padding: '12px 18px' }}>24h Low</th>
                <th style={{ padding: '12px 18px' }}>24h Volume</th>
                <th style={{ padding: '12px 18px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPairs.map(([pair, data]) => {
                const isBull = data.change24h >= 0

                return (
                  <tr
                    key={pair}
                    className="v1-book-row"
                    onClick={() => selectTickerAndOpenTrade(pair)}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <td style={{ padding: '14px 18px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 'var(--radius-xs)',
                            background: 'var(--bg-surface-elevated)',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            color: 'var(--color-primary)',
                            fontSize: '0.8rem',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {data.symbol}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{pair}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{data.name}</div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem' }}>
                      ${data.price.toLocaleString()}
                    </td>

                    <td style={{ padding: '14px 18px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-xs)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: isBull ? 'var(--color-bull-bg)' : 'var(--color-bear-bg)',
                          color: isBull ? 'var(--color-bull)' : 'var(--color-bear)',
                        }}
                      >
                        {isBull ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {isBull ? '+' : ''}{data.change24h}%
                      </span>
                    </td>

                    <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      ${data.high24h.toLocaleString()}
                    </td>

                    <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      ${data.low24h.toLocaleString()}
                    </td>

                    <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      ${data.volume24h}
                    </td>

                    <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          selectTickerAndOpenTrade(pair)
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: 'var(--radius-xs)',
                          background: 'var(--color-primary)',
                          color: '#fff',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        <BarChart2 size={13} />
                        <span>{t('list.actionTrade')}</span>
                        <ArrowRight size={13} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
