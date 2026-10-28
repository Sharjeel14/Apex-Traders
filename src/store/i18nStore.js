import { create } from 'zustand'

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home / Terminal',
    'nav.dex': 'Instant DEX',
    'nav.markets': 'Markets',
    'nav.about': 'About Us',
    'nav.terms': 'Terms & Conditions',
    'nav.privacy': 'Privacy Policy',
    'nav.switchVariation': 'Switch Variation',
    'nav.theme': 'Theme',
    'nav.v1Label': 'Variation 1: Cyber Terminal',
    'nav.v2Label': 'Variation 2: Modern FinTech DEX',

    // Trading Terminal
    'trade.orderBook': 'Order Book',
    'trade.recentTrades': 'Market Trades',
    'trade.placeOrder': 'Place Order',
    'trade.buy': 'Buy',
    'trade.sell': 'Sell',
    'trade.limit': 'Limit',
    'trade.market': 'Market',
    'trade.price': 'Price',
    'trade.amount': 'Amount',
    'trade.total': 'Total',
    'trade.balance': 'Available Balance',
    'trade.openOrders': 'Open Orders',
    'trade.orderHistory': 'Order History',
    'trade.indicators': 'Indicators',
    'trade.chart': 'Live Chart',
    'trade.successOrder': 'Order executed successfully!',

    // Ticker List to Trading View
    'list.title': 'Market Watchlist & Tickers',
    'list.subtitle': 'Select any cryptocurrency ticker to launch the interactive Chart.js trading desk',
    'list.actionTrade': 'Launch Trading View',
    'list.back': 'Back to Tickers',
    'list.search': 'Filter tickers by name or symbol...',
    'list.viewList': 'Market Watchlist',
    'list.viewTrade': 'Active Trading View',

    // DEX / Swap
    'dex.title': 'Decentralized Swap',
    'dex.subtitle': 'Instant swap across deep liquidity pools with minimal slippage',
    'dex.swap': 'Swap Tokens',
    'dex.youPay': 'You Pay',
    'dex.youReceive': 'You Receive',
    'dex.exchangeRate': 'Exchange Rate',
    'dex.slippage': 'Max Slippage',
    'dex.networkFee': 'Network Fee',
    'dex.swapButton': 'Execute Swap',
    'dex.portfolioOverview': 'Portfolio Performance',
    'dex.marketTrends': 'Market Highlights',

    // Indicators
    'ind.sma20': 'SMA (20)',
    'ind.sma50': 'SMA (50)',
    'ind.ema12': 'EMA (12)',
    'ind.ema26': 'EMA (26)',
    'ind.bollinger': 'Bollinger Bands',
    'ind.rsi': 'RSI (14)',
    'ind.macd': 'MACD (12, 26, 9)',
    'ind.volume': 'Volume Overlay',

    // Pages
    'about.title': 'About ApexTrade Platform',
    'about.badge': 'Institutional Grade Infrastructure',
    'about.missionTitle': 'Our Mission',
    'about.missionText': 'Building next-generation reactive trading technology engineered for sub-millisecond execution, institutional liquidity, and modern visual financial analytics.',
    'terms.title': 'Terms & Conditions',
    'terms.lastUpdated': 'Last updated: October 2026',
    'privacy.title': 'Privacy Policy',
    'privacy.lastUpdated': 'Last updated: October 2026',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio / Terminal',
    'nav.dex': 'DEX Instantáneo',
    'nav.markets': 'Mercados',
    'nav.about': 'Sobre Nosotros',
    'nav.terms': 'Términos y Condiciones',
    'nav.privacy': 'Política de Privacidad',
    'nav.switchVariation': 'Cambiar Variación',
    'nav.theme': 'Tema',
    'nav.v1Label': 'Variación 1: Cyber Terminal',
    'nav.v2Label': 'Variación 2: Modern FinTech DEX',

    // Trading Terminal
    'trade.orderBook': 'Libro de Órdenes',
    'trade.recentTrades': 'Operaciones Recientes',
    'trade.placeOrder': 'Colocar Orden',
    'trade.buy': 'Comprar',
    'trade.sell': 'Vender',
    'trade.limit': 'Límite',
    'trade.market': 'Mercado',
    'trade.price': 'Precio',
    'trade.amount': 'Cantidad',
    'trade.total': 'Total',
    'trade.balance': 'Saldo Disponible',
    'trade.openOrders': 'Órdenes Abiertas',
    'trade.orderHistory': 'Historial de Órdenes',
    'trade.indicators': 'Indicadores',
    'trade.chart': 'Gráfico en Vivo',
    'trade.successOrder': '¡Orden ejecutada con éxito!',

    // Ticker List to Trading View
    'list.title': 'Lista de Mercados y Tickers',
    'list.subtitle': 'Selecciona cualquier ticker para abrir la mesa de trading interactiva',
    'list.actionTrade': 'Abrir Trading View',
    'list.back': 'Volver a Tickers',
    'list.search': 'Filtrar tickers por nombre o símbolo...',
    'list.viewList': 'Lista de Mercados',
    'list.viewTrade': 'Vista de Trading Activa',

    // DEX / Swap
    'dex.title': 'Intercambio Descentralizado',
    'dex.subtitle': 'Intercambio instantáneo en fondos de liquidez profunda con mínimo deslizamiento',
    'dex.swap': 'Intercambiar Tokens',
    'dex.youPay': 'Pagas',
    'dex.youReceive': 'Recibes',
    'dex.exchangeRate': 'Tipo de Cambio',
    'dex.slippage': 'Deslizamiento Máximo',
    'dex.networkFee': 'Tarifa de Red',
    'dex.swapButton': 'Ejecutar Intercambio',
    'dex.portfolioOverview': 'Rendimiento de Portafolio',
    'dex.marketTrends': 'Destacados del Mercado',

    // Indicators
    'ind.sma20': 'SMA (20)',
    'ind.sma50': 'SMA (50)',
    'ind.ema12': 'EMA (12)',
    'ind.ema26': 'EMA (26)',
    'ind.bollinger': 'Bandas de Bollinger',
    'ind.rsi': 'RSI (14)',
    'ind.macd': 'MACD (12, 26, 9)',
    'ind.volume': 'Superposición de Volumen',

    // Pages
    'about.title': 'Acerca de ApexTrade',
    'about.badge': 'Infraestructura de Grado Institucional',
    'about.missionTitle': 'Nuestra Misión',
    'about.missionText': 'Construyendo tecnología de trading reactiva de próxima generación para ejecución sub-milisegundo y analítica financiera visual moderna.',
    'terms.title': 'Términos y Condiciones',
    'terms.lastUpdated': 'Última actualización: Octubre 2026',
    'privacy.title': 'Política de Privacidad',
    'privacy.lastUpdated': 'Última actualización: Octubre 2026',
  },
}

export const useI18nStore = create((set, get) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  t: (key) => {
    const lang = get().language
    return translations[lang]?.[key] || translations.en[key] || key
  },
}))
