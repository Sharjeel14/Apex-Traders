import { useMarketStore } from '@src/store/marketStore'
import { useI18nStore } from '@src/store/i18nStore'
import { ArrowDownUp, Settings, Sparkles } from 'lucide-react'

export function SwapCard() {
  const t = useI18nStore((s) => s.t)
  const swapForm = useMarketStore((s) => s.swapForm)
  const setSwapField = useMarketStore((s) => s.setSwapField)
  const submitSwap = useMarketStore((s) => s.submitSwap)
  const portfolio = useMarketStore((s) => s.portfolio)
  const pairs = useMarketStore((s) => s.pairs)

  const tokenList = ['USDT', 'BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE', 'ADA']

  const fromBal = portfolio[swapForm.fromAsset] || 0
  const toBal = portfolio[swapForm.toAsset] || 0

  const handleFlip = () => {
    const prevFrom = swapForm.fromAsset
    const prevTo = swapForm.toAsset
    setSwapField('fromAsset', prevTo)
    setSwapField('toAsset', prevFrom)
  }

  const handleMax = () => {
    setSwapField('fromAmount', fromBal.toString())
  }

  // Calculate rate
  const fromPrice = swapForm.fromAsset === 'USDT' ? 1 : (pairs[`${swapForm.fromAsset}/USDT`]?.price || 1)
  const toPrice = swapForm.toAsset === 'USDT' ? 1 : (pairs[`${swapForm.toAsset}/USDT`]?.price || 1)
  const rate = (fromPrice / toPrice).toFixed(6)

  return (
    <div className="v2-card v2-swap-card">
      <div className="v2-swap-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="#8b5cf6" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{t('dex.swap')}</h3>
        </div>
        <button type="button" style={{ color: 'var(--text-muted)' }}>
          <Settings size={18} />
        </button>
      </div>

      {/* From Input Box */}
      <div className="v2-swap-input-box">
        <div className="v2-swap-input-row" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>{t('dex.youPay')}</span>
          <span>
            Balance: <b style={{ color: 'var(--text-primary)' }}>{fromBal.toLocaleString()}</b>
          </span>
        </div>
        <div className="v2-swap-input-row">
          <input
            type="number"
            className="v2-swap-input-num"
            placeholder="0.0"
            value={swapForm.fromAmount}
            onChange={(e) => setSwapField('fromAmount', e.target.value)}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              onClick={handleMax}
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-xs)',
                background: 'rgba(59, 130, 246, 0.1)',
              }}
            >
              MAX
            </button>
            <select
              className="v2-token-selector"
              value={swapForm.fromAsset}
              onChange={(e) => setSwapField('fromAsset', e.target.value)}
            >
              {tokenList.map((tok) => (
                <option key={tok} value={tok}>
                  {tok}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Flip Button */}
      <div className="v2-swap-divider">
        <button type="button" className="v2-swap-flip-btn" onClick={handleFlip}>
          <ArrowDownUp size={16} />
        </button>
      </div>

      {/* To Input Box */}
      <div className="v2-swap-input-box">
        <div className="v2-swap-input-row" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>{t('dex.youReceive')}</span>
          <span>
            Balance: <b style={{ color: 'var(--text-primary)' }}>{toBal.toLocaleString()}</b>
          </span>
        </div>
        <div className="v2-swap-input-row">
          <input
            type="number"
            className="v2-swap-input-num"
            placeholder="0.0"
            readOnly
            value={swapForm.toAmount}
          />
          <select
            className="v2-token-selector"
            value={swapForm.toAsset}
            onChange={(e) => setSwapField('toAsset', e.target.value)}
          >
            {tokenList.map((tok) => (
              <option key={tok} value={tok}>
                {tok}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Details breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '4px 8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{t('dex.exchangeRate')}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            1 {swapForm.fromAsset} = {rate} {swapForm.toAsset}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{t('dex.slippage')}</span>
          <span>{swapForm.slippage}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{t('dex.networkFee')}</span>
          <span style={{ color: 'var(--color-bull)' }}>$0.00 (Gasless)</span>
        </div>
      </div>

      {/* Execute Swap Button */}
      <button type="button" className="v2-swap-btn" onClick={submitSwap}>
        {t('dex.swapButton')}
      </button>
    </div>
  )
}
