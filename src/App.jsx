import { useEffect } from 'react'
import { useRouterStore } from './store/routerStore'
import { useMarketStore } from './store/marketStore'
import { useThemeStore } from './store/themeStore'
import { MobileBottomBar } from './components/MobileBottomBar'
import VariationOneTerminal from '@v1/index'
import VariationTwoDex from '@v2/index'

export function App() {
  const currentVariation = useRouterStore((s) => s.currentVariation)
  const updateTick = useMarketStore((s) => s.updateTick)
  const theme = useThemeStore((s) => s.theme)

  // Sync theme attribute to document on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Live Market Simulation Heartbeat
  useEffect(() => {
    const interval = setInterval(() => {
      updateTick()
    }, 1500)
    return () => clearInterval(interval)
  }, [updateTick])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {currentVariation === 'v1' ? <VariationOneTerminal /> : <VariationTwoDex />}
      <MobileBottomBar />
    </div>
  )
}
export default App
