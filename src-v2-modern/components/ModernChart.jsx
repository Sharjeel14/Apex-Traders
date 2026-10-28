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
import { useI18nStore } from '@src/store/i18nStore'
import { calculateSMA, calculateEMA, calculateBollingerBands, calculateRSI, calculateMACD } from '@src/shared/indicators'
import { Layers } from 'lucide-react'

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

export function ModernChart() {
  const activePair = useMarketStore((s) => s.activePair)
  const pairData = useMarketStore((s) => s.pairs[activePair])
  const timeframe = useMarketStore((s) => s.timeframe)
  const setTimeframe = useMarketStore((s) => s.setTimeframe)

  const theme = useThemeStore((s) => s.theme)
  const isDark = theme === 'dark'
  const t = useI18nStore((s) => s.t)

  const showSMA20 = useIndicatorStore((s) => s.showSMA20)
  const showSMA50 = useIndicatorStore((s) => s.showSMA50)
  const showEMA12 = useIndicatorStore((s) => s.showEMA12)
  const showEMA26 = useIndicatorStore((s) => s.showEMA26)
  const showBollinger = useIndicatorStore((s) => s.showBollinger)
  const showRSI = useIndicatorStore((s) => s.showRSI)
  const showMACD = useIndicatorStore((s) => s.showMACD)
  const toggleIndicator = useIndicatorStore((s) => s.toggleIndicator)

  if (!pairData) return null

  const prices = pairData.history
  const labels = pairData.timestamps

  // Calculations
  const sma20 = showSMA20 ? calculateSMA(prices, 20) : null
  const sma50 = showSMA50 ? calculateSMA(prices, 50) : null
  const ema12 = showEMA12 ? calculateEMA(prices, 12) : null
  const ema26 = showEMA26 ? calculateEMA(prices, 26) : null
  const bollinger = showBollinger ? calculateBollingerBands(prices, 20, 2) : null
  const rsi = showRSI ? calculateRSI(prices, 14) : null
  const macd = showMACD ? calculateMACD(prices, 12, 26, 9) : null

  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)'
  const textColor = isDark ? '#94a3b8' : '#64748b'
  const isBull = pairData.change24h >= 0

  const datasets = [
    {
      label: `${activePair} Index`,
      data: prices,
      borderColor: isBull ? '#10b981' : '#ef4444',
      backgroundColor: isBull
        ? isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)'
        : isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.3,
      borderWidth: 2.5,
      pointRadius: 0,
      pointHoverRadius: 5,
    },
  ]

  if (sma20) {
    datasets.push({
      label: 'SMA 20',
      data: sma20,
      borderColor: '#f59e0b',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
    })
  }
  if (sma50) {
    datasets.push({
      label: 'SMA 50',
      data: sma50,
      borderColor: '#ec4899',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
    })
  }
  if (ema12) {
    datasets.push({
      label: 'EMA 12',
      data: ema12,
      borderColor: '#06b6d4',
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
    })
  }
  if (ema26) {
    datasets.push({
      label: 'EMA 26',
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
        label: 'BB Upper',
        data: bollinger.upper,
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1.5,
        borderDash: [3, 3],
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'BB Lower',
        data: bollinger.lower,
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1.5,
        borderDash: [3, 3],
        pointRadius: 0,
        fill: false,
      }
    )
  }

  const chartOptions = {
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
          boxWidth: 10,
          font: { size: 11, family: 'Inter', weight: '500' },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        titleColor: isDark ? '#f8fafc' : '#0f172a',
        bodyColor: isDark ? '#cbd5e1' : '#334155',
        borderColor: isDark ? '#334155' : '#cbd5e1',
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 10 }, maxTicksLimit: 7 },
      },
      y: {
        position: 'right',
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 10, family: 'monospace' } },
      },
    },
  }

  const indicatorPills = [
    { key: 'showSMA20', label: 'SMA (20)', active: showSMA20, color: '#f59e0b' },
    { key: 'showSMA50', label: 'SMA (50)', active: showSMA50, color: '#ec4899' },
    { key: 'showEMA12', label: 'EMA (12)', active: showEMA12, color: '#06b6d4' },
    { key: 'showEMA26', label: 'EMA (26)', active: showEMA26, color: '#8b5cf6' },
    { key: 'showBollinger', label: 'Bollinger', active: showBollinger, color: '#3b82f6' },
    { key: 'showRSI', label: 'RSI (14)', active: showRSI, color: '#a855f7' },
    { key: 'showMACD', label: 'MACD', active: showMACD, color: '#f97316' },
  ]

  const rsiData = rsi
    ? {
        labels,
        datasets: [
          {
            label: 'RSI',
            data: rsi,
            borderColor: '#a855f7',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      }
    : null

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
            label: 'Hist',
            data: macd.histogram,
            backgroundColor: macd.histogram.map((v) =>
              v >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'
            ),
          },
        ],
      }
    : null

  return (
    <div className="v2-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header Info & Timeframes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{activePair}</h2>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                background: isBull ? 'var(--color-bull-bg)' : 'var(--color-bear-bg)',
                color: isBull ? 'var(--color-bull)' : 'var(--color-bear)',
              }}
            >
              {isBull ? '+' : ''}{pairData.change24h}%
            </span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
            ${pairData.price.toLocaleString()}
          </div>
        </div>

        {/* Timeframe Buttons */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-surface-elevated)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          {['1m', '5m', '15m', '1h', '4h', '1d'].map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: timeframe === tf ? 'var(--color-primary)' : 'transparent',
                color: timeframe === tf ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Indicator Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', padding: '8px 12px', background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', flexShrink: 0 }}>
          <Layers size={14} />
          <span>{t('trade.indicators')}:</span>
        </div>
        {indicatorPills.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => toggleIndicator(p.key)}
            style={{
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.72rem',
              fontWeight: 700,
              border: `1px solid ${p.active ? p.color : 'var(--border-subtle)'}`,
              background: p.active ? 'var(--bg-surface)' : 'transparent',
              color: p.active ? p.color : 'var(--text-muted)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <div className="v2-chart-container">
        <Line data={{ labels, datasets }} options={chartOptions} />
      </div>

      {/* RSI Sub-Chart */}
      {showRSI && rsiData && (
        <div style={{ height: '80px', padding: '4px 0', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.68rem', color: '#a855f7', fontWeight: 700, marginBottom: '2px' }}>
            RSI (14) Momentum Oscillator
          </div>
          <Line
            data={rsiData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { display: false },
                y: { min: 0, max: 100, position: 'right', ticks: { color: textColor, font: { size: 9 }, stepSize: 30 } },
              },
            }}
          />
        </div>
      )}

      {/* MACD Sub-Chart */}
      {showMACD && macdData && (
        <div style={{ height: '80px', padding: '4px 0', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.68rem', color: '#3b82f6', fontWeight: 700, marginBottom: '2px' }}>
            MACD Histogram & Signal
          </div>
          <Line
            data={macdData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { display: false },
                y: { position: 'right', ticks: { color: textColor, font: { size: 9 } } },
              },
            }}
          />
        </div>
      )}
    </div>
  )
}
