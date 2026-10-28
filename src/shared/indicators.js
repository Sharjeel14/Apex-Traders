/**
 * Technical Indicator Calculations for Chart.js
 */

export function calculateSMA(data, period) {
  const result = []
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null)
      continue
    }
    let sum = 0
    for (let j = 0; j < period; j++) {
      sum += data[i - j]
    }
    result.push(Number((sum / period).toFixed(2)))
  }
  return result
}

export function calculateEMA(data, period) {
  const result = []
  const k = 2 / (period + 1)
  let prevEMA = null

  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push(null)
      continue
    }
    if (prevEMA === null) {
      let sum = 0
      for (let j = 0; j < period; j++) {
        sum += data[i - j]
      }
      prevEMA = sum / period
      result.push(Number(prevEMA.toFixed(2)))
    } else {
      const currentEMA = data[i] * k + prevEMA * (1 - k)
      prevEMA = currentEMA
      result.push(Number(currentEMA.toFixed(2)))
    }
  }
  return result
}

export function calculateBollingerBands(data, period = 20, multiplier = 2) {
  const middle = calculateSMA(data, period)
  const upper = []
  const lower = []

  for (let i = 0; i < data.length; i++) {
    if (middle[i] === null) {
      upper.push(null)
      lower.push(null)
      continue
    }
    let sumDiffSq = 0
    for (let j = 0; j < period; j++) {
      sumDiffSq += Math.pow(data[i - j] - middle[i], 2)
    }
    const stdDev = Math.sqrt(sumDiffSq / period)
    upper.push(Number((middle[i] + multiplier * stdDev).toFixed(2)))
    lower.push(Number((middle[i] - multiplier * stdDev).toFixed(2)))
  }

  return { upper, middle, lower }
}

export function calculateRSI(data, period = 14) {
  const result = []
  const gains = []
  const losses = []

  for (let i = 1; i < data.length; i++) {
    const diff = data[i] - data[i - 1]
    gains.push(diff >= 0 ? diff : 0)
    losses.push(diff < 0 ? Math.abs(diff) : 0)
  }

  result.push(null) // for index 0

  let avgGain = null
  let avgLoss = null

  for (let i = 0; i < gains.length; i++) {
    if (i < period - 1) {
      result.push(null)
      continue
    }

    if (avgGain === null) {
      let sumGain = 0
      let sumLoss = 0
      for (let j = 0; j < period; j++) {
        sumGain += gains[i - j]
        sumLoss += losses[i - j]
      }
      avgGain = sumGain / period
      avgLoss = sumLoss / period
    } else {
      avgGain = (avgGain * (period - 1) + gains[i]) / period
      avgLoss = (avgLoss * (period - 1) + losses[i]) / period
    }

    if (avgLoss === 0) {
      result.push(100)
    } else {
      const rs = avgGain / avgLoss
      const rsi = 100 - (100 / (1 + rs))
      result.push(Number(rsi.toFixed(2)))
    }
  }

  return result
}

export function calculateMACD(data, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
  const fastEMA = calculateEMA(data, fastPeriod)
  const slowEMA = calculateEMA(data, slowPeriod)
  const macdLine = []

  for (let i = 0; i < data.length; i++) {
    if (fastEMA[i] === null || slowEMA[i] === null) {
      macdLine.push(null)
    } else {
      macdLine.push(Number((fastEMA[i] - slowEMA[i]).toFixed(2)))
    }
  }

  // Signal line is EMA of macdLine
  const validMacdValues = macdLine.filter(val => val !== null)
  const signalValues = calculateEMA(validMacdValues, signalPeriod)
  
  let signalIdx = 0
  const signalLine = []
  const histogram = []

  for (let i = 0; i < macdLine.length; i++) {
    if (macdLine[i] === null) {
      signalLine.push(null)
      histogram.push(null)
    } else {
      const sig = signalValues[signalIdx++] ?? null
      signalLine.push(sig)
      if (sig !== null) {
        histogram.push(Number((macdLine[i] - sig).toFixed(2)))
      } else {
        histogram.push(null)
      }
    }
  }

  return { macdLine, signalLine, histogram }
}
