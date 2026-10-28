import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'

export function OrderPanel() {
  const t = useI18nStore((s) => s.t)
  const activePair = useMarketStore((s) => s.activePair)
  const currentPairData = useMarketStore((s) => s.pairs[activePair])
  const orderForm = useMarketStore((s) => s.orderForm)
  const setOrderField = useMarketStore((s) => s.setOrderField)
  const submitOrder = useMarketStore((s) => s.submitOrder)
  const portfolio = useMarketStore((s) => s.portfolio)

  if (!currentPairData) return null

  const baseSymbol = currentPairData.symbol
  const quoteSymbol = 'USDT'
  const isBuy = orderForm.side === 'buy'

  const available = isBuy ? portfolio.USDT : portfolio[baseSymbol] || 0

  const handlePercentage = (pct) => {
    setOrderField('sliderPercent', pct)
    if (isBuy) {
      const priceNum = orderForm.type === 'market' ? currentPairData.price : parseFloat(orderForm.price) || currentPairData.price
      const totalToSpend = (portfolio.USDT * pct) / 100
      const amt = (totalToSpend / priceNum).toFixed(4)
      setOrderField('amount', amt)
    } else {
      const amt = (((portfolio[baseSymbol] || 0) * pct) / 100).toFixed(4)
      setOrderField('amount', amt)
    }
  }

  return (
    <div className="v1-panel">
      <div className="v1-panel-header">
        <span>{t('trade.placeOrder')}</span>
        <span>{orderForm.type.toUpperCase()}</span>
      </div>

      <div className="v1-order-form">
        {/* Buy / Sell Tabs */}
        <div className="v1-tab-group">
          <button
            type="button"
            className={`v1-tab-btn ${isBuy ? 'active-buy' : ''}`}
            onClick={() => setOrderField('side', 'buy')}
          >
            {t('trade.buy')} {baseSymbol}
          </button>
          <button
            type="button"
            className={`v1-tab-btn ${!isBuy ? 'active-sell' : ''}`}
            onClick={() => setOrderField('side', 'sell')}
          >
            {t('trade.sell')} {baseSymbol}
          </button>
        </div>

        {/* Limit / Market Switch */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setOrderField('type', 'limit')}
            style={{
              flex: 1,
              padding: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-subtle)',
              background: orderForm.type === 'limit' ? 'var(--bg-surface-hover)' : 'transparent',
              color: orderForm.type === 'limit' ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            {t('trade.limit')}
          </button>
          <button
            type="button"
            onClick={() => {
              setOrderField('type', 'market')
              setOrderField('price', currentPairData.price.toString())
            }}
            style={{
              flex: 1,
              padding: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-subtle)',
              background: orderForm.type === 'market' ? 'var(--bg-surface-hover)' : 'transparent',
              color: orderForm.type === 'market' ? 'var(--text-primary)' : 'var(--text-muted)',
            }}
          >
            {t('trade.market')}
          </button>
        </div>

        {/* Price Input (if Limit) */}
        {orderForm.type === 'limit' && (
          <div className="v1-input-group">
            <div className="v1-input-label">
              <span>{t('trade.price')}</span>
              <span>{quoteSymbol}</span>
            </div>
            <div className="v1-input-wrap">
              <input
                type="number"
                className="v1-input-field"
                value={orderForm.price}
                onChange={(e) => setOrderField('price', e.target.value)}
              />
              <span className="v1-input-suffix">{quoteSymbol}</span>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div className="v1-input-group">
          <div className="v1-input-label">
            <span>{t('trade.amount')}</span>
            <span>{baseSymbol}</span>
          </div>
          <div className="v1-input-wrap">
            <input
              type="number"
              placeholder="0.00"
              className="v1-input-field"
              value={orderForm.amount}
              onChange={(e) => setOrderField('amount', e.target.value)}
            />
            <span className="v1-input-suffix">{baseSymbol}</span>
          </div>
        </div>

        {/* Percentage Shortcuts */}
        <div className="v1-pct-buttons">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              className="v1-pct-btn"
              onClick={() => handlePercentage(pct)}
            >
              {pct}%
            </button>
          ))}
        </div>

        {/* Available Balance */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', margin: '4px 0' }}>
          <span>{t('trade.balance')}:</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 600 }}>
            {available.toLocaleString()} {isBuy ? quoteSymbol : baseSymbol}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className={`v1-submit-btn ${isBuy ? 'buy' : 'sell'}`}
          onClick={submitOrder}
        >
          {isBuy ? t('trade.buy') : t('trade.sell')} {baseSymbol}
        </button>
      </div>
    </div>
  )
}
