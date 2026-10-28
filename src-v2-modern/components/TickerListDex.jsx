import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'
import { Search, Sparkles, TrendingUp, TrendingDown, ArrowRight, BarChart2 } from 'lucide-react'

export function TickerListDex() {
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
    <div style={{ maxWidth: '1200px', width: '100%', margin: '20px auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Hero Banner */}
      <div className="v2-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', padding: '24px 20px' }}>
        <div style={{ flex: '1 1 280px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))', color: 'var(--color-purple)', fontSize: '0.75rem', fontWeight: 800, marginBottom: '10px' }}>
            <Sparkles size={13} />
            <span>DISCOVER CRYPTO MARKETS</span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.2 }}>
            {t('list.title')}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '4px', maxWidth: '600px' }}>
            {t('list.subtitle')}
          </p>
        </div>

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-full)', padding: '8px 16px', width: '100%', maxWidth: '380px' }}>
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

      {/* Grid of Ticker Items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredPairs.map(([pair, data]) => {
          const isBull = data.change24h >= 0

          return (
            <div
              key={pair}
              className="v2-card"
              onClick={() => selectTickerAndOpenTrade(pair)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #ec4899)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {data.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{pair}</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{data.name}</div>
                  </div>
                </div>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    background: isBull ? 'var(--color-bull-bg)' : 'var(--color-bear-bg)',
                    color: isBull ? 'var(--color-bull)' : 'var(--color-bear)',
                  }}
                >
                  {isBull ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {isBull ? '+' : ''}{data.change24h}%
                </span>
              </div>

              {/* Price and 24h stats */}
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
                  ${data.price.toLocaleString()}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
                  <span>24h Range: <b>${data.low24h} - ${data.high24h}</b></span>
                  <span>Vol: <b>${data.volume24h}</b></span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  selectTickerAndOpenTrade(pair)
                }}
                className="v2-swap-btn"
                style={{
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <BarChart2 size={16} />
                <span>{t('list.actionTrade')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
