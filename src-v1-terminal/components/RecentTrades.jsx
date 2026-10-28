import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'

export function RecentTrades() {
  const t = useI18nStore((s) => s.t)
  const recentTrades = useMarketStore((s) => s.recentTrades)

  return (
    <div className="v1-panel" style={{ height: '100%', minHeight: '260px' }}>
      <div className="v1-panel-header">
        <span>{t('trade.recentTrades')}</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--color-bull)' }}>LIVE ●</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <table className="v1-book-table">
          <thead>
            <tr>
              <th>{t('trade.price')}</th>
              <th>{t('trade.amount')}</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentTrades.map((tr) => (
              <tr key={tr.id} className="v1-book-row">
                <td style={{ color: tr.type === 'buy' ? 'var(--color-bull)' : 'var(--color-bear)' }}>
                  {tr.price.toLocaleString()}
                </td>
                <td>{tr.amount}</td>
                <td style={{ color: 'var(--text-muted)' }}>{tr.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
