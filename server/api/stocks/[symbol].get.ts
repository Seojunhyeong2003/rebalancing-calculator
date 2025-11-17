// server/api/stocks/[symbol].get.ts
export default defineEventHandler(async (event) => {
    const symbol = getRouterParam(event, 'symbol')?.toUpperCase() || ''

    if (!symbol) {
        return { error: '심볼이 비어있음' }
    }

    const config = useRuntimeConfig()
    const apiKey = config.alphaVantageKey

    if (!apiKey) {
        return { error: 'ALPHA_VANTAGE_KEY가 설정되어 있지 않음' }
    }

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
        symbol,
    )}&apikey=${apiKey}`

    try {
        const res: any = await $fetch(url)
        const quote = res['Global Quote']

        if (!quote || !quote['05. price']) {
            return { error: '해당 티커를 찾을 수 없음' }
        }

        return {
            symbol: quote['01. symbol'],
            price: Number(quote['05. price']),
            change: Number(quote['09. change']),
            changePercent: quote['10. change percent'],
            latestTradingDay: quote['07. latest trading day'],
        }
    } catch (e) {
        console.error(e)
        return { error: '외부 API 호출 중 오류' }
    }
})
