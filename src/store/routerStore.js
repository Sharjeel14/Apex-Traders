import { create } from 'zustand'

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const parts = hash.split('/')
  const variation = parts[0] === 'v2' ? 'v2' : 'v1'
  const validPages = ['terminal', 'home', 'about', 'terms', 'privacy']
  const pageCandidate = parts[1] || (variation === 'v1' ? 'terminal' : 'home')
  const page = validPages.includes(pageCandidate) ? pageCandidate : (variation === 'v1' ? 'terminal' : 'home')
  return { variation, page }
}

const initial = typeof window !== 'undefined' ? parseHash() : { variation: 'v1', page: 'terminal' }

export const useRouterStore = create((set, get) => {
  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', () => {
      const parsed = parseHash()
      set({ currentVariation: parsed.variation, currentPage: parsed.page })
    })
  }

  return {
    currentVariation: initial.variation,
    currentPage: initial.page,

    navigate: (page, variation) => {
      const targetVar = variation || get().currentVariation
      const targetPage = page || (targetVar === 'v1' ? 'terminal' : 'home')
      if (typeof window !== 'undefined') {
        window.location.hash = `#/${targetVar}/${targetPage}`
      }
      set({ currentVariation: targetVar, currentPage: targetPage })
    },

    setVariation: (variation) => {
      const page = variation === 'v1' ? 'terminal' : 'home'
      get().navigate(page, variation)
    },
  }
})
