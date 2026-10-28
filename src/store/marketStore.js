import { create } from 'zustand'

const INITIAL_PAIRS = {
  'BTC/USDT': { name: 'Bitcoin', symbol: 'BTC', price: 67450.0, change24h: 3.42, high24h: 68200.0, low24h: 65100.0, volume24h: '1.48B' },
  'ETH/USDT': { name: 'Ethereum', symbol: 'ETH', price: 3485.5, change24h: -1.25, high24h: 3560.0, low24h: 3420.0, volume24h: '840M' },
  'SOL/USDT': { name: 'Solana', symbol: 'SOL', price: 182.2, change24h: 8.74, high24h: 189.5, low24h: 167.0, volume24h: '520M' },
  'BNB/USDT': { name: 'Binance Coin', symbol: 'BNB', price: 595.0, change24h: 0.85, high24h: 602.0, low24h: 588.0, volume24h: '210M' },
  'XRP/USDT': { name: 'Ripple', symbol: 'XRP', price: 0.584, change24h: -2.15, high24h: 0.605, low24h: 0.572, volume24h: '145M' },
  'DOGE/USDT': { name: 'Dogecoin', symbol: 'DOGE', price: 0.142, change24h: 12.3, high24h: 0.155, low24h: 0.125, volume24h: '310M' },
  'ADA/USDT': { name: 'Cardano', symbol: 'ADA', price: 0.468, change24h: 1.15, high24h: 0.485, low24h: 0.458, volume24h: '98M' },
}

function generateHistory(basePrice, count = 50) {
  const prices = []
  const volumes = []
  const timestamps = []
  let curr = basePrice * 0.94
  const now = Date.now()

  for (let i = count; i >= 0; i--) {
    const t = new Date(now - i * 15 * 60 * 1000)
    timestamps.push(t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    const change = (Math.random() - 0.48) * (curr * 0.015)
    curr = Math.max(curr * 0.5, curr + change)
    prices.push(Number(curr.toFixed(curr > 10 ? 2 : 4)))
    volumes.push(Math.floor(Math.random() * 500 + 50))
  }
  return { prices, volumes, timestamps }
}

function generateOrderBook(midPrice) {
  const bids = []
  const asks = []
  const decimals = midPrice > 10 ? 2 : 4
  const step = midPrice * 0.0008

  let cumBid = 0
  for (let i = 1; i <= 8; i++) {
    const price = Number((midPrice - i * step).toFixed(decimals))
    const amount = Number((Math.random() * (midPrice > 1000 ? 1.5 : 50) + 0.1).toFixed(3))
    cumBid += amount
    bids.push({ price, amount, total: Number(cumBid.toFixed(3)), depth: Math.min(100, Math.round(i * 12 + Math.random() * 8)) })
  }

  let cumAsk = 0
  for (let i = 1; i <= 8; i++) {
    const price = Number((midPrice + i * step).toFixed(decimals))
    const amount = Number((Math.random() * (midPrice > 1000 ? 1.5 : 50) + 0.1).toFixed(3))
    cumAsk += amount
    asks.push({ price, amount, total: Number(cumAsk.toFixed(3)), depth: Math.min(100, Math.round(i * 12 + Math.random() * 8)) })
  }

  return { bids, asks }
}

function generateTrades(midPrice) {
  const trades = []
  const decimals = midPrice > 10 ? 2 : 4
  const now = Date.now()

  for (let i = 0; i < 12; i++) {
    const type = Math.random() > 0.48 ? 'buy' : 'sell'
    const delta = (Math.random() - 0.5) * (midPrice * 0.001)
    trades.push({
      id: `tr-${now}-${i}`,
      time: new Date(now - i * 4000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      price: Number((midPrice + delta).toFixed(decimals)),
      amount: Number((Math.random() * (midPrice > 1000 ? 0.8 : 30) + 0.05).toFixed(3)),
      type,
    })
  }
  return trades
}

// Prepopulate market state
const initialMarket = {}
for (const [pair, info] of Object.entries(INITIAL_PAIRS)) {
  const { prices, volumes, timestamps } = generateHistory(info.price)
  initialMarket[pair] = {
    ...info,
    history: prices,
    volumes,
    timestamps,
  }
}

export const useMarketStore = create((set, get) => ({
  pairs: initialMarket,
  activePair: 'BTC/USDT',
  timeframe: '15m',
  homeViewMode: 'list', // 'list' | 'trading'
  orderBook: generateOrderBook(INITIAL_PAIRS['BTC/USDT'].price),
  recentTrades: generateTrades(INITIAL_PAIRS['BTC/USDT'].price),

  // User Mock Portfolio
  portfolio: {
    USDT: 25480.0,
    BTC: 0.84,
    ETH: 5.25,
    SOL: 42.0,
    BNB: 11.5,
    XRP: 2500.0,
    DOGE: 14000.0,
    ADA: 4200.0,
  },

  // Order Placement Form state (ZERO useState in components!)
  orderForm: {
    side: 'buy',
    type: 'market',
    price: INITIAL_PAIRS['BTC/USDT'].price.toString(),
    amount: '',
    sliderPercent: 0,
  },

  // DEX Swap Form state (ZERO useState in components!)
  swapForm: {
    fromAsset: 'USDT',
    toAsset: 'ETH',
    fromAmount: '1000',
    toAmount: '',
    slippage: '0.5%',
  },

  // Market Search query (ZERO useState!)
  searchQuery: '',

  // User Placed Orders
  userOrders: [
    { id: 'ord-101', pair: 'BTC/USDT', side: 'buy', type: 'limit', price: 65400.0, amount: 0.15, status: 'Open', time: '10:14:22' },
    { id: 'ord-102', pair: 'ETH/USDT', side: 'sell', type: 'limit', price: 3620.0, amount: 1.2, status: 'Open', time: '09:45:10' },
  ],

  toast: null,

  // Actions
  setHomeViewMode: (mode) => set({ homeViewMode: mode }),

  selectTickerAndOpenTrade: (pair) => {
    get().selectPair(pair)
    set({ homeViewMode: 'trading' })
  },

  backToTickerList: () => set({ homeViewMode: 'list' }),

  selectPair: (pair) => {
    const currentData = get().pairs[pair]
    if (!currentData) return
    set((state) => ({
      activePair: pair,
      orderBook: generateOrderBook(currentData.price),
      recentTrades: generateTrades(currentData.price),
      orderForm: {
        ...state.orderForm,
        price: currentData.price.toString(),
        amount: '',
        sliderPercent: 0,
      },
    }))
  },

  setTimeframe: (timeframe) => {
    const active = get().activePair
    const currentData = get().pairs[active]
    const { prices, volumes, timestamps } = generateHistory(currentData.price)
    set((state) => ({
      timeframe,
      pairs: {
        ...state.pairs,
        [active]: {
          ...currentData,
          history: prices,
          volumes,
          timestamps,
        },
      },
    }))
  },

  setOrderField: (field, value) => {
    set((state) => ({
      orderForm: { ...state.orderForm, [field]: value },
    }))
  },

  setSwapField: (field, value) => {
    set((state) => {
      const next = { ...state.swapForm, [field]: value }
      // Auto-compute toAmount if fromAmount changed
      if (field === 'fromAmount' || field === 'fromAsset' || field === 'toAsset') {
        const fromPrice = next.fromAsset === 'USDT' ? 1 : (get().pairs[`${next.fromAsset}/USDT`]?.price || 1)
        const toPrice = next.toAsset === 'USDT' ? 1 : (get().pairs[`${next.toAsset}/USDT`]?.price || 1)
        const val = parseFloat(next.fromAmount) || 0
        const computed = (val * fromPrice) / toPrice
        next.toAmount = computed > 0 ? (computed > 10 ? computed.toFixed(3) : computed.toFixed(5)) : ''
      }
      return { swapForm: next }
    })
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query })
  },

  dismissToast: () => set({ toast: null }),

  submitOrder: () => {
    const { activePair, orderForm, pairs, portfolio, userOrders } = get()
    const pairData = pairs[activePair]
    const baseSymbol = pairData.symbol
    const amountNum = parseFloat(orderForm.amount)
    const priceNum = orderForm.type === 'market' ? pairData.price : parseFloat(orderForm.price)

    if (!amountNum || amountNum <= 0) {
      set({ toast: { type: 'error', text: 'Enter a valid order amount' } })
      return
    }

    const totalCost = amountNum * priceNum

    if (orderForm.side === 'buy') {
      if (portfolio.USDT < totalCost) {
        set({ toast: { type: 'error', text: 'Insufficient USDT balance' } })
        return
      }
      set({
        portfolio: {
          ...portfolio,
          USDT: Number((portfolio.USDT - totalCost).toFixed(2)),
          [baseSymbol]: Number(((portfolio[baseSymbol] || 0) + amountNum).toFixed(4)),
        },
        userOrders: [
          {
            id: `ord-${Date.now()}`,
            pair: activePair,
            side: 'buy',
            type: orderForm.type,
            price: priceNum,
            amount: amountNum,
            status: 'Filled',
            time: new Date().toLocaleTimeString(),
          },
          ...userOrders,
        ],
        orderForm: { ...orderForm, amount: '', sliderPercent: 0 },
        toast: { type: 'success', text: `Bought ${amountNum} ${baseSymbol} @ $${priceNum}` },
      })
    } else {
      const currentAssetBalance = portfolio[baseSymbol] || 0
      if (currentAssetBalance < amountNum) {
        set({ toast: { type: 'error', text: `Insufficient ${baseSymbol} balance` } })
        return
      }
      set({
        portfolio: {
          ...portfolio,
          [baseSymbol]: Number((currentAssetBalance - amountNum).toFixed(4)),
          USDT: Number((portfolio.USDT + totalCost).toFixed(2)),
        },
        userOrders: [
          {
            id: `ord-${Date.now()}`,
            pair: activePair,
            side: 'sell',
            type: orderForm.type,
            price: priceNum,
            amount: amountNum,
            status: 'Filled',
            time: new Date().toLocaleTimeString(),
          },
          ...userOrders,
        ],
        orderForm: { ...orderForm, amount: '', sliderPercent: 0 },
        toast: { type: 'success', text: `Sold ${amountNum} ${baseSymbol} @ $${priceNum}` },
      })
    }
  },

  submitSwap: () => {
    const { swapForm, portfolio } = get()
    const fromVal = parseFloat(swapForm.fromAmount) || 0
    const toVal = parseFloat(swapForm.toAmount) || 0

    if (fromVal <= 0) {
      set({ toast: { type: 'error', text: 'Invalid swap amount' } })
      return
    }

    const available = portfolio[swapForm.fromAsset] || 0
    if (available < fromVal) {
      set({ toast: { type: 'error', text: `Insufficient ${swapForm.fromAsset} balance` } })
      return
    }

    set({
      portfolio: {
        ...portfolio,
        [swapForm.fromAsset]: Number((available - fromVal).toFixed(4)),
        [swapForm.toAsset]: Number(((portfolio[swapForm.toAsset] || 0) + toVal).toFixed(4)),
      },
      toast: { type: 'success', text: `Swapped ${fromVal} ${swapForm.fromAsset} for ${toVal} ${swapForm.toAsset}` },
    })
  },

  cancelOrder: (id) => {
    set((state) => ({
      userOrders: state.userOrders.filter((o) => o.id !== id),
      toast: { type: 'info', text: 'Order cancelled' },
    }))
  },

  // Live Tick Generator - updates price & orderbook
  updateTick: () => {
    const { pairs, activePair, recentTrades } = get()
    const current = pairs[activePair]
    if (!current) return

    const deltaPercent = (Math.random() - 0.495) * 0.003
    const newPrice = Number((current.price * (1 + deltaPercent)).toFixed(current.price > 10 ? 2 : 4))
    const newHistory = [...current.history.slice(1), newPrice]
    const newVol = Math.floor(Math.random() * 400 + 30)
    const newVolumes = [...current.volumes.slice(1), newVol]
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newTimestamps = [...current.timestamps.slice(1), nowTime]

    // New simulated trade
    const tradeSide = deltaPercent >= 0 ? 'buy' : 'sell'
    const newTrade = {
      id: `tr-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      price: newPrice,
      amount: Number((Math.random() * (newPrice > 1000 ? 0.5 : 20) + 0.02).toFixed(3)),
      type: tradeSide,
    }

    // Refresh order book slightly
    const newBook = generateOrderBook(newPrice)

    set({
      pairs: {
        ...pairs,
        [activePair]: {
          ...current,
          price: newPrice,
          high24h: Math.max(current.high24h, newPrice),
          low24h: Math.min(current.low24h, newPrice),
          history: newHistory,
          volumes: newVolumes,
          timestamps: newTimestamps,
        },
      },
      orderBook: newBook,
      recentTrades: [newTrade, ...recentTrades.slice(0, 14)],
    })
  },
}))
