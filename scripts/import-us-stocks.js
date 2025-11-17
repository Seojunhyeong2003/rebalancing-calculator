// scripts/import-us-stocks.js
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'csv-parse'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY가 .env 에 없음')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
})

const dataDir = path.resolve(__dirname, '../data')

function findLatestCsv() {
    const files = fs
        .readdirSync(dataDir)
        .filter((f) => f.startsWith('nasdaq_screener_') && f.endsWith('.csv'))

    if (!files.length) {
        console.error('❌ data 폴더에 nasdaq_screener_*.csv 파일이 없음')
        process.exit(1)
    }

    // 파일명에서 타임스탬프 뽑아서 최신 순으로 정렬
    const withStamp = files.map((name) => {
        const m = name.match(/nasdaq_screener_(\d+)\.csv$/)
        const stamp = m ? Number(m[1]) : 0
        return { name, stamp }
    })

    withStamp.sort((a, b) => b.stamp - a.stamp)

    const latest = withStamp[0]
    const others = withStamp.slice(1)

    // 예전 파일들 삭제
    for (const f of others) {
        const p = path.join(dataDir, f.name)
        try {
            fs.unlinkSync(p)
            console.log('🗑 오래된 CSV 삭제:', f.name)
        } catch (err) {
            console.warn('⚠ CSV 삭제 실패:', f.name, err.message)
        }
    }

    console.log('📄 사용할 최신 CSV 파일:', latest.name)
    return path.join(dataDir, latest.name)
}

// $146.06, -0.76, -0.518% 이런 문자열을 number 로 변환
function parseNumber(raw) {
    if (!raw) return null
    const cleaned = String(raw)
        .replace(/\$/g, '')
        .replace(/,/g, '')
        .replace(/%/g, '')
        .trim()

    if (!cleaned) return null

    const num = Number(cleaned)
    return Number.isNaN(num) ? null : num
}

async function run() {
    const csvPath = findLatestCsv()

    console.log('🗑 기존 us_stocks 데이터 전체 삭제 중...')
    const { error: delError } = await supabase
        .from('us_stocks')
        .delete()
        .not('id', 'is', null) // 모든 row 삭제

    if (delError) {
        console.error('❌ Supabase delete 에러:', delError)
        process.exit(1)
    }

    console.log('📥 CSV 파싱 시작:', csvPath)

    const rows = []
    const parser = fs
        .createReadStream(csvPath)
        .pipe(
            parse({
                columns: true, // 첫 줄 헤더 사용
                skip_empty_lines: true,
                trim: true,
            }),
        )

    for await (const record of parser) {
        // CSV 헤더:
        // Symbol,Name,Last Sale,Net Change,% Change,Market Cap,Country,IPO Year,Volume,Sector,Industry

        const symbol = record['Symbol']
        const name = record['Name']
        if (!symbol || !name) continue

        const lastSaleRaw = record['Last Sale']      // 예: "$146.06"
        const netChangeRaw = record['Net Change']    // 예: "-0.76"
        const percentRaw = record['% Change']        // 예: "-0.518%"

        const country = record['Country'] || null
        const sector = record['Sector'] || null
        const industry = record['Industry'] || null
        const ipoYearRaw = record['IPO Year']
        const ipoYear = ipoYearRaw ? Number(ipoYearRaw) : null

        rows.push({
            symbol,
            name,
            country,
            sector,
            industry,
            ipo_year: ipoYear,
            exchange: 'NASDAQ',
            last_sale: parseNumber(lastSaleRaw),
            net_change: parseNumber(netChangeRaw),
            percent_change: parseNumber(percentRaw),
            ko_title: null, // 한국어 타이틀 대비
            is_active: true,
        })
    }

    console.log('✅ CSV 파싱 완료, 레코드 수:', rows.length)

    // Supabase에 배치로 insert
    const chunkSize = 500
    for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize)
        console.log(`📤 Supabase 업로드 중... (${i} ~ ${i + chunk.length - 1})`)

        const { error } = await supabase.from('us_stocks').insert(chunk)

        if (error) {
            console.error('❌ Supabase insert 에러:', error)
            process.exit(1)
        }
    }

    console.log('🎉 us_stocks 전체 새로 갱신 완료!')
    process.exit(0)
}

run().catch((err) => {
    console.error('❌ 스크립트 실행 오류:', err)
    process.exit(1)
})
