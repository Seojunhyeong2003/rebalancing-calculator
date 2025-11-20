// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: false },
    css: ['./app/assets/css/main.css'],
    runtimeConfig: {
        alphaVantageKey: process.env.ALPHA_VANTAGE_KEY,
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
        public: {
            supabaseUrl: process.env.SUPABASE_URL, // 필요하면
        },
    },
    nitro: {
        externals: {
            inline: ['@supabase/supabase-js'],
        },
    },
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
})
