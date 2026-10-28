import { useRouterStore } from '@src/store/routerStore'
import { useMarketStore } from '@src/store/marketStore'
import { useThemeStore } from '@src/store/themeStore'
import { useI18nStore } from '@src/store/i18nStore'
import { LayoutGrid, BarChart2, Zap, Sparkles, Moon, Sun } from 'lucide-react'

export function MobileBottomBar() {
  const currentVariation = useRouterStore((s) => s.currentVariation)
  const setVariation = useRouterStore((s) => s.setVariation)
  const currentPage = useRouterStore((s) => s.currentPage)
  const navigate = useRouterStore((s) => s.navigate)

  const homeViewMode = useMarketStore((s) => s.homeViewMode)
  const setHomeViewMode = useMarketStore((s) => s.setHomeViewMode)

  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const t = useI18nStore((s) => s.t)

  const handleMarketsClick = () => {
    setHomeViewMode('list')
    navigate(currentVariation === 'v1' ? 'terminal' : 'home', currentVariation)
  }

  const handleTradeClick = () => {
    setHomeViewMode('trading')
    navigate(currentVariation === 'v1' ? 'terminal' : 'home', currentVariation)
  }

  const handleSwitchVariation = () => {
    const nextVar = currentVariation === 'v1' ? 'v2' : 'v1'
    setVariation(nextVar)
  }

  const isMarketsActive = (currentPage === 'home' || currentPage === 'terminal') && homeViewMode === 'list'
  const isTradeActive = (currentPage === 'home' || currentPage === 'terminal') && homeViewMode === 'trading'

  return (
    <aside className="mobile-bottom-app-bar" aria-label="Mobile Navigation Bar">
      {/* 1. Markets / Watchlist */}
      <button
        type="button"
        onClick={handleMarketsClick}
        className={`mobile-tab-item ${isMarketsActive ? 'active' : ''}`}
      >
        <LayoutGrid size={18} />
        <span>{t('list.viewList')}</span>
      </button>

      {/* 2. Trading Desk */}
      <button
        type="button"
        onClick={handleTradeClick}
        className={`mobile-tab-item ${isTradeActive ? 'active' : ''}`}
      >
        <BarChart2 size={18} />
        <span>Trade</span>
      </button>

      {/* 3. Switch Variation (Terminal <-> DEX) */}
      <button
        type="button"
        onClick={handleSwitchVariation}
        className="mobile-tab-item highlight"
      >
        {currentVariation === 'v1' ? <Sparkles size={18} color="#ec4899" /> : <Zap size={18} color="#38bdf8" />}
        <span style={{ fontWeight: 800 }}>
          {currentVariation === 'v1' ? 'To DEX' : 'To Terminal'}
        </span>
      </button>

      {/* 4. Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        className="mobile-tab-item"
      >
        {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        <span>Theme</span>
      </button>
    </aside>
  )
}
