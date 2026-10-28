import { useI18nStore } from '@src/store/i18nStore'
import { Shield, Cpu, Activity, Database } from 'lucide-react'

export function AboutPage() {
  const t = useI18nStore((s) => s.t)

  const features = [
    {
      icon: <Cpu size={24} color="#3b82f6" />,
      title: 'Ultra Low-Latency Matching',
      desc: 'Engineered with a high-throughput order matching engine supporting up to 250,000 orders per second with deterministic sub-millisecond execution.',
    },
    {
      icon: <Activity size={24} color="#10b981" />,
      title: 'Chart.js Indicator Suite',
      desc: 'Real-time multi-indicator visual analytics incorporating SMA, EMA, Bollinger Bands, RSI, MACD, and volume profiles.',
    },
    {
      icon: <Database size={24} color="#8b5cf6" />,
      title: 'Deep Institutional Liquidity',
      desc: 'Aggregated cross-exchange order books ensuring tight spreads and minimal slippage across top cryptocurrencies.',
    },
    {
      icon: <Shield size={24} color="#f59e0b" />,
      title: 'Military-Grade Security',
      desc: 'Multi-signature cold storage custody, SOC2 compliance, and end-to-end cryptographic transaction verification.',
    },
  ]

  return (
    <div className="v1-page-container">
      <div className="v1-card">
        <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 'var(--radius-xs)', background: 'var(--color-purple-bg)', color: 'var(--color-purple)', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
          {t('about.badge')}
        </div>
        <h1 className="v1-page-title">{t('about.title')}</h1>
        <p className="v1-page-subtitle" style={{ marginTop: '8px', lineHeight: 1.6 }}>
          {t('about.missionText')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {features.map((item, idx) => (
          <div key={idx} className="v1-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>{item.icon}</div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{item.title}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="v1-card" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-bull)', fontFamily: 'var(--font-mono)' }}>$4.8B+</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>24h Global Volume</div>
        </div>
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>&lt; 1ms</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Matching Latency</div>
        </div>
        <div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-purple)', fontFamily: 'var(--font-mono)' }}>99.999%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Engine Uptime SLA</div>
        </div>
      </div>
    </div>
  )
}
