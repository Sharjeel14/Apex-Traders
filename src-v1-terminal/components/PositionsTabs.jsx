import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'

export function PositionsTabs() {
  const t = useI18nStore((s) => s.t)
  const userOrders = useMarketStore((s) => s.userOrders)
  const cancelOrder = useMarketStore((s) => s.cancelOrder)

  return (
    <div className="v1-bottom-section">
      <div className="v1-panel-header" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--color-primary)', paddingBottom: '8px' }}>
            {t('trade.openOrders')} ({userOrders.filter((o) => o.status === 'Open').length})
          </span>
          <span>{t('trade.orderHistory')}</span>
          <span>Asset Balances</span>
        </div>
      </div>

      <div style={{ padding: '12px', overflowX: 'auto' }}>
        <table className="v1-book-table" style={{ textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Time</th>
              <th style={{ textAlign: 'left' }}>Pair</th>
              <th style={{ textAlign: 'left' }}>Side</th>
              <th style={{ textAlign: 'left' }}>Type</th>
              <th>Price</th>
              <th>Amount</th>
              <th style={{ textAlign: 'center' }}>Status</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  No active orders recorded
                </td>
              </tr>
            ) : (
              userOrders.map((ord) => (
                <tr key={ord.id} className="v1-book-row">
                  <td style={{ textAlign: 'left', color: 'var(--text-muted)' }}>{ord.time}</td>
                  <td style={{ textAlign: 'left', fontWeight: 600 }}>{ord.pair}</td>
                  <td style={{ textAlign: 'left', color: ord.side === 'buy' ? 'var(--color-bull)' : 'var(--color-bear)', fontWeight: 600 }}>
                    {ord.side.toUpperCase()}
                  </td>
                  <td style={{ textAlign: 'left' }}>{ord.type.toUpperCase()}</td>
                  <td>${ord.price.toLocaleString()}</td>
                  <td>{ord.amount}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span
                      style={{
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.7rem',
                        background: ord.status === 'Filled' ? 'var(--color-bull-bg)' : 'var(--color-purple-bg)',
                        color: ord.status === 'Filled' ? 'var(--color-bull)' : 'var(--color-purple)',
                      }}
                    >
                      {ord.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {ord.status === 'Open' ? (
                      <button
                        type="button"
                        onClick={() => cancelOrder(ord.id)}
                        style={{ color: 'var(--color-bear)', fontSize: '0.75rem', textDecoration: 'underline' }}
                      >
                        Cancel
                      </button>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Done</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
