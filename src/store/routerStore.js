import { create } from 'zustand'

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const parts = hash.split('/')
  const variation = parts[0] === 'v1' ? 'v1' : 'v2'
  const validPages = ['terminal', 'home', 'about', 'terms', 'privacy']
  const pageCandidate = parts[1] || 'home'
  const page = validPages.includes(pageCandidate) ? pageCandidate : 'home'
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
      const page = variation === 'v1' ? 'terminal' : 'home'
      get().navigate(page, variation)
    },
  }
})
