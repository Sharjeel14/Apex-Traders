import { create } from 'zustand'

export const useIndicatorStore = create((set) => ({
  // Indicator Toggles
  showSMA20: true,
  showSMA50: false,
  showEMA12: false,
  showEMA26: false,
  showBollinger: true,
  showRSI: true,
  showMACD: false,
  showVolume: true,

  // Chart view style
  chartStyle: 'area', // 'area' | 'line'
  proChartPattern: 'candle', // 'candle' | 'line'

  // Actions - Zero useState required in components
  setProChartPattern: (pattern) => set({ proChartPattern: pattern }),
  toggleIndicator: (indicatorKey) => {
    set((state) => ({ [indicatorKey]: !state[indicatorKey] }))
  },

  setChartStyle: (style) => {
    set({ chartStyle: style })
  },

  enableOnly: (indicatorKey) => {
    set({
      showSMA20: indicatorKey === 'showSMA20',
      showSMA50: indicatorKey === 'showSMA50',
      showEMA12: indicatorKey === 'showEMA12',
      showEMA26: indicatorKey === 'showEMA26',
      showBollinger: indicatorKey === 'showBollinger',
      showRSI: indicatorKey === 'showRSI',
      showMACD: indicatorKey === 'showMACD',
      showVolume: indicatorKey === 'showVolume',
    })
  },
}))
