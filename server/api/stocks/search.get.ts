// server/api/stocks/search.get.ts
import { getSupabaseServerClient } from '../../utils/supabaseServer'

export default defineEventHandler(async (event) => {
    const { q } = getQuery(event) as { q?: string }
    const keyword = (q || '').trim()

    if (!keyword) return []

    const supabase = getSupabaseServerClient()

    // symbol 시작 / name 부분 포함 둘 다 검색
    const { data, error } = await supabase
        .from('us_stocks')
        .select(
            'symbol, name, country, sector, industry, last_sale, net_change, percent_change, ko_title',
        )
        .or(
            `symbol.ilike.${keyword.toUpperCase()}*,` +
            `name.ilike.*${keyword.toLowerCase()}*`,
        )
        .eq('is_active', true)
        .limit(10)

    if (error) {
        console.error('us_stocks search error', error)
        throw createError({
            statusCode: 500,
            statusMessage: '심볼 검색 중 오류',
        })
    }

    return data || []
})
