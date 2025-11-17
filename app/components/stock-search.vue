<template>
    <div class="space-y-4 relative">
        <div class="flex gap-2">
            <div class="flex-1 relative">
                <input
                    v-model="tickerInput"
                    @input="onInput"
                    type="text"
                    placeholder="티커를 입력하세요! 예) AAPL, TSLA"
                    class="h-[40px] w-full rounded-xl flex items-center justify-center bg-[#DABCB2] px-5
                    text-xl text-white placeholder:text-xl
                    shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0"
                />
                <!-- 자동완성 리스트 -->
                <ul
                    v-if="showSuggestions"
                    class="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow text-sm max-h-60 overflow-auto"
                >
                    <li
                        v-for="(item, idx) in suggestions"
                        :key="item.symbol + idx"
                        @mousedown.prevent="selectSuggestion(item)"
                        class="px-3 py-2 cursor-pointer flex justify-between gap-2 hover:bg-gray-100"
                    >
                        <div class="flex flex-col">
                            <span class="font-semibold">
                                {{ item.symbol }}
                            </span>
                            <span class="text-xs text-gray-500">
                                {{ item.name }}
                            </span>
                            <span
                                v-if="item.last_sale !== null && item.last_sale !== undefined"
                                class="text-[11px] text-gray-400"
                            >
                                최근가: {{ item.last_sale }} ({{ item.percent_change }}%)
                            </span>
                        </div>
                        <div class="text-xs text-gray-400 text-right">
                            <div>{{ item.country }}</div>
                            <div>{{ item.sector }}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
type SuggestItem = {
    symbol: string
    name: string
    country?: string | null
    sector?: string | null
    industry?: string | null
    last_sale?: number | null
    net_change?: number | null
    percent_change?: number | null
    ko_title?: string | null
}

const tickerInput = ref('')
const suggestions = ref<SuggestItem[]>([])
const showSuggestions = computed(
    () => suggestions.value.length > 0 && tickerInput.value.trim().length > 0,
)

const selectedSymbol = ref<string>('')

const data = ref<null | {
    symbol: string
    price: number
    change: number
    changePercent: string
    latestTradingDay: string
}>(null)
const error = ref('')
const pending = ref(false)

const onInput = async () => {
    selectedSymbol.value = ''
    data.value = null
    error.value = ''

    const q = tickerInput.value.trim()
    if (!q) {
        suggestions.value = []
        return
    }

    try {
        const res = await $fetch<SuggestItem[]>('/api/stocks/search', {
            query: { q },
        })
        suggestions.value = res
    } catch (e) {
        console.error('symbols search error', e)
        suggestions.value = []
    }
}

const selectSuggestion = (item: SuggestItem) => {
    tickerInput.value = item.symbol
    selectedSymbol.value = item.symbol
    suggestions.value = []
}

const search = async () => {
    error.value = ''
    data.value = null

    const symbol = selectedSymbol.value || tickerInput.value.trim().toUpperCase()
    if (!symbol) return

    pending.value = true
    try {
        const res: any = await $fetch(`/api/stocks/${symbol}`)

        if (res.error) {
            error.value = res.error
            return
        }

        data.value = res
    } catch (e) {
        error.value = '불러오는 중 오류가 발생했음'
    } finally {
        pending.value = false
    }
}

const formatPrice = (n: number) => n.toFixed(2)
</script>
