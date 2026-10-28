import 'chart.js/auto'
import { Chart as ChartJS } from 'chart.js'
import { Chart } from 'react-chartjs-2'
import { useMarketStore } from '@src/store/marketStore'
import { useIndicatorStore } from '@src/store/indicatorStore'
import { useThemeStore } from '@src/store/themeStore'
import { calculateSMA, calculateEMA, calculateBollingerBands, calculateRSI, calculateMACD } from '@src/shared/indicators'
import { LineChart as LineIcon, CandlestickChart as CandleIcon } from 'lucide-react'

// Candlestick High/Low Wicks Plugin (Binance Green #0ecb81 & Binance Red #f6465d)
const candlestickWicksPlugin = {
  id: 'candlestickWicksPlugin',
  beforeDatasetDraw(chart, args) {
    try {
      if (args.index !== 0) return
      const opts = chart.config.options?.plugins?.candlestickWicks
      if (!opts || !opts.enabled) return
      const candles = opts.candles || []
      const yScale = chart.scales?.y
      if (!yScale) return
      const meta = chart.getDatasetMeta(0)
      if (!meta || !meta.data) return

      const { ctx } = chart
      ctx.save()
      meta.data.forEach((bar, idx) => {
        const candle = candles[idx]
        if (!candle || !bar) return
        const x = bar.x
        if (typeof x !== 'number' || isNaN(x)) return
        const yHigh = yScale.getPixelForValue(candle.high)
        const yLow = yScale.getPixelForValue(candle.low)

        ctx.strokeStyle = candle.isBull ? '#0ecb81' : '#f6465d'
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(x, yHigh)
        ctx.lineTo(x, yLow)
        ctx.stroke()
      })
      ctx.restore()
    } catch {
      // Safe no-op
    }
  },
}

try {
  ChartJS.register(candlestickWicksPlugin)
} catch {
  // Already registered
}

export function TradingChart() {
  const activePair = useMarketStore((s) => s.activePair)
  const pairData = useMarketStore((s) => s.pairs[activePair])
  const timeframe = useMarketStore((s) => s.timeframe)
  const setTimeframe = useMarketStore((s) => s.setTimeframe)

  const theme = useThemeStore((s) => s.theme)
  const isDark = theme === 'dark'

  const showSMA20 = useIndicatorStore((s) => s.showSMA20)
  const showSMA50 = useIndicatorStore((s) => s.showSMA50)
  const showEMA12 = useIndicatorStore((s) => s.showEMA12)
  const showEMA26 = useIndicatorStore((s) => s.showEMA26)
  const showBollinger = useIndicatorStore((s) => s.showBollinger)
  const showRSI = useIndicatorStore((s) => s.showRSI)
  const showMACD = useIndicatorStore((s) => s.showMACD)
  const proChartPattern = useIndicatorStore((s) => s.proChartPattern)
  const setProChartPattern = useIndicatorStore((s) => s.setProChartPattern)

  if (!pairData) return null

  const prices = pairData.history || []
  const labels = pairData.timestamps || []
  const candles = pairData.candles || []

  // Indicator series
  const sma20 = showSMA20 ? calculateSMA(prices, 20) : null
  const sma50 = showSMA50 ? calculateSMA(prices, 50) : null
  const ema12 = showEMA12 ? calculateEMA(prices, 12) : null
  const ema26 = showEMA26 ? calculateEMA(prices, 26) : null
  const bollinger = showBollinger ? calculateBollingerBands(prices, 20, 2) : null
  const rsi = showRSI ? calculateRSI(prices, 14) : null
  const macd = showMACD ? calculateMACD(prices, 12, 26, 9) : null

  // Colors
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const isBull = pairData.change24h >= 0

  const isCandleMode = proChartPattern === 'candle' && candles.length > 0

  // Calculate dynamic Y-axis bounds so chart fills the vertical space like Binance
  const allValues = [
    ...prices,
    ...(isCandleMode ? candles.flatMap((c) => [c.low, c.high]) : []),
    ...(sma20 ? sma20.filter((v) => v !== null) : []),
    ...(bollinger ? [...bollinger.upper.filter((v) => v !== null), ...bollinger.lower.filter((v) => v !== null)] : []),
  ].filter((v) => typeof v === 'number' && !isNaN(v))

  const rawMin = allValues.length > 0 ? Math.min(...allValues) : pairData.price * 0.98
  const rawMax = allValues.length > 0 ? Math.max(...allValues) : pairData.price * 1.02
  const spread = Math.max(rawMax - rawMin, pairData.price * 0.005)
  const dec = pairData.price > 10 ? 2 : 4
  const yMin = Number((rawMin - spread * 0.12).toFixed(dec))
  const yMax = Number((rawMax + spread * 0.12).toFixed(dec))

  // Datasets
  const datasets = []

  if (isCandleMode) {
    // Binance Style Candlesticks
    datasets.push({
      type: 'bar',
      label: `${activePair} Candles`,
      data: candles.map((c) => {
        const lower = Math.min(c.open, c.close)
        const upper = Math.max(c.open, c.close)
        return lower === upper ? [lower - spread * 0.003, upper + spread * 0.003] : [lower, upper]
      }),
      backgroundColor: candles.map((c) => (c.isBull ? '#0ecb81' : '#f6465d')),
      borderColor: candles.map((c) => (c.isBull ? '#0ecb81' : '#f6465d')),
      borderWidth: 1,
      barPercentage: 0.75,
      order: 2,
    })
  } else {
    // Binance Signature Gold Line Chart (#f3ba2f) with smooth gradient
    datasets.push({
      type: 'line',
      label: `${activePair} Price`,
      data: prices,
      borderColor: '#f3ba2f',
      backgroundColor: (context) => {
        const ctx = context.chart?.ctx
        if (!ctx) return 'rgba(243, 186, 47, 0.1)'
        const gradient = ctx.createLinearGradient(0, 0, 0, 340)
        gradient.addColorStop(0, 'rgba(243, 186, 47, 0.28)')
        gradient.addColorStop(0.7, 'rgba(243, 186, 47, 0.04)')
        gradient.addColorStop(1, 'rgba(243, 186, 47, 0.0)')
        return gradient
      },
      fill: true,
      tension: 0.25,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: '#f3ba2f',
      pointHoverBorderColor: '#fff',
      pointHoverBorderWidth: 2,
      order: 2,
    })
  }

  // Indicator Overlays
  if (sma20) {
    datasets.push({
      type: 'line',
      label: 'SMA (20)',
      data: sma20,
      borderColor: '#38bdf8',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
      order: 1,
    })
  }
  if (sma50) {
    datasets.push({
      type: 'line',
      label: 'SMA (50)',
      data: sma50,
      borderColor: '#ec4899',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
      order: 1,
    })
  }
  if (ema12) {
    datasets.push({
      type: 'line',
      label: 'EMA (12)',
      data: ema12,
      borderColor: '#06b6d4',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
      order: 1,
    })
  }
  if (ema26) {
    datasets.push({
      type: 'line',
      label: 'EMA (26)',
      data: ema26,
      borderColor: '#8b5cf6',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
      order: 1,
    })
  }
  if (bollinger) {
    datasets.push(
      {
        type: 'line',
        label: 'Bollinger Upper',
        data: bollinger.upper,
        borderColor: 'rgba(59, 130, 246, 0.65)',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
        order: 1,
      },
      {
        type: 'line',
        label: 'Bollinger Lower',
        data: bollinger.lower,
        borderColor: 'rgba(59, 130, 246, 0.65)',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
        order: 1,
      }
    )
  }

  const mainOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      candlestickWicks: {
        enabled: isCandleMode,
        candles,
      },
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          boxWidth: 10,
          font: { size: 10, family: 'Inter', weight: '600' },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#181a20' : '#ffffff',
        titleColor: isDark ? '#eaecef' : '#0f172a',
        bodyColor: isDark ? '#b7bdc6' : '#334155',
        borderColor: isDark ? '#2b313a' : '#cbd5e1',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (context) => {
            if (isCandleMode && context.datasetIndex === 0) {
              const c = candles[context.dataIndex]
              if (!c) return ''
              return ` O: $${c.open.toLocaleString()} | H: $${c.high.toLocaleString()} | L: $${c.low.toLocaleString()} | C: $${c.close.toLocaleString()}`
            }
            return `${context.dataset.label}: ${context.formattedValue}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)' },
        ticks: { color: textColor, font: { size: 9 }, maxTicksLimit: 7 },
      },
      y: {
        position: 'right',
        beginAtZero: false,
        min: yMin,
        max: yMax,
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)' },
        ticks: {
          color: textColor,
          font: { size: 10, family: 'monospace' },
          callback: (val) => `$${Number(val).toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec })}`,
        },
      },
    },
  }

  // RSI Options & Data
  const rsiData = rsi
    ? {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'RSI (14)',
            data: rsi,
            borderColor: '#a855f7',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      }
    : null

  const rsiOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: {
        min: 0,
        max: 100,
        position: 'right',
        grid: { color: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)' },
        ticks: { color: textColor, font: { size: 9 }, stepSize: 30 },
      },
    },
  }

  // MACD Options & Data
  const macdData = macd
    ? {
        labels,
        datasets: [
          {
            type: 'line',
            label: 'MACD',
            data: macd.macdLine,
            borderColor: '#3b82f6',
            borderWidth: 1.5,
            pointRadius: 0,
          },
          {
            type: 'line',
            label: 'Signal',
            data: macd.signalLine,
            borderColor: '#f97316',
            borderWidth: 1.5,
            pointRadius: 0,
          },
          {
            type: 'bar',
            label: 'Histogram',
            data: macd.histogram,
            backgroundColor: macd.histogram.map((v) =>
              v >= 0 ? '#0ecb81' : '#f6465d'
            ),
          },
        ],
      }
    : null

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden' }}>
      {/* Timeframe & Pattern Toggle Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Line vs Candle Pattern Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '2px', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-medium)' }}>
            <button
              type="button"
              onClick={() => setProChartPattern('candle')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                fontSize: '0.72rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-xs)',
                background: proChartPattern === 'candle' ? 'var(--color-primary)' : 'transparent',
                color: proChartPattern === 'candle' ? '#fff' : 'var(--text-muted)',
              }}
              title="Candlestick Chart"
            >
              <CandleIcon size={12} />
              <span>Candles</span>
            </button>

            <button
              type="button"
              onClick={() => setProChartPattern('line')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                fontSize: '0.72rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-xs)',
                background: proChartPattern === 'line' ? 'var(--color-primary)' : 'transparent',
                color: proChartPattern === 'line' ? '#fff' : 'var(--text-muted)',
              }}
              title="Binance Gold Line Chart"
            >
              <LineIcon size={12} />
              <span>Line</span>
            </button>
          </div>

          {/* Timeframes */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {timeframes.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                style={{
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-xs)',
                  background: timeframe === tf ? 'var(--color-primary)' : 'transparent',
                  color: timeframe === tf ? '#fff' : 'var(--text-secondary)',
                  border: 'none',
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '0.75rem', color: isBull ? '#0ecb81' : '#f6465d', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
          Last: ${pairData.price.toLocaleString()} ({isBull ? '+' : ''}{pairData.change24h}%)
        </div>
      </div>

      {/* Main Chart - FIXED HEIGHT CONTAINER prevents infinite vertical expansion loop */}
      <div style={{ height: '340px', minHeight: '340px', maxHeight: '340px', padding: '8px 12px 4px 12px', position: 'relative', width: '100%', overflow: 'hidden' }}>
        <Chart
          key={`chart-${proChartPattern}-${activePair}`}
          type={isCandleMode ? 'bar' : 'line'}
          data={{ labels, datasets }}
          options={mainOptions}
        />
      </div>

      {/* Sub-chart: RSI */}
      {showRSI && rsiData && (
        <div style={{ height: '85px', minHeight: '85px', maxHeight: '85px', padding: '0 12px', borderTop: '1px solid var(--border-subtle)', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 4, left: 14, fontSize: '0.68rem', color: '#a855f7', fontWeight: 600 }}>
            RSI (14) — 70 Overbought / 30 Oversold
          </div>
          <Chart key={`rsi-${activePair}`} type="line" data={rsiData} options={rsiOptions} />
        </div>
      )}

      {/* Sub-chart: MACD */}
      {showMACD && macdData && (
        <div style={{ height: '85px', minHeight: '85px', maxHeight: '85px', padding: '0 12px', borderTop: '1px solid var(--border-subtle)', position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 4, left: 14, fontSize: '0.68rem', color: '#3b82f6', fontWeight: 600 }}>
            MACD (12, 26, 9)
          </div>
          <Chart key={`macd-${activePair}`} type="line" data={macdData} options={rsiOptions} />
        </div>
      )}
    </div>
  )
}
