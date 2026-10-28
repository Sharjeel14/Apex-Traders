import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'
import { Wallet, TrendingUp } from 'lucide-react'

export function PortfolioWidget() {
  const t = useI18nStore((s) => s.t)
  const portfolio = useMarketStore((s) => s.portfolio)
  const pairs = useMarketStore((s) => s.pairs)

  // Compute total valuation
  let totalUSD = portfolio.USDT || 0
  for (const [tok, amt] of Object.entries(portfolio)) {
    if (tok === 'USDT') continue
    const pairPrice = pairs[`${tok}/USDT`]?.price || 0
    totalUSD += amt * pairPrice
  }

  const assets = [
    { symbol: 'USDT', amt: portfolio.USDT, value: portfolio.USDT, color: '#10b981' },
    { symbol: 'BTC', amt: portfolio.BTC, value: portfolio.BTC * (pairs['BTC/USDT']?.price || 0), color: '#f59e0b' },
    { symbol: 'ETH', amt: portfolio.ETH, value: portfolio.ETH * (pairs['ETH/USDT']?.price || 0), color: '#3b82f6' },
    { symbol: 'SOL', amt: portfolio.SOL, value: portfolio.SOL * (pairs['SOL/USDT']?.price || 0), color: '#8b5cf6' },
  ]

  return (
    <div className="v2-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Wallet size={18} color="#3b82f6" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{t('dex.portfolioOverview')}</h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-bull)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
          <TrendingUp size={12} /> +5.4% (24h)
        </span>
      </div>

      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Estimated Net Worth</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-mono)' }}>
          ${Math.round(totalUSD).toLocaleString()}
        </div>
      </div>

      {/* Asset distribution bar */}
      <div style={{ display: 'flex', height: '8px', borderRadius: 'var(--radius-full)', overflow: 'hidden', gap: '2px' }}>
        {assets.map((ast) => {
          const pct = Math.max(4, Math.round((ast.value / totalUSD) * 100))
          return (
            <div
              key={ast.symbol}
              style={{ width: `${pct}%`, background: ast.color }}
              title={`${ast.symbol}: ${pct}%`}
            />
          )
        })}
      </div>

      {/* Asset details list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {assets.map((ast) => (
          <div key={ast.symbol} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: ast.color }} />
              <span style={{ fontWeight: 600 }}>{ast.symbol}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>${Math.round(ast.value).toLocaleString()}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ast.amt} {ast.symbol}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
