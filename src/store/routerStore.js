import { create } from 'zustand'
import { useMarketStore } from './marketStore'

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const parts = hash.split('/')
  const variation = parts[0] === 'v1' ? 'v1' : 'v2'
  const validPages = ['terminal', 'home', 'about', 'terms', 'privacy']
  const pageCandidate = parts[1] || (variation === 'v1' ? 'terminal' : 'home')
  const page = validPages.includes(pageCandidate) ? pageCandidate : (variation === 'v1' ? 'terminal' : 'home')
  return { variation, page }
}

const initial = typeof window !== 'undefined' ? parseHash() : { variation: 'v2', page: 'home' }

export const useRouterStore = create((set, get) => {
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      const parsed = parseHash()
      set({ currentVariation: parsed.variation, currentPage: parsed.page, isMobileMenuOpen: false })
    })
  }

  return {
    currentVariation: initial.variation,
    currentPage: initial.page,
    isMobileMenuOpen: false,

    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

    navigate: (page, variation) => {
      const targetVar = variation || get().currentVariation
      const targetPage = page || (targetVar === 'v1' ? 'terminal' : 'home')
      if (typeof window !== 'undefined') {
        window.location.hash = `#/${targetVar}/${targetPage}`
      }
      set({ currentVariation: targetVar, currentPage: targetPage, isMobileMenuOpen: false })
    },

    setVariation: (variation) => {
      const targetPage = variation === 'v1' ? 'terminal' : 'home'
      // When switching to V1 Pro Terminal, show trading desk directly so the UI clearly changes!
      if (variation === 'v1') {
        useMarketStore.getState().setHomeViewMode('trading')
      }
      get().navigate(targetPage, variation)
    },
  }
})
