import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useMarketStore } from '@src/store/marketStore'
import { useIndicatorStore } from '@src/store/indicatorStore'
import { useThemeStore } from '@src/store/themeStore'
import { calculateSMA, calculateEMA, calculateBollingerBands, calculateRSI, calculateMACD } from '@src/shared/indicators'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

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

  if (!pairData) return null

  const prices = pairData.history
  const labels = pairData.timestamps

  // Indicator series
  const sma20 = showSMA20 ? calculateSMA(prices, 20) : null
  const sma50 = showSMA50 ? calculateSMA(prices, 50) : null
  const ema12 = showEMA12 ? calculateEMA(prices, 12) : null
  const ema26 = showEMA26 ? calculateEMA(prices, 26) : null
  const bollinger = showBollinger ? calculateBollingerBands(prices, 20, 2) : null
  const rsi = showRSI ? calculateRSI(prices, 14) : null
  const macd = showMACD ? calculateMACD(prices, 12, 26, 9) : null

  // Colors
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)'
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const isBull = pairData.change24h >= 0

  // Main Price Datasets
  const datasets = [
    {
      label: `${activePair} Price`,
      data: prices,
      borderColor: isBull ? '#10b981' : '#ef4444',
      backgroundColor: isBull
        ? isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)'
        : isDark ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.08)',
      fill: true,
      tension: 0.15,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
    },
  ]

  if (sma20) {
    datasets.push({
      label: 'SMA (20)',
      data: sma20,
      borderColor: '#f59e0b',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
    })
  }
  if (sma50) {
    datasets.push({
      label: 'SMA (50)',
      data: sma50,
      borderColor: '#ec4899',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
    })
  }
  if (ema12) {
    datasets.push({
      label: 'EMA (12)',
      data: ema12,
      borderColor: '#06b6d4',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
    })
  }
  if (ema26) {
    datasets.push({
      label: 'EMA (26)',
      data: ema26,
      borderColor: '#8b5cf6',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
    })
  }
  if (bollinger) {
    datasets.push(
      {
        label: 'Bollinger Upper',
        data: bollinger.upper,
        borderColor: 'rgba(59, 130, 246, 0.6)',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Bollinger Lower',
        data: bollinger.lower,
        borderColor: 'rgba(59, 130, 246, 0.6)',
        borderWidth: 1,
        borderDash: [4, 4],
        pointRadius: 0,
        fill: false,
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
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          boxWidth: 12,
          font: { size: 10, family: 'Inter' },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#334155',
        borderColor: isDark ? '#334155' : '#cbd5e1',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 9 }, maxTicksLimit: 8 },
      },
      y: {
        position: 'right',
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 9, family: 'monospace' } },
      },
    },
  }

  // RSI Options & Data
  const rsiData = rsi
    ? {
        labels,
        datasets: [
          {
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
        grid: { color: gridColor },
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
              v >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'
            ),
          },
        ],
      }
    : null

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '440px' }}>
      {/* Timeframe Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {timeframes.map((tf) => (
            <button
              key={tf}
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
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Last: ${pairData.price.toLocaleString()} ({isBull ? '+' : ''}{pairData.change24h}%)
        </div>
      </div>

      {/* Main Chart */}
      <div style={{ flex: 1, minHeight: '260px', padding: '8px 12px 4px 12px', position: 'relative' }}>
        <Line data={{ labels, datasets }} options={mainOptions} />
      </div>

      {/* Sub-chart: RSI */}
      {showRSI && rsiData && (
        <div style={{ height: '90px', padding: '0 12px', borderTop: '1px solid var(--border-subtle)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 4, left: 14, fontSize: '0.68rem', color: '#a855f7', fontWeight: 600 }}>
            RSI (14) — 70 Overbought / 30 Oversold
          </div>
          <Line data={rsiData} options={rsiOptions} />
        </div>
      )}

      {/* Sub-chart: MACD */}
      {showMACD && macdData && (
        <div style={{ height: '90px', padding: '0 12px', borderTop: '1px solid var(--border-subtle)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 4, left: 14, fontSize: '0.68rem', color: '#3b82f6', fontWeight: 600 }}>
            MACD (12, 26, 9)
          </div>
          <Line data={macdData} options={rsiOptions} />
        </div>
      )}
    </div>
  )
}
