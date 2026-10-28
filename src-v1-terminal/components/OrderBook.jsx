import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'

export function OrderBook() {
  const t = useI18nStore((s) => s.t)
  const orderBook = useMarketStore((s) => s.orderBook)
  const activePair = useMarketStore((s) => s.activePair)
  const currentPairData = useMarketStore((s) => s.pairs[activePair])
  const setOrderField = useMarketStore((s) => s.setOrderField)

  if (!currentPairData) return null

  const handleRowClick = (price) => {
    setOrderField('price', price.toString())
  }

  return (
    <div className="v1-panel" style={{ height: '100%', minHeight: '440px' }}>
      <div className="v1-panel-header">
        <span>{t('trade.orderBook')}</span>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>0.1</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {/* Asks (Sells - Red) */}
        <table className="v1-book-table">
          <thead>
            <tr>
              <th>{t('trade.price')}</th>
              <th>{t('trade.amount')}</th>
              <th>{t('trade.total')}</th>
            </tr>
          </thead>
          <tbody>
            {[...orderBook.asks].reverse().map((ask, idx) => (
              <tr key={`ask-${idx}`} className="v1-book-row" onClick={() => handleRowClick(ask.price)}>
                <td style={{ color: 'var(--color-bear)' }}>{ask.price.toLocaleString()}</td>
                <td>{ask.amount}</td>
                <td>{ask.total}</td>
                <div className="v1-depth-bar ask" style={{ width: `${ask.depth}%` }} />
              </tr>
            ))}
          </tbody>
        </table>

        {/* Current Mid Price */}
        <div className="v1-mid-price">
          <span style={{ color: currentPairData.change24h >= 0 ? 'var(--color-bull)' : 'var(--color-bear)' }}>
            ${currentPairData.price.toLocaleString()}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {currentPairData.change24h >= 0 ? '▲' : '▼'} {currentPairData.change24h}%
          </span>
        </div>

        {/* Bids (Buys - Green) */}
        <table className="v1-book-table">
          <tbody>
            {orderBook.bids.map((bid, idx) => (
              <tr key={`bid-${idx}`} className="v1-book-row" onClick={() => handleRowClick(bid.price)}>
                <td style={{ color: 'var(--color-bull)' }}>{bid.price.toLocaleString()}</td>
                <td>{bid.amount}</td>
                <td>{bid.total}</td>
                <div className="v1-depth-bar bid" style={{ width: `${bid.depth}%` }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
