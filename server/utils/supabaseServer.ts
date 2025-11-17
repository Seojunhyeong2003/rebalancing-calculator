// server/utils/supabaseServer.ts
import { createClient } from '@supabase/supabase-js'

export const getSupabaseServerClient = () => {
    const config = useRuntimeConfig()

    const supabaseUrl = config.supabaseUrl
    const serviceKey = config.supabaseServiceRoleKey

    if (!supabaseUrl || !serviceKey) {
        throw new Error('Supabase 환경변수(SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)가 설정되지 않음')
    }

    return createClient(supabaseUrl, serviceKey, {
        auth: {
            persistSession: false,
        },
    })
}
