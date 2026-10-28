import { useI18nStore } from '@src/store/i18nStore'
import { Zap, ShieldCheck, HeartHandshake, Layers } from 'lucide-react'

export function AboutPage() {
  const t = useI18nStore((s) => s.t)

  const cards = [
    {
      icon: <Zap size={24} color="#ec4899" />,
      title: 'Decentralized AMM Architecture',
      desc: 'Constant product automated market maker routing that minimizes slippage across high-volatility token pairs.',
    },
    {
      icon: <Layers size={24} color="#3b82f6" />,
      title: 'Full Technical Indicator Engine',
      desc: 'Seamless Chart.js integration displaying SMA, EMA, Bollinger Bands, RSI, and MACD indicators with responsive updates.',
    },
    {
      icon: <ShieldCheck size={24} color="#10b981" />,
      title: 'Non-Custodial Transparency',
      desc: 'All smart contract interactions and swap routes are verified on-chain with zero hidden fees and no lockups.',
    },
    {
      icon: <HeartHandshake size={24} color="#8b5cf6" />,
      title: 'Community Driven Liquidity',
      desc: 'Liquidity providers earn automated yield on every executed trade across multi-chain bridges.',
    },
  ]

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div className="v2-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900 }}>
          About <span className="v2-brand-gradient">ApexDex</span>
        </h1>
        <p style={{ maxWidth: '640px', margin: '16px auto 0 auto', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          {t('about.missionText')}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {cards.map((c, i) => (
          <div key={i} className="v2-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>{c.icon}</div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{c.title}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
