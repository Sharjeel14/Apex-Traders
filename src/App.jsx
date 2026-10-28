import { useEffect } from 'react'
import { useRouterStore } from './store/routerStore'
import { useMarketStore } from './store/marketStore'
import { useThemeStore } from './store/themeStore'
import VariationOneTerminal from '@v1/index'
import VariationTwoDex from '@v2/index'
import { Zap, Sparkles } from 'lucide-react'

export function App() {
  const currentVariation = useRouterStore((s) => s.currentVariation)
  const setVariation = useRouterStore((s) => s.setVariation)
  const updateTick = useMarketStore((s) => s.updateTick)
  const theme = useThemeStore((s) => s.theme)

  // Sync theme attribute to document on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Live WebSocket/Market Simulation Heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      updateTick()
    }, 1500)
    return () => clearInterval(interval)
  }, [updateTick])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Universal Floating Switcher Bar */}
      <aside
        aria-label="Variation Switcher Bar"
        style={{
          backgroundColor: '#070a0f',
          color: '#e2e8f0',
          borderBottom: '1px solid #1e293b',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.78rem',
          position: 'sticky',
          top: 0,
          zIndex: 9999,
          boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700, color: '#38bdf8' }}>DUAL VARIATION ACTIVE:</span>
          <span style={{ opacity: 0.7 }}>Toggle between the 2 source designs below:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={() => setVariation('v1')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.75rem',
              cursor: 'pointer',
              border: currentVariation === 'v1' ? '1px solid #38bdf8' : '1px solid #334155',
              background: currentVariation === 'v1' ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
              color: currentVariation === 'v1' ? '#38bdf8' : '#94a3b8',
            }}
          >
            <Zap size={13} />
            <span>Variation 1: Pro Terminal (src-v1-terminal)</span>
          </button>

          <button
            type="button"
            onClick={() => setVariation('v2')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.75rem',
              cursor: 'pointer',
              border: currentVariation === 'v2' ? '1px solid #c084fc' : '1px solid #334155',
              background: currentVariation === 'v2' ? 'rgba(192, 132, 252, 0.2)' : 'transparent',
              color: currentVariation === 'v2' ? '#c084fc' : '#94a3b8',
            }}
          >
            <Sparkles size={13} />
            <span>Variation 2: Modern DEX (src-v2-modern)</span>
          </button>
        </div>
      </aside>

      {/* Render Active Variation */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentVariation === 'v1' ? <VariationOneTerminal /> : <VariationTwoDex />}
      </div>
    </div>
  )
}
export default App
